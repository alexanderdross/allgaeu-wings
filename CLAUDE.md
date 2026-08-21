# CLAUDE.md, Allgäu Wings

Arbeitsanweisung für Claude Code in diesem Repository. Kurzreferenz; die **Quelle der Wahrheit für
alle Entscheidungen** ist `docs/`.

## Projektüberblick

Neubau der Website der **Allgäu Wings GmbH** (Alpen-Rundflüge mit Cessna P210N ab
Memmingen/Friedrichshafen, A320-Flugsimulator, Flugangstseminare) als **Next.js-App auf Cloudflare
Workers**, mit **nativem Stripe-Shop** statt des bisherigen Regiondo-iframes. Corporate Identity
bleibt, Design wird behutsam modernisiert. Architektur-Vorbild: die Dross:Air-Sektion in
`alexanderdross/drossnet`.

**Status:** Phasen 0 bis 2 umgesetzt, die Seite läuft live auf
`allgaeu-wings.allgaeuwings.workers.dev` (noch nicht auf der Zieldomain). Phase 3 ist teilweise
gebaut (Kontakt- und Anfrageformular mit Turnstile, Stripe-Checkout als Gerüst, 503-gated ohne
Keys). **Stufe A des Verbesserungsplans (`docs/11-verbesserungsplan.md`) ist abgeschlossen,
Stufe B1 (echter Formularversand per worker-mailer) ist umgesetzt** (SMTP-Keys folgen).
Offen: Stripe-Webhook und Gutschein-Lifecycle (D1/KV), Cutover, Rest von Stufe B/C. Reihenfolge
und Ist-Stand in `docs/10-roadmap.md` und `docs/11-verbesserungsplan.md`.

## Dokumentations-Index (`docs/`)

| Datei | Inhalt |
|---|---|
| `00-konzept.md` | Executive Summary, Ziele, KPIs, Scope, Nicht-Ziele |
| `01-architektur.md` | Stack, Cloudflare Workers/OpenNext, Bindings, Constraints, Env-Vars |
| `02-design-system.md` | Farb-Tokens (CI), Typografie, Komponenten, Refresh-Richtung |
| `03-informationsarchitektur.md` | URL-Baum, Navigation, Seitentemplates, Datenmodell |
| `04-seo-strategie.md` | Keyword→URL-Mapping, Schema.org, Core Web Vitals, Index-Hygiene |
| `05-gsc-analyse.md` | Vollauswertung der Search-Console-Exporte |
| `06-redirect-map.md` | 301-Map alt→neu (32 rankende URLs + Extract-Ergänzung) |
| `07-shop-stripe.md` | Shop-Modell, Checkout, Webhook, Gutschein-Lifecycle, D1-Schema |
| `08-recht-compliance.md` | DSGVO, Widerruf, USt, Button-Lösung, Regiondo-Exit |
| `09-migration-runbook.md` | Cloudflare-Setup, Cutover, Redirects, Rollback |
| `10-roadmap.md` | Phasen, Reihenfolge, Aufwand |
| `11-verbesserungsplan.md` | Priorisierter Verbesserungsplan (SEO/Funktion/UX), Stufen A/B/C |

Daten: `data/gsc/` (Search-Console-Exporte). Rohextraktion der Alt-Seite: `extract/` (siehe
`09-migration-runbook.md` Phase 0).

## Tech-Stack (Ziel)

| Schicht | Technologie |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 (`@theme`) + shadcn/ui (Radix), `lucide-react` |
| Formulare | react-hook-form + Zod |
| Zahlungen | Stripe (Checkout + Webhooks) |
| Datenbank | Cloudflare D1 + Drizzle ORM |
| E-Mail | worker-mailer (SMTP) |
| Bot-Schutz | Cloudflare Turnstile |
| Hosting | Cloudflare Workers via `@opennextjs/cloudflare` |
| Deploy | Cloudflare Workers Builds (Git-CI/CD ab `main`) |
| Analytics | Cloudflare Web Analytics (cookielos) |
| Paketmanager | pnpm |

## Build-Kommandos (ab Phase 1)

```bash
pnpm dev          # lokaler Dev-Server
pnpm build        # Next.js Build
pnpm build:cf     # OpenNext-Cloudflare Build (+ next-sitemap)
pnpm preview      # lokaler Workers-Preview (wrangler)
pnpm deploy       # wrangler deploy (i. d. R. via Workers Builds)
pnpm cf-typegen   # Cloudflare-Env-Typen
pnpm lint         # ESLint
pnpm test         # Vitest
```

## Harte Regeln (Cloudflare Workers)

Diese sind auf dem Workers-Runtime **nicht optional** (Herleitung `01-architektur.md`,
erprobt in `drossnet`):

