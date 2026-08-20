# EXTRACT-REPORT — allgaeu-wings.de

Reine Rohextraktion vom **2026-08-20**. Kein Inhalt bewertet, umgebaut oder
interpretiert. Nur Fakten und Abrufprotokolle.

## 0. Wichtiger technischer Hinweis (TLS)

Die Website **www.allgaeu-wings.de präsentiert ein abgelaufenes TLS-Zertifikat**
(Zertifikatsfehler „certificate has expired"). Alle HTTP-Abrufe wurden deshalb
mit deaktivierter Zertifikatsprüfung durchgeführt (`curl -k` bzw. Chromium mit
`--ignore-certificate-errors`). Der Agent-Egress-Proxy blieb dabei aktiv
(Egress-Policy weiterhin erzwungen); es wurden ausschließlich lesende
GET-Requests ausgeführt. Zur Gegenprobe: `https://example.com/` lieferte über
denselben Proxy ein gültiges Zertifikat — das abgelaufene Zertifikat ist also
eine Eigenschaft der Zielsite, kein Proxy-Problem.

## 1. Sitemaps

Quelle: `https://www.allgaeu-wings.de/sitemap_index.xml` (Yoast SEO).

| Sitemap | `<loc>`-Einträge | HTTP |
|---|---|---|
| page-sitemap.xml | 29 | 200 |
| attachment-sitemap.xml | 44 | 200 |
| post-sitemap.xml | 0 (leeres urlset, keine Blog-Posts) | 200 |
| sitemap_index.xml | 2 (verweist auf page + attachment) | 200 |
| robots.txt | — | 200 |

- Der Sitemap-Index listet nur **page-sitemap.xml** und **attachment-sitemap.xml**.
  post-sitemap.xml existiert, ist aber leer.
- `extract/sitemaps/all-urls.txt`: **73** eindeutige, sortierte `<loc>`-URLs aus
  allen Sitemaps (29 Seiten + 44 Attachments).
- robots.txt verbietet nur `/wp-admin/` und `/wp-includes/` und nennt die Sitemap.

## 2. HTML-Abrufe

Alle **29** Seiten aus `page-sitemap.xml` als Roh-HTML in `extract/html/`
gespeichert — **alle HTTP 200, keine Fehlschläge**. Vollständiges Protokoll:
`extract/html/_fetch-log.txt`. User-Agent: Chrome-Desktop-UA, 0,5 s Pause
zwischen Requests.

Die 44 Attachment-URLs wurden auftragsgemäß **nicht** als HTML geholt (sie stehen
nur in `all-urls.txt`).

Alle in der Aufgabe als besonders wichtig markierten URLs sind enthalten, u. a.
`/`, `/rundfluege/`, `/rundflug-shop/` + alle fünf Shop-Unterseiten,
`/rundfluege/wunschrundfluege/` (+ Österreich/Schweiz), `/rundfluege/rundflugbox/`,
`/rundfluege/rundflug-buchen/`, `/wer-wir-sind/`, `/allgaeu-wings/`,
`/a320-flugsimulator/`, `/cessna-p210n-2/`, `/flugangstseminar/`, `/kontakt/`,
`/news-und-aktionen/`, `/video/`, `/impressum/`, `/imprint/`, `/datenschutz/`,
`/agb/`, `/cookie-richtlinie-eu/`, `/267-2/`.

## 3. Sprache / englische Seiten

- **`/imprint/` ist die englische Fassung von `/impressum/`** (Titel „Imprint",
  Inhalt: „Representative Manager", „All commercial…"). `/impressum/` ist deutsch.
- Weitere englischsprachige Seiten (nach `<title>`/Inhalt):
  - `/267-2/` — „Scenic Flight"
  - `/267-2/book-a-scenic-flight/` — „Request a Scenic Flight"
  - `/cessna-p210n/` — „Cessna P210N" (englische Variante; deutsche Entsprechung:
    `/cessna-p210n-2/`)
- Hinweis: Das `<html lang="…">`-Attribut ist seitenweit `de`, auch auf den
  englischen Seiten (globale Divi-Einstellung); die Sprache ergibt sich aus dem
  Seiteninhalt/Titel, nicht aus dem lang-Attribut.

## 4. CMS / Theme / Plugins (aus HTML erkennbar)

Aus Generator-Meta und Pfaden:

- **CMS:** WordPress **6.8.8** (`<meta name="generator" content="WordPress 6.8.8">`)
- **Theme:** **Divi** v**4.19.3** (`<meta content="Divi v.4.19.3">`);
  Theme-Pfad `wp-content/themes/Divi_2022/`; Page-Builder Divi Builder;
  Cache-Verzeichnis `wp-content/et-cache/`
