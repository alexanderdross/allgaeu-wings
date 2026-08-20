# 03 · Informationsarchitektur

Herleitung: `05-gsc-analyse.md`. Prinzip: **eine starke, indexierbare URL je Such-Intent**, die
zugleich Content **und** Shop-Produktseite ist. Ziel: ~35–45 kuratierte URLs statt ~102 dünner,
Index-Quote von 29 % → > 90 %.

## URL-Baum

```
/                                          Startseite
│
├── /rundfluege/                           Hub: alle Rundflüge (Übersicht + Filter)
│   ├── /rundfluege/zugspitze/             Ziel = Produkt   ← 70 Klicks Shop-Seite heute
│   ├── /rundfluege/alpen/                 Ziel = Produkt   ← 3.170 Impr. ungenutzt
│   ├── /rundfluege/bodensee/              Ziel = Produkt   ← 487 Impr.
│   ├── /rundfluege/dolomiten-gardasee/    Ziel = Produkt   ← 437 Impr.
│   ├── /rundfluege/matterhorn/            Ziel = Produkt
│   ├── /rundfluege/mont-blanc/            Ziel = Produkt
│   ├── /rundfluege/oesterreich/           Ziel = Produkt   ← Pos. 27, 403 Impr.
│   ├── /rundfluege/schweiz/               Ziel = Produkt
│   └── /rundfluege/wunschrundflug/        konfigurierbar / Anfrage
│
├── /standorte/                            Hub: Abflugorte
│   ├── /standorte/memmingen/              LocalBusiness-Schema
│   └── /standorte/friedrichshafen/        LocalBusiness-Schema  ← Bodensee-Nähe
│
├── /flugzeug/cessna-p210n/                Flugzeug-Steckbrief  ← 153 Impr. Cessna-Queries
│
├── /flugerlebnisse/
│   ├── /flugerlebnisse/a320-flugsimulator/    ← 24 Klicks heute
│   └── /flugerlebnisse/flugangstseminar/      ← 455 Impr., FAQPage-Schema
│
├── /gutscheine/                           Gutschein-Hub (ersetzt Rundflugbox)
├── /gutschein-einloesen/                  Code einlösen → Terminanfrage
│
├── /shop/warenkorb/                       Warenkorb
├── /shop/danke/                           Stripe success_url
├── /shop/abbruch/                         Stripe cancel_url
│
├── /ueber-uns/                            ersetzt /wer-wir-sind/  ← Pos. 4, stark
├── /kontakt/                              Kontakt + LocalBusiness
├── /kontakt/anfrage/                      Buchungsanfrage-Formular (Turnstile)
├── /news/                                 ersetzt /news-und-aktionen/
├── /galerie/                              ersetzt /video/ (Videos + Fotoflug-Bilder)
│
├── /ratgeber/                             (Phase 2, max. 4–6 Seiten)
│   └── /ratgeber/hubschrauber-oder-flugzeug-rundflug/   ← 2.820 Impr. ehrlich abholen
│
└── /rechtliches/
    ├── /rechtliches/impressum/
    ├── /rechtliches/datenschutz/
    ├── /rechtliches/agb/
    └── /rechtliches/widerruf/
```

> Die exakten Ziel-Slugs und die vollständige Routenliste werden nach Vorliegen der
> Live-Extraktion (`extract/sitemaps/all-urls.txt`, `extract/shop/produkte.md`) gegen den
> Ist-Zustand abgeglichen. Basis der Redirects: `06-redirect-map.md`.

## Navigation

**Header (sticky, Mobile-Drawer):**

| Label | Ziel | Hinweis |
|---|---|---|
| Rundflüge | `/rundfluege/` | Mega-Dropdown mit Zielen |
| Standorte | `/standorte/` | Dropdown Memmingen / Friedrichshafen |
| Flugzeug | `/flugzeug/cessna-p210n/` | |
| Flugerlebnisse | `/flugerlebnisse/` | Simulator, Flugangstseminar |
| Gutscheine | `/gutscheine/` | |
| Über uns | `/ueber-uns/` | |
| Kontakt | `/kontakt/` | |
| **Jetzt buchen** | `/rundfluege/` | primärer CTA-Button, immer sichtbar |

**Mobil:** zusätzlich ein **sticky Bottom-CTA** („Rundflug buchen") auf allen Ziel-/Produktseiten
(71 % Mobil-Traffic).

**Footer:** Standorte, Top-Ziele, Gutscheine, Flugangstseminar, Rechtliches, Kontakt/Social.

## Seitentemplates

| Template | Verwendung | Kernbausteine |
|---|---|---|
| **Startseite** | `/` | Hero, Top-Ziele-Grid, Standorte, Flugzeug-Teaser, Gutschein-Sektion, Trust/Testimonials |
| **Ziel = Produkt** | `/rundfluege/[slug]/` | Hero-Bild, Beschreibung, Highlights, Flugzeit, Preis/Konfigurator, Kauf-CTA, Karte, FAQ, `Product`+`TouristAttraction`-Schema |
| **Rundflug-Hub** | `/rundfluege/` | Karten-Grid aller Ziele, Filter (Region/Dauer/Preis), `ItemList`-Schema |
| **Standort** | `/standorte/[slug]/` | Anfahrt/Karte, verfügbare Ziele ab hier, Flugzeug, `LocalBusiness`-Schema |
| **Flugzeug** | `/flugzeug/cessna-p210n/` | technische Daten, Galerie, Sicherheits-/Komfort-Text |
| **Erlebnis** | `/flugerlebnisse/[slug]/` | Beschreibung, Ablauf, Preis/Buchung, FAQ (Flugangstseminar: `FAQPage`) |
| **Gutschein-Hub** | `/gutscheine/` | Gutschein-Varianten, Kauf-CTA, Einlöse-Erklärung |
| **Ratgeber** | `/ratgeber/[slug]/` | Longform-Content, interne Verlinkung zu Zielen/Produkten |
| **Rechtstext** | `/rechtliches/[slug]/` | Accordion/Longform, druckoptimiert |

Karten-Grid-Muster (Bild + Badge + Meta-Zeilen + Vollbreiten-Button) aus
`drossnet/src/views/air/AirStandorte.tsx` übernehmen.

## Datenmodell (Content im Repo)

Typisiertes Datenmodell nach Vorbild `drossnet/src/data/flightData.ts` +
`attractionsData.ts` – Single Source of Truth für Ziele, Standorte, Flugzeug, Preise:

```ts
// src/data/flights.ts
export interface Standort { id, name, airport, icao, region, beschreibung, mapsUrl }
export interface Flugzeug { id, name, specs{...}, maxPassagiere, bilder }
export interface Rundflug {                    // = Ziel = Produkt
  slug, name, region, standortId,
  kurzbeschreibung, langbeschreibung, highlights[],
  flugzeitMin, basisPreis, bild,
  kategorie: 'alpen'|'see'|'berg'|'stadt'|'wunsch',
  stripePriceHint?, popular?
}
```

Preise und exakte Flugzeiten werden aus `extract/shop/produkte.md` übernommen – **nicht geschätzt**.
Bis dahin `TODO`-Platzhalter.

## Was NICHT migriert wird

- **Attachment-URLs** (WordPress-Medienseiten) → 410 Gone bzw. 301 auf das Elternobjekt.
- **Near-Duplicate-Kategorien** und Tag-Archive → konsolidiert in die Hubs.
- **Regiondo-iframe** → ersetzt durch native Produkt-/Checkout-Seiten (`07-shop-stripe.md`).