1. **Middleware = `middleware.ts` (Edge)**, nie Next 16s `proxy.ts` (Node), Adapter lehnt Node ab.
2. **OG-Bilder** (`opengraph-image.tsx`) mit `export const runtime = 'nodejs'`.
3. **Bilder:** Custom `next/image`-Loader → Cloudflare Image Transformations (aus drossnet
   übernehmen). Fallback: Originale ausliefern.
4. **E-Mail: `worker-mailer`**, **nie nodemailer** (SMTP-Sockets laufen nicht auf Workers).
   Umgesetzt in `src/lib/mailer.ts` (dynamischer Import). Zwei Build-Vorkehrungen nötig, weil
   `worker-mailer` `cloudflare:sockets` nutzt: `serverExternalPackages: ['worker-mailer']` in
   `next.config.ts` (sonst bricht `next build` unter Node) und der committete
   `pnpm patch` `patches/@opennextjs__cloudflare@1.20.2.patch`, der `cloudflare:*` als
   esbuild-external markiert (sonst bricht `build:cf`). Beides entfällt bei einem
   Toolchain-Upgrade (wrangler 4 / neueres `@opennextjs/cloudflare`).
5. **Rate-Limiting bleibt In-Memory** (per Isolate). KV taugt nicht für atomare Fenster.
6. **`trailingSlash: true`**, deckungsgleich mit Alt-URLs.
7. **Webhook-Idempotenz doppelt:** KV (Replay) **und** Stripe-Metadaten/D1 (dauerhaft).
8. **Runtime-Vars im Cloudflare-Dashboard** (`keep_vars: true`), lokal `.dev.vars`.

## SEO-Konventionen

- Deutsch als Root, **kein** `/de/`-Präfix; `hreflang`/`/en/` vorbereitet, ungebaut.
- Absolute, selbstreferenzierende Canonicals; `trailingSlash: true` konsistent.
- JSON-LD je Template (`04-seo-strategie.md` §3): `Product`+`Offer`, `TouristAttraction`,
  `LocalBusiness`, `ItemList`, `FAQPage`, `BreadcrumbList`, `Organization`.
- Nur kuratierte URLs in Sitemap/robots; keine Attachment-/Tag-/Kalender-URLs erzeugen.
- 301-Redirects der rankenden Alt-URLs (`06-redirect-map.md`) sind Pflicht beim Cutover.

## Content & Daten

- Single Source of Truth: `src/data/flights.ts` (Ziele=Produkte, Standorte, Flugzeug, Preise).
- **Preise/Flugzeiten aus `extract/shop/produkte.md`, nichts schätzen.** Fehlt der Wert: `TODO`.
- Bilingual-Helfer und Datei-Struktur nach `drossnet/src/data/flightData.ts` (hier zunächst nur DE).

## Schreibstil

- **Keine Gedankenstriche.** Weder Geviertstrich (em dash, `U+2014`) noch Halbgeviertstrich
  (en dash, `U+2013`) als Satzzeichen, in keinem nutzersichtbaren Text, Kommentar oder Markdown.
  Stattdessen Komma, Doppelpunkt, Klammern oder zwei Sätze. Der normale Bindestrich `-` (`U+002D`)
  in Komposita und Bezeichnern (`Bodensee-Rundflug`, `next-sitemap`, `D-EBRH`) bleibt erlaubt.

## Accessibility

WCAG 2.1 AA: semantisches HTML, `aria-current="page"` auf aktiver Navigation, Fokus-Rückgabe beim
Menü-Schließen, Tastaturnavigation, `prefers-reduced-motion`, Fokus-Ringe (`ring-2 ring-primary`).

## Git-Workflow

- Entwicklungsbranch: `claude/allgaeu-wings-nextjs-redesign-ao2lre`.
- Aussagekräftige Commits; **kein PR ohne ausdrückliche Anweisung**.
- `alexanderdross/drossnet` ist eine **read-only Referenz**, niemals verändern.
- Modell-/Tool-Identifier gehören nicht in Commits oder Repo-Artefakte.

## Wichtige Rahmenbedingungen

- **USt-Satz und Widerrufsrecht sind fachlich offen** (`08-recht-compliance.md`), 
  `STRIPE_AUTOMATIC_TAX=false` bis geklärt.
- **Die Alt-Seite hat ein ungültiges TLS-Zertifikat**, nach Cutover über Cloudflare managed.
- **Bestehende Regiondo-Gutscheine bleiben einlösbar** (Import in D1, Runbook Phase 5).
- **Bindings phasenweise:** Statische Bilder laufen über `ASSETS`, **nicht** R2. Da die Seite
  aktuell statisch ist, ist `ASSETS` das einzige aktive Binding; R2 (Seiten-Cache), KV
  (Webhook-Idempotenz) und D1 (Gutscheine) liegen in `wrangler.jsonc` kommentiert bereit und
  werden erst mit ihrer Phase aktiviert (`docs/01-architektur.md`).