- **Redux Framework 4.5.7** (Generator-Meta)
- **Plugins** (aus `wp-content/plugins/…`-Pfaden, Treffer über alle 29 Seiten):
  | Plugin | Vorkommen |
  |---|---|
  | contact-form-7 | 87 |
  | complianz-gdpr (Cookie-Consent) | 63 |
  | contact-form-7-designer | 58 |
  | wp-google-maps | 48 |
  | divi-builder | 29 |
- **OMGF** (Optimize My Google Fonts): lokal gehostete Open-Sans-Fonts unter
  `wp-content/uploads/omgf/et-divi-open-sans/`
- **Shop:** kein natives WooCommerce; Buchung über externes **Regiondo**-Widget
  (siehe Abschnitt 6).

## 5. CSS & Farben

- 10 Stylesheets (Startseite + Shop-Seite) roh in `extract/css/` gespeichert
  (alle HTTP 200, siehe `extract/css/_fetch-log.txt`). Wichtigste Theme-Dateien:
  `et-divi-dynamic-81.css`, `et-core-unified-deferred-*.min.css`.
- 9 Inline-`<style>`-Blöcke der Startseite (~127 KB) in
  `extract/css/inline-styles.txt`.
- `extract/css/colors.txt`: **197** verschiedene Farbwerte, nach Häufigkeit
  sortiert. `#id`-Selektoren mit Bindestrich wurden ausgeschlossen.

**Die 10 häufigsten Farbwerte:**

| # | Farbe | Treffer |
|---|---|---|
| 1 | `#fff` | 107 |
| 2 | `#000` | 30 |
| 3 | `#ffffff` | 22 |
| 4 | `#333` | 21 |
| 5 | `#2ea3f2` | 19 |
| 6 | `#0000` | 13 |
| 7 | `rgba(0,0,0,.1)` | 12 |
| 8 | `#666` | 11 |
| 9 | `#eee` | 8 |
| 10 | `#777777` | 8 |

Hinweis: `#2ea3f2` ist die Divi-Standard-Akzentfarbe (Blau). Die im
Screenshot dominante dunkelblaue Marken-/Header-/Footer-Farbe und das Rot der
Diagonal-Banner stammen aus den Sektions-/Modul-Hintergründen (siehe
`et-divi-dynamic-81.css` und Inline-Styles); die reine Häufigkeitszählung wird
von Divi-Grundfarben wie `#fff`/`#000`/`#2ea3f2` dominiert.

## 6. Shop (Regiondo)

- **Keine literalen `<iframe>`-Elemente** auf den Shop-Seiten. Der Regiondo-Shop
  ist als **JavaScript-Booking-Widget** eingebunden
  (`cdn.regiondo.net/js/integration/regiondo-booking.js`), das die Widget-URLs
  `https://allgaeu-wings.regiondo.de/bookingwidget/vendor/11122/id/<ID>` lädt.
  Details/Zuordnung: `extract/shop/iframe-src.txt`. Vendor-ID **11122**.
- Abgerufen und gespeichert (alle HTTP 200):
  - `regiondo-shop.html` (`regiondo.de/shop/allgaeu-wings.html`)
  - `regiondo-vendor-shop.html` (`allgaeu-wings.regiondo.de/`)
  - je Produkt `widget_<name>_<id>.html` (bodensee 21506, zugspitze 21507,
    dolomiti-gardasee 21505, matterhorn 21508, mont-blanc 21489)
- `extract/shop/produkte.md`: 7 Produkte aus dem Regiondo-Grid (Name, Dauer,
  Preis) + abweichende Angaben der WordPress-Seite `/rundfluege/`. Abflugort und
  Personenzahl werden im Produkt-Grid nicht je Produkt genannt und blieben leer.

## 7. Assets & Screenshots

- `extract/assets/`: Logo (`Logo.png`), Favicons (32/96, apple-180, android-192),
  og:image. `favicon.ico` = 302-Redirect (0 Byte, nicht gespeichert). Liste aller
  Bild-/og:image-URLs (23) in `asset-urls.txt`.
- `extract/screenshots/`: **alle 10 Screenshots erfolgreich** — Desktop 1440×900
  und Mobil 390×844 von `/`, `/rundfluege/`, `/rundflug-shop/`,
  `/rundflug-shop/zugspitze-rundflug/`, `/kontakt/` (Full-Page-PNG).
  - Technischer Hinweis: Chromium lief über den Agent-Proxy nur mit
    `--proxy-server=http://127.0.0.1:37569 --ssl-version-max=tls1.2`
    (TLS-1.3-ECH/GREASE führte sonst zu `ERR_CONNECTION_RESET`).

## 8. Fehlgeschlagene / ausgelassene Abrufe

- `favicon.ico` → HTTP 302 (leer), bewusst nicht gespeichert.
- Attachment-URLs (44) → auftragsgemäß nur in `all-urls.txt`, nicht als HTML.
- Sonst **keine Fehlschläge**: alle 29 HTML-Seiten, 10 CSS-Dateien, 7 Shop-HTMLs,
  6 Asset-Binärdateien und 10 Screenshots wurden erfolgreich geholt.
