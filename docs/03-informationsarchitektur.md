# 03 · Informationsarchitektur

Herleitung: `05-gsc-analyse.md`. Prinzip: **eine starke, indexierbare URL je Such-Intent**, die
zugleich Content **und** Shop-Produktseite ist. Ziel: ~35–45 kuratierte URLs statt ~102 dünner,
Index-Quote von 29 % → > 90 %.

## URL-Baum

```
/                                          Startseite
│
├── /rundfluege/                           Hub: alle Rundflüge (Übersicht + Filter)
│   ├── /rundfluege/zugspitze/             Ziel = Produkt   ← 70 Klicks; 60 min / 249 €
│   ├── /rundfluege/alpen/                 Ziel = Produkt   ← 3.170 Impr. ungenutzt (Hub-Ziel)
│   ├── /rundfluege/bodensee/              Ziel = Produkt   ← 487 Impr.; 60 min / 249 €
│   ├── /rundfluege/dolomiten-gardasee/    Ziel = Produkt   ← 437 Impr.; 150 min / 489 €
│   ├── /rundfluege/oetztal/               Ziel = Produkt   ← ⚠️ neu (Regiondo); 80 min / 329 €
│   ├── /rundfluege/grossglockner/         Ziel = Produkt   ← ⚠️ neu (Regiondo); 100 min / 399 €
│   ├── /rundfluege/matterhorn/            Ziel = Produkt   ← 140 min / 489 €
│   ├── /rundfluege/mont-blanc/            Ziel = Produkt   ← 150 min / 489 €
│   ├── /rundfluege/oesterreich/           Ziel = Produkt   ← Pos. 27, 403 Impr. (noch nicht gebaut)
│   ├── /rundfluege/schweiz/               Ziel = Produkt   (noch nicht gebaut)
│   └── /rundfluege/wunschrundflug/        konfigurierbar / Anfrage (noch nicht gebaut)
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

> **Abgeglichen mit dem Extract** (`extract/sitemaps/all-urls.txt` = 73 URLs, `extract/shop/produkte.md`):
> Die 7 Regiondo-Produkte sind vollständig abgebildet; **Ötztal** und **Großglockner** waren in der
> GSC nicht sichtbar und wurden ergänzt. Preise/Dauern siehe `07-shop-stripe.md` §2.1.
> Basis der Redirects: `06-redirect-map.md`.

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

Preise und Flugzeiten der 7 Ziele sind aus `extract/shop/produkte.md` belegt (`07-shop-stripe.md`
§2.1) – **nicht geschätzt**. Offen bleibt die Personenzahl je Flug (im Produkt-Grid nicht genannt,
aus dem Betrieb zu bestätigen) und die Preis-Diskrepanz Regiondo (489 €) vs. WP-Seite („444 € p. P.").

## Was NICHT migriert wird

- **Attachment-URLs** (WordPress-Medienseiten) → 410 Gone bzw. 301 auf das Elternobjekt.
- **Near-Duplicate-Kategorien** und Tag-Archive → konsolidiert in die Hubs.
- **Regiondo-iframe** → ersetzt durch native Produkt-/Checkout-Seiten (`07-shop-stripe.md`).
