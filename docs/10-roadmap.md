# 10 · Roadmap

Reihenfolge nach ROI und Abhängigkeiten. Aufwand grob (Personentage, ein erfahrener
Next.js-Entwickler / Claude-Code-gestützt). **Dieses Repo enthält aktuell nur Phase 0.**

## Phase 0 · Konzept & Datenbasis ✅ (dieser Durchgang)

- `CLAUDE.md`, `README.md`, `docs/00`–`docs/10`
- GSC-Exporte unter `data/gsc/`, ausgewertet in `05-gsc-analyse.md`
- Rohextraktion der Live-Seite unter `extract/` (Fetcher-Session)

## Phase 1 · Scaffold & Design-System (≈ 3–5 PT)

- Next.js 16 + Tailwind v4 + shadcn/ui aufsetzen, `@opennextjs/cloudflare` + `wrangler.jsonc`
- Design-Tokens aus `extract/css/colors.txt` in `globals.css` (`02-design-system.md`)
- Layout: Header (sticky + Dropdown), Footer, Mobile-Drawer, Sticky-CTA
- Selbstgehostete Fonts, Basis-Komponenten (Card, Button, Badge)
- `next/image`-Loader (Cloudflare Transformations), `middleware.ts` (Edge), `trailingSlash`
- Cloudflare-Ressourcen anlegen (R2, KV, D1) + Workers Builds verbinden
- **Ergebnis:** deploybares Grundgerüst auf `*.workers.dev`

## Phase 2 · Content-Kern & SEO (≈ 5–8 PT)

- Datenmodell `src/data/flights.ts` mit echten Zielen/Preisen (`extract/shop/produkte.md`)
- P0-Seiten: Startseite, `/rundfluege/` Hub, `/rundfluege/alpen/`, `/rundfluege/zugspitze/`
- Standortseiten Memmingen/Friedrichshafen (`LocalBusiness`)
- Flugzeugseite `/flugzeug/cessna-p210n/`
- JSON-LD je Template (`04-seo-strategie.md`), Sitemap, Canonicals
- **301-Redirect-Map** (`06-redirect-map.md`) in `next.config.ts`
- **Ergebnis:** indexierbarer Content, bereit für Cutover der reinen Info-Seiten

## Phase 3 · Nativer Stripe-Shop (≈ 5–8 PT)

- Produktseiten = Ziel-Landingpages mit Preis/Konfigurator + Kauf-CTA
- `POST /api/checkout` (serverseitige Preisauflösung, Zod, Rate-Limit)
- `POST /api/webhooks/stripe` (KV- + Metadaten-Idempotenz, async payments)
- Gutschein-Lifecycle: Code-Erzeugung, PDF, Mail, D1-Persistenz
- `/gutscheine/`, `/gutschein-einloesen/`, `/shop/danke|abbruch/`
- Kontakt-/Anfrage-Formular mit Turnstile
- **Ergebnis:** Verkauf auf eigener Domain, Regiondo ersetzbar

## Phase 4 · Cutover (≈ 2–3 PT)

- Migrations-Runbook (`09-migration-runbook.md`) Phasen 4–7 abarbeiten
- Regiondo-Alt-Codes importieren
- Domain umstellen, TLS managed, Sitemap einreichen
- 14 Tage Indexierung + Conversions beobachten
- **Ergebnis:** allgaeu-wings.de live auf Next.js/Cloudflare, Regiondo abgelöst

## Phase 5 · Ausbau (laufend)

- Restliche Ziele: `/bodensee/`, `/dolomiten-gardasee/`, `/oesterreich/`, `/matterhorn/`,
  `/mont-blanc/`, `/schweiz/`
- `/flugerlebnisse/flugangstseminar/` (FAQPage), `/a320-flugsimulator/`
- `/ratgeber/hubschrauber-oder-flugzeug-rundflug/` – **6-Monats-Erfolgskriterium** (rankt +
  konvertiert? sonst entfernen)
- Galerie mit `VideoObject`-Schema (72 Video-Impressionen heute)
- Phase-2-Ziele: Neuschwanstein, Chiemsee, Tegernsee, Großglockner
- Minimales Admin (Cloudflare Access): Gutscheinsuche, manuelle Einlösung

## Phase 6 · Optional / später

- **Verfügbarkeits-/Slot-Kalender** mit Flugzeug-/Piloten-Kapazität und Wetter-Umbuchung
  (großer Build – nur wenn Betrieb es trägt)
- Zweite Sprachebene `/en/` (nur bei belegter Auslandsnachfrage)
- Newsletter (Double-Opt-in), Testimonials/Bewertungen mit Schema

## Abhängigkeits-Kurzübersicht

```
Phase 0 (Konzept) ─▶ Phase 1 (Scaffold) ─▶ Phase 2 (Content/SEO) ─┐
                                                                   ├─▶ Phase 4 (Cutover) ─▶ Phase 5/6
                            Phase 3 (Shop) ────────────────────────┘
```
Phase 2 und 3 können teilweise parallel laufen; der Cutover braucht beide plus die Redirect-Map.
