# 01 · Architektur

## Stack

| Schicht | Technologie |
|---|---|
| Framework | **Next.js 16** (App Router), React 19 |
| Sprache | TypeScript (strict) |
| Styling | **Tailwind CSS v4** (`@theme`) + shadcn/ui (Radix) |
| Icons | `lucide-react` |
| Formulare | `react-hook-form` + **Zod** |
| Zahlungen | **Stripe** (Checkout Session + Webhooks) |
| Datenbank | **Cloudflare D1** (SQLite) + Drizzle ORM |
| E-Mail | **`worker-mailer`** (SMTP-fähig auf Workers) |
| Bot-Schutz | **Cloudflare Turnstile** |
| Sitemap | `next-sitemap` |
| Paketmanager | **pnpm** |
| Hosting | **Cloudflare Workers** via `@opennextjs/cloudflare` |
| Deploy | **Cloudflare Workers Builds** (Git-CI/CD) |
| Analytics | **Cloudflare Web Analytics** (cookielos) |

Diese Kombination ist in `alexanderdross/drossnet` (Sektion Dross:Air) produktiv erprobt – dieses
Projekt übernimmt Muster und vermeidet die dort erst nachträglich gelösten Fallstricke.

## Hosting: Cloudflare Workers (nicht Vercel)

Die App ist ein **Server-App** (SSR/SSG-Seiten, `app/api/*`-Routen, Edge-Middleware, dynamische
OG-Bilder), wird also über den **`@opennextjs/cloudflare`-Adapter** als **ein Worker** gepackt,
nicht als statische Assets.

**Deploy-Modell: Workers Builds.** Cloudflares natives Git-CI/CD baut und deployt bei jedem Push
auf `main` (`pnpm build:cf` → `wrangler deploy`). **Kein GitHub-Actions-Deploy**, keine
`CLOUDFLARE_*`-Secrets in GitHub. GitHub Actions bleibt nur für Lint/Test/Lighthouse.

**Plan: Workers Paid** (~5 $/Monat) empfohlen – wegen CPU-Zeit pro Request (Stripe-Aufrufe,
PDF-Erzeugung), R2/KV/D1-Kontingenten und Image Transformations.

### Bindings (`wrangler.jsonc`)

| Binding | Typ | Zweck |
|---|---|---|
| `ASSETS` | Assets | statische Dateien aus `.open-next/assets` |
| `NEXT_INC_CACHE_R2_BUCKET` | R2 | ISR/SSG-Cache, in `withRegionalCache` (`long-lived`) gewrappt |
| `WEBHOOK_IDEMPOTENCY_KV` | KV | Stripe-Webhook-Replay-Guard (24 h TTL) |
| `DB` | D1 | Gutscheine, Einlösungen, Anfragen, Webhook-Events |
| `MEDIA` | R2 (optional) | Original-Medien, Videoassets |

`compatibility_flags: ["nodejs_compat"]`, `compatibility_date >= 2024-09-23` (nötig für Stripe und
`node:crypto`), `keep_vars: true` (sonst löscht jeder Deploy die im Dashboard gesetzten Vars),
`observability.enabled: true`.

## Workers-Constraints (harte Regeln)

Aus der Migration in `drossnet` (`src/docs/memory/architecture/cloudflare-workers-migration.md`).
Diese Punkte **von Anfang an** berücksichtigen – sie sind auf dem Workers-Runtime nicht optional:

1. **Middleware = `middleware.ts` (Edge-Runtime)**, nicht Next 16s `proxy.ts` (Node-Runtime) –
   der Adapter lehnt Node-Middleware ab. Nur Web-Standard-APIs verwenden.
2. **`opengraph-image.tsx` braucht `export const runtime = 'nodejs'`** – die Edge-Runtime wird vom
   Adapter nicht unterstützt.
