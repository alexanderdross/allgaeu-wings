import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const anfrageSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(50).optional().default(''),
  ziel: z.string().max(100).optional().default(''),
  personen: z.coerce.number().int().min(1).max(6).optional().default(1),
  termin: z.string().max(200).optional().default(''),
  nachricht: z.string().max(5000).optional().default(''),
  // Honeypot — Bots füllen versteckte Felder aus.
  website: z.string().max(0).optional().default(''),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimit(`anfrage:${ip}`, { limit: 5, windowMs: 60_000 });
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

  const parsed = anfrageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Bitte prüfen Sie Ihre Eingaben.' }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: still verwerfen (kein Fehler an echte Nutzer).
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  // TODO (eigener Workers-PR, via build:cf/preview verifiziert):
  //  1. Cloudflare Turnstile serverseitig verifizieren.
  //  2. Versand per worker-mailer (importiert cloudflare:sockets → nur auf
  //     dem Workers-Runtime lauffähig, bricht `next build` unter Node).
  //  3. Optional Persistenz in D1 (booking_requests).
  // Bis dahin wird die Anfrage serverseitig protokolliert und bestätigt.
  console.info('[anfrage] eingegangen:', {
    name: data.name,
    email: data.email,
    ziel: data.ziel,
    personen: data.personen,
  });

  return NextResponse.json({ ok: true, delivered: false });
}
