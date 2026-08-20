import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Stripe from 'stripe';
import { getStripe, isStripeConfigured } from '@/lib/stripe';
import { getRundflug, formatDauer } from '@/data/flights';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { business } from '@/data/business';

// Stripe braucht node:crypto → Node-Runtime (auf Workers via nodejs_compat).
export const runtime = 'nodejs';

const checkoutSchema = z.object({
  slug: z.string().min(1).max(100),
  quantity: z.number().int().min(1).max(10).default(1),
});

export async function POST(request: NextRequest) {
  // Abuse-Schutz (best-effort, per Isolate).
  const ip = getClientIp(request);
  const limit = rateLimit(`checkout:${ip}`, { limit: 20, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte kurz warten.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  if (!isStripeConfigured()) {
    // Kein Key gesetzt (z. B. vor dem Cutover). Klare Fehlermeldung statt 500.
    return NextResponse.json(
      { error: 'Der Online-Kauf ist noch nicht aktiviert. Bitte nutzen Sie die Anfrage.' },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Ungültige Eingabe.' }, { status: 400 });
  }

  const { slug, quantity } = parsed.data;

  // Preis IMMER serverseitig aus den eigenen Daten auflösen — der Client
  // schickt nur den Slug, nie einen Betrag (Manipulationsschutz).
  const flug = getRundflug(slug);
  if (!flug) {
    return NextResponse.json({ error: 'Rundflug nicht gefunden.' }, { status: 404 });
  }

  const origin = request.headers.get('origin') || business.siteUrl;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      locale: 'de',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: flug.preis * 100,
            // Bruttopreise; Stripe extrahiert die USt (kein Aufschlag).
            tax_behavior: 'inclusive',
            product_data: {
              name: `${flug.name} (${formatDauer(flug.flugzeitMin)})`,
              description: flug.kurzbeschreibung.slice(0, 300),
              metadata: { slug: flug.slug },
            },
          },
          quantity,
        },
      ],
      // Destination-based EU-VAT nur, wenn im Dashboard konfiguriert und der
      // USt-Satz fachlich geklärt ist (docs/08-recht-compliance.md).
      ...(process.env.STRIPE_AUTOMATIC_TAX === 'true'
        ? { automatic_tax: { enabled: true } }
        : {}),
      invoice_creation: { enabled: true },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/shop/danke/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/abbruch/`,
      metadata: { slug: flug.slug, quantity: String(quantity) },
    } satisfies Stripe.Checkout.SessionCreateParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout-Fehler:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Checkout konnte nicht erstellt werden.' }, { status: 500 });
  }
}
