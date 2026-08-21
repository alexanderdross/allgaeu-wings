# 10 · Roadmap

Reihenfolge nach ROI und Abhängigkeiten. Aufwand grob (Personentage, ein erfahrener
Next.js-Entwickler / Claude-Code-gestützt).

**Stand 21.08.2026:** Phasen 0 bis 2 sind umgesetzt, die Seite läuft live auf
`allgaeu-wings.allgaeuwings.workers.dev` (noch nicht auf der Zieldomain). Phase 3 ist
teilweise gebaut (Kontakt- und Anfrageformular mit Turnstile stehen, der Stripe-Checkout
ist als Gerüst vorhanden, aber 503-gated ohne Keys). Offen: Stripe-Webhook,
Gutschein-Lifecycle mit D1, Cutover (Phase 4). Details und Priorisierung der nächsten
Ausbauschritte in `11-verbesserungsplan.md`.

## Phase 0 · Konzept & Datenbasis ✅ (abgeschlossen)

- `CLAUDE.md`, `README.md`, `docs/00` bis `docs/10`
- GSC-Exporte unter `data/gsc/`, ausgewertet in `05-gsc-analyse.md`
- Rohextraktion der Live-Seite unter `extract/` (Fetcher-Session)

## Phase 1 · Scaffold & Design-System ✅ (abgeschlossen)

- Next.js 16 + Tailwind v4 + shadcn/ui aufsetzen, `@opennextjs/cloudflare` + `wrangler.jsonc`
- Design-Tokens aus `extract/css/colors.txt` in `globals.css` (`02-design-system.md`)
- Layout: Header (sticky + Dropdown), Footer, Mobile-Drawer, Sticky-CTA
- Selbstgehostete Fonts, Basis-Komponenten (Card, Button, Badge)
- `next/image`-Loader (Cloudflare Transformations), `middleware.ts` (Edge), `trailingSlash`
- Cloudflare-Ressourcen anlegen (R2, KV, D1) + Workers Builds verbinden
- **Ergebnis:** deploybares Grundgerüst auf `*.workers.dev`

## Phase 2 · Content-Kern & SEO ✅ (abgeschlossen)

- Datenmodell `src/data/flights.ts` mit echten Zielen/Preisen (`extract/shop/produkte.md`)
- P0-Seiten: Startseite, `/rundfluege/` Hub, `/rundfluege/alpen/`, `/rundfluege/zugspitze/`
- Standortseiten Memmingen/Friedrichshafen (`LocalBusiness`)
- Flugzeugseite `/flugzeug/cessna-p210n/`
- JSON-LD je Template (`04-seo-strategie.md`), Sitemap, Canonicals
- **301-Redirect-Map** (`06-redirect-map.md`) in `next.config.ts`
- **Ergebnis:** indexierbarer Content, bereit für Cutover der reinen Info-Seiten

## Phase 3 · Nativer Stripe-Shop (≈ 5 bis 8 PT, teilweise gebaut)

- ✅ Produktseiten = Ziel-Landingpages mit Preis + Kauf-CTA
- ✅ `POST /api/checkout` (serverseitige Preisauflösung, Zod, Rate-Limit), 503-gated ohne Keys
- ✅ Kontakt-/Anfrage-Formular mit Turnstile (serverseitige Verifikation)
- ☐ `POST /api/webhooks/stripe` (KV- + Metadaten-Idempotenz, async payments)
- ☐ Gutschein-Lifecycle: Code-Erzeugung, PDF, Mail, D1-Persistenz
- ☐ `/gutschein-einloesen/`, `/shop/danke|abbruch/`
- **Ergebnis (Ziel):** Verkauf auf eigener Domain, Regiondo ersetzbar

## Phase 4 · Cutover (≈ 2 bis 3 PT)

- Migrations-Runbook (`09-migration-runbook.md`) Phasen 4 bis 7 abarbeiten
- Regiondo-Alt-Codes importieren
- Domain umstellen, TLS managed, Sitemap einreichen
- 14 Tage Indexierung + Conversions beobachten
- **Ergebnis:** allgaeu-wings.de live auf Next.js/Cloudflare, Regiondo abgelöst

## Phase 5 · Ausbau (laufend)

- ✅ Alle sieben Ziel-Detailseiten (Zugspitze, Bodensee, Ötztal, Großglockner, Matterhorn,
  Mont Blanc, Dolomiten & Gardasee), plus `/rundfluege/alpen/` als Kategorie-Landingpage
- ✅ `/flugerlebnisse/flugangstseminar/` (FAQPage + Service), `/a320-flugsimulator/`,
  `/flugerlebnisse/taxiflug/`
- ✅ `/ratgeber/hubschrauber-oder-flugzeug-rundflug/`, `/faq/`, `/galerie/` (Foto-Grid)
- ✅ Regionale Longtail-Ziele (Neuschwanstein, Bayern/München, Chiemsee, Tegernsee) als
  Regionen-Sektion mit interner Verlinkung auf `/rundfluege/alpen/`
- `/ratgeber/hubschrauber-oder-flugzeug-rundflug/`: **6-Monats-Erfolgskriterium** (rankt +
  konvertiert? sonst entfernen)
- Galerie um `VideoObject`-Schema ergänzen (72 Video-Impressionen heute, Erklärvideo)
- Minimales Admin (Cloudflare Access): Gutscheinsuche, manuelle Einlösung

## Phase 6 · Optional / später

- **Verfügbarkeits-/Slot-Kalender** mit Flugzeug-/Piloten-Kapazität und Wetter-Umbuchung
  (großer Build, nur wenn Betrieb es trägt)
- Zweite Sprachebene `/en/` (nur bei belegter Auslandsnachfrage)
- Newsletter (Double-Opt-in), Testimonials/Bewertungen mit Schema

## Abhängigkeits-Kurzübersicht

```
Phase 0 (Konzept) ─▶ Phase 1 (Scaffold) ─▶ Phase 2 (Content/SEO) ─┐
                                                                   ├─▶ Phase 4 (Cutover) ─▶ Phase 5/6
                            Phase 3 (Shop) ────────────────────────┘
```
Phase 2 und 3 können teilweise parallel laufen; der Cutover braucht beide plus die Redirect-Map.
