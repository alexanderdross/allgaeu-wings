# Allgäu Wings — Website-Neubau

Konzept und Dokumentation für den Neubau von [allgaeu-wings.de](https://www.allgaeu-wings.de/) als
**Next.js-App auf Cloudflare Workers** mit **nativem Stripe-Shop** (Ablösung des Regiondo-iframes).
Corporate Identity bleibt erhalten, Design wird behutsam modernisiert.

> **Status: Phase 0 — Konzept & Datenbasis.** Dieses Repository enthält aktuell **Dokumentation**,
> noch keinen Anwendungscode. Der Code-Aufbau ist Phase 1 (`docs/10-roadmap.md`).

## Warum der Neubau

- Der Verkauf läuft über einen **Regiondo-iframe** — fremde Domain, keine eigenen Kundendaten,
  kein SEO-Wert.
- Nur **~29 % der URLs sind bei Google indexiert** (30 von ~102).
- Für nachfragestarke Ziel-Begriffe („alpenrundflug", „rundflug bodensee", „gardasee") fehlen
  eigene Landingpages — die Startseite rankt breit und schwach.
- Die Live-Seite hat ein **ungültiges TLS-Zertifikat**.

Vollständige Analyse: [`docs/05-gsc-analyse.md`](docs/05-gsc-analyse.md).

## Dokumentation

| # | Dokument | Inhalt |
|---|---|---|
| 00 | [Konzept](docs/00-konzept.md) | Summary, Ziele, KPIs, Scope |
| 01 | [Architektur](docs/01-architektur.md) | Stack, Cloudflare Workers, Bindings, Constraints |
| 02 | [Design-System](docs/02-design-system.md) | CI-Tokens, Typografie, Komponenten |
| 03 | [Informationsarchitektur](docs/03-informationsarchitektur.md) | URL-Baum, Navigation, Templates |
| 04 | [SEO-Strategie](docs/04-seo-strategie.md) | Keyword→URL, Schema.org, CWV |
| 05 | [GSC-Analyse](docs/05-gsc-analyse.md) | Search-Console-Auswertung |
| 06 | [Redirect-Map](docs/06-redirect-map.md) | 301 alt→neu |
| 07 | [Shop & Stripe](docs/07-shop-stripe.md) | Checkout, Webhook, Gutscheine, D1 |
| 08 | [Recht & Compliance](docs/08-recht-compliance.md) | DSGVO, Widerruf, USt |
| 09 | [Migrations-Runbook](docs/09-migration-runbook.md) | Cutover, Rollback |
| 10 | [Roadmap](docs/10-roadmap.md) | Phasen, Aufwand |

Arbeitsanweisung für Claude Code: [`CLAUDE.md`](CLAUDE.md).

## Zielarchitektur (Kurzfassung)

```
Next.js 16 (App Router, TS)  ──build:cf──▶  @opennextjs/cloudflare  ──▶  Cloudflare Worker
        │                                                                     │
   Tailwind v4 + shadcn/ui                          R2 (ISR-Cache) · KV (Webhook) · D1 (Gutscheine)
   Stripe Checkout + Webhooks                       Turnstile · Image Transformations · Web Analytics
   worker-mailer (SMTP)                             Deploy: Cloudflare Workers Builds (ab main)
```

## Datengrundlage

- `data/gsc/` — Google-Search-Console-Exporte (Performance + Coverage), 19.05.–18.08.2026.
- `extract/` — Rohextraktion der Live-Seite (HTML, CSS/Farben, Assets, Screenshots, Shop-Daten),
  erzeugt durch eine separate Fetcher-Session (siehe [Runbook Phase 0](docs/09-migration-runbook.md)).

## Referenz

Das Repository [`alexanderdross/drossnet`](https://github.com/alexanderdross/drossnet)
(Sektion Dross:Air) dient als **read-only Architektur-Vorbild** — dieselbe Domäne (Rundflüge,
Standorte, Ziele, Gutscheine), derselbe Stack, produktiv erprobte Cloudflare-Migration.

## Nächster Schritt

Phase 1 aus der [Roadmap](docs/10-roadmap.md): Next.js-Scaffold, Design-Tokens aus der Extraktion,
Cloudflare-Ressourcen, deploybares Grundgerüst.
