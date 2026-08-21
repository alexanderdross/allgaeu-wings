import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

// Offizieller Cloudflare-Test-Secret (Verifikation besteht immer). Fallback,
// damit Vorschau und CI ohne gesetztes TURNSTILE_SECRET_KEY funktionieren. In
// Produktion den echten Secret im Cloudflare-Dashboard setzen (keep_vars).
const TEST_SECRET = '1x0000000000000000000000000000000AA';

const kontaktSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(50).optional().default(''),
  betreff: z.string().max(200).optional().default(''),
  nachricht: z.string().min(1).max(5000),
  datenschutz: z.string().optional().default(''),
  // Turnstile-Token aus dem Widget (Feldname von Cloudflare vorgegeben).
  'cf-turnstile-response': z.string().optional().default(''),
  // Honeypot: bewusst nicht per Schema erzwingen, unten still verwerfen.
  website: z.string().max(200).optional().default(''),
});

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.TURNSTILE_SECRET_KEY || TEST_SECRET;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const outcome = (await res.json()) as { success?: boolean };
    return outcome.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimit(`kontakt:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte kurz warten.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const parsed = kontaktSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Bitte prüfen Sie Ihre Eingaben.' }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: still als Erfolg quittieren (kein Hinweis an Bots).
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (!data.datenschutz) {
    return NextResponse.json(
      { error: 'Bitte stimmen Sie der Datenschutzerklärung zu.' },
      { status: 400 },
    );
  }

  const human = await verifyTurnstile(data['cf-turnstile-response'], ip);
  if (!human) {
    return NextResponse.json(
      { error: 'Bot-Schutz fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut.' },
      { status: 400 },
    );
  }

  // TODO (eigener Workers-PR, via build:cf/preview verifiziert): Versand per
  // worker-mailer (importiert cloudflare:sockets, laeuft nur auf dem
  // Workers-Runtime und bricht `next build` unter Node). Bis dahin wird die
  // Nachricht serverseitig protokolliert und bestaetigt.
  console.info('[kontakt] Nachricht:', {
    name: data.name,
    email: data.email,
    betreff: data.betreff,
  });

  return NextResponse.json({ ok: true, delivered: false });
}
