# 00 · Konzept & Executive Summary

## Ausgangslage

Die **Allgäu Wings GmbH** (Am Postwäldle 8, 88171 Weiler-Simmerberg; Geschäftsführer Heiko Böhmer,
Thomas Daubner; USt-IdNr. DE299519907) betreibt Alpen-Rundflüge mit einer Cessna P210N ab
Memmingen und Friedrichshafen, einen A320-Flugsimulator (Haar bei München), Flugangstseminare
sowie Charter und IFR-Training.

Die aktuelle Website `www.allgaeu-wings.de` läuft auf **WordPress** und ist in die Jahre gekommen:

- Der Online-Shop ist ein **Regiondo-iframe** – fremde Domain, fremdes Checkout, fremde
  Kundendaten, kein SEO-Wert, schlechte Ladezeit.
- Nur **~29 % der URLs sind bei Google indexiert** (30 von ~102, siehe `05-gsc-analyse.md`).
- Für nachfragestarke Ziel-Begriffe („alpenrundflug", „rundflug bodensee", „rundflug gardasee")
  existieren **keine eigenen Landingpages** – die Startseite rankt breit und schwach.
- **Das TLS-Zertifikat der Live-Seite ist ungültig/abgelaufen** (bei der Extraktion nur mit
  `--insecure` erreichbar). Ein Sicherheits- und Vertrauensproblem, das den Neubau zusätzlich
  dringlich macht.

## Ziel

Ein **Neubau in Next.js**, gehostet auf **Cloudflare Workers** (Deploy via Workers Builds), mit
einem **nativen Stripe-Shop** statt Regiondo. **Corporate Identity und Farbpalette bleiben
erhalten**, das Design wird behutsam modernisiert. Architektonisches Vorbild ist die produktive
Dross:Air-Sektion aus `alexanderdross/drossnet` – dieselbe Domäne, derselbe Stack, mit einer
vollständig dokumentierten Cloudflare-Migration, deren Fallstricke hier von Beginn an vermieden
werden.

## Leitprinzipien

1. **Intent-getriebene URL-Struktur.** Jede nachfragestarke Ziel-/Regions-Query bekommt genau eine
   starke Landingpage, die zugleich Shop-Produktseite ist. Weniger URLs, mehr Autorität je URL.
2. **Mobile-First.** 71 % der Klicks sind mobil (CTR 6,3 %). Sticky-Buchungs-CTA, schnelles LCP,
   Touch-Optimierung.
3. **Nativer Verkauf.** Kauf und Kundendaten bleiben auf der eigenen Domain (Stripe), nicht bei
   Regiondo.
4. **Ehrlichkeit vor Traffic.** Kein Doorway-SEO für Hubschrauber-Queries – eine sachliche
   Vergleichsseite statt irreführender Seiten.
5. **DSGVO by design.** Selbstgehostete Schriften, cookielose Analytics (kein Banner),
   Datenverarbeitung auf eigener Infrastruktur.
6. **Keine erfundenen Fakten.** Preise, Farbwerte, Flugzeiten stammen aus der Extraktion der
   Live-Seite (`extract/`) oder sind als `TODO` markiert.

## Erfolgskriterien (KPIs, 6–12 Monate nach Go-live)

| Kennzahl | Heute | Ziel |
|---|---|---|
| Index-Quote | ~29 % | > 90 % |
| Ø Position Ziel-Queries | 10–27 | < 8 |
| Klicks „alpen\*"-Cluster | 50 | > 200 |
| Mobile LCP | (WordPress) | < 2,5 s |
| Shop-Conversion | unbekannt (Regiondo) | messbar auf eigener Domain |
| TLS / Sicherheit | ungültiges Zertifikat | A+ (Cloudflare-managed) |

## Scope dieses Repositories (aktueller Durchgang)

Dieser Durchgang liefert **das Konzept als Dokumentation**, keinen Anwendungscode:

- `CLAUDE.md` – Arbeitsanweisung für Claude Code in diesem Repo
- `README.md` – Einstieg und Doku-Index
- `docs/00`–`docs/10` – Konzept, Architektur, Design, IA, SEO, GSC, Redirects, Shop, Recht,
  Migration, Roadmap
- `data/gsc/` – die Search-Console-Exporte (Nachvollziehbarkeit)
- `extract/` – Rohextraktion der Live-Seite (von der Fetcher-Session, siehe `09-migration-runbook.md`)

**Nicht enthalten:** `package.json`, Komponenten, Next.js-Scaffold. Der Code-Aufbau ist **Phase 1
der Roadmap** (`10-roadmap.md`) und ein eigener, nachgelagerter Auftrag.

## Nicht-Ziele

- Keine zweite Sprachebene zum Launch (Auslandstraffic ist Rauschen, siehe `05-gsc-analyse.md` §4).
- Kein Verfügbarkeits-/Slot-Kalender zum Launch (Gutschein-first, Kalender ist Phase 3).
- Kein Umzug weg von Vercel-Alternativen aus Prinzip – Cloudflare Workers ist die bewusste,
  begründete Hosting-Wahl (`01-architektur.md`).