3. **Kein Vercel-Bildoptimierer.** Custom `next/image`-Loader (`image-loader.ts`) → **Cloudflare
   Image Transformations** (`/cdn-cgi/image/...`), per `NEXT_PUBLIC_CF_IMAGE_TRANSFORMATIONS=true`
   geschaltet. Fallback (Flag aus): vorab optimierte Originale ausliefern, damit Bilder auf jedem
   Host laden. Loader aus `drossnet` 1:1 übernehmen.
4. **Kein nodemailer.** SMTP über rohe Node-Sockets läuft nicht auf Workers → **`worker-mailer`**
   hinter einem einheitlichen `sendMail()`. Vorteil gegenüber einem Drittanbieter (Resend o. ä.):
   kein zusätzlicher Auftragsverarbeiter in der DSGVO-Kette.
5. **Rate-Limiting bleibt bewusst In-Memory** (per Isolate, Best Effort). KV ist asynchron und
   eventually consistent – kein atomares Fenster. Für harte Limits das **Rate-Limiting-Binding**
   oder ein **Durable Object** verwenden. Für dieses Volumen zusammen mit Turnstile nicht nötig.
6. **Statisches Caching** über `public/_headers`.
7. **`trailingSlash: true`** – deckungsgleich mit den WordPress-Alt-URLs, hält 301-Redirects sauber.

## Datenbank: Cloudflare D1

D1 ist ein natives Binding – kein externer Dienst, kein Connection-Pooling, kein Egress. Es hält
**nur, was Stripe nicht kann**:

| Tabelle | Zweck |
|---|---|
| `vouchers` | Gutschein-Code, Produkt, Betrag, Status, Ablauf, Käufer, Stripe-Session |
| `redemptions` | Einlösungen: Gutschein, Wunschtermin, Passagiere, Abflugort, Status |
| `booking_requests` | Anfragen aus `/kontakt/anfrage/` (kein Direktkauf) |
| `webhook_events` | Stripe-Event-IDs (dauerhafte Idempotenz, Unique-Index) |

Bestellungen und Zahlungen bleiben **in Stripe** (Dashboard = Bestellübersicht). Details:
`07-shop-stripe.md`. Alternative (dokumentiert, nicht empfohlen): Supabase Postgres über
Hyperdrive, falls später eine fertige Admin-Oberfläche gewünscht ist.

## Cloudflare-Rollen im Überblick

| Dienst | Rolle |
|---|---|
| Workers | App-Hosting (SSR/SSG/API/Middleware) |
| Workers Builds | Deploy-CI/CD ab `main` |
| R2 | ISR-Cache + optional Medien-Archiv |
| KV | Webhook-Idempotenz |
| D1 | Gutschein-/Anfrage-Datenhaltung |
| Turnstile | Formular-Spam-Schutz |
| Image Transformations | `next/image`-Optimierung |
| Web Analytics | cookielose Reichweitenmessung |
| DNS + Access | Zone-Verwaltung, Admin-Schutz |

## Sprache & Lokalisierung

- **Deutsch als Root**, ohne `/de/`-Präfix (93 % der Klicks aus DE, siehe `05-gsc-analyse.md`).
- `hreflang`- und `/en/`-Struktur bleiben vorbereitet, aber **ungebaut** – kein EN-Launch.

## Umgebungsvariablen (Überblick)

Vollständige Liste inkl. Secrets in `07-shop-stripe.md`. Kern:

```
# Stripe
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_AUTOMATIC_TAX          # default "false" bis USt-Satz geklärt (08-recht-compliance.md)

# E-Mail (worker-mailer / SMTP)
SMTP_HOST · SMTP_PORT · SMTP_USER · SMTP_PASS
SHOP_EMAIL_TO                 # Büro-Postfach für Bestellungen/Anfragen

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY

# Site
SITE_URL                      # https://www.allgaeu-wings.de
NEXT_PUBLIC_CF_IMAGE_TRANSFORMATIONS   # "true" nach Aktivierung auf der Zone
```

Runtime-Vars werden **im Cloudflare-Dashboard** gesetzt (nicht in `wrangler.jsonc`); `keep_vars`
schützt sie vor Überschreiben bei jedem Deploy. Lokale Entwicklung: `.dev.vars`.
