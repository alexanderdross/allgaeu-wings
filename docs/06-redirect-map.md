# 06 · Redirect-Map (301)

Erhält die über Jahre aufgebaute Autorität der rankenden Alt-URLs. Umsetzung in
`next.config.ts` → `redirects()` (permanent/301). Prinzip: **jede rankende Alt-URL zeigt auf die
inhaltlich nächste neue URL**; verwaiste WordPress-URLs (Attachments) werden entsorgt.

`trailingSlash: true` – alle Quell- und Ziel-URLs mit Slash, deckungsgleich zu WordPress.

## 1. Rankende Seiten (Quelle: `data/gsc/performance/Seiten.csv`, alle 32 URLs)

| Alt-URL | Neu-URL | Klicks | Typ |
|---|---|---|---|
| `/rundflug-shop/zugspitze-rundflug/` | `/rundfluege/zugspitze/` | 70 | 301 |
| `/rundfluege/` | `/rundfluege/` | 116 | bleibt (Hub) |
| `/wer-wir-sind/` | `/ueber-uns/` | 37 | 301 |
| `/a320-flugsimulator/` | `/flugerlebnisse/a320-flugsimulator/` | 24 | 301 |
| `/cessna-p210n-2/` | `/flugzeug/cessna-p210n/` | 22 | 301 |
| `/cessna-p210n/` | `/flugzeug/cessna-p210n/` | 0 | 301 |
| `/rundflug-shop/dolomiti-gardasee-rundflug/` | `/rundfluege/dolomiten-gardasee/` | 16 | 301 |
| `/flugangstseminar/` | `/flugerlebnisse/flugangstseminar/` | 14 | 301 |
| `/rundfluege/wunschrundfluege/oesterreich_rundflug/` | `/rundfluege/oesterreich/` | 10 | 301 |
| `/rundflug-shop/` | `/rundfluege/` | 10 | 301 |
| `/rundflug-shop/matterhorn-rundflug/` | `/rundfluege/matterhorn/` | 7 | 301 |
| `/kontakt/` | `/kontakt/` | 6 | bleibt |
| `/rundflug-shop/mont-blanc-rundflug/` | `/rundfluege/mont-blanc/` | 6 | 301 |
| `/news-und-aktionen/` | `/news/` | 5 | 301 |
| `/rundfluege/wunschrundfluege/rundflug_schweiz/` | `/rundfluege/schweiz/` | 4 | 301 |
| `/rundflug-shop/bodensee-rundflug/` | `/rundfluege/bodensee/` | 3 | 301 |
| `/allgaeu-wings/` | `/ueber-uns/` | 3 | 301 |
| `/imprint/` | `/rechtliches/impressum/` | 3 | 301 |
| `/rundfluege/wunschrundfluege/` | `/rundfluege/wunschrundflug/` | 1 | 301 |
| `/impressum/` | `/rechtliches/impressum/` | 1 | 301 |
| `/267-2/` | `/ueber-uns/` | 1 | 301 |
| `/rundfluege/rundflug-buchen/` | `/kontakt/anfrage/` | 1 | 301 |
| `/video/` | `/galerie/` | 0 | 301 |
| `/rundfluege/rundflugbox/` | `/gutscheine/` | 0 | 301 |
| `/datenschutz/` | `/rechtliches/datenschutz/` | 0 | 301 |
| `/agb/` | `/rechtliches/agb/` | 0 | 301 |
| `/cookie-richtlinie-eu/` | `/rechtliches/datenschutz/#cookies` | 0 | 301 |
| `/downloads/agb.pdf` | `/rechtliches/agb/` | 0 | 301 |
| `/conternt/all_Flyer_V04_041215_print.pdf` | `410 Gone` | 0 | 410 |
| `http://www.allgaeu-wings.de/` | `https://www.allgaeu-wings.de/` | 0 | 301 (TLS) |
| `https://allgaeu-wings.de/` | `https://www.allgaeu-wings.de/` | 0 | 301 (Canonical) |

**Domain-Kanonisierung:** `http→https` und Apex↔`www` werden auf Cloudflare-Ebene bzw. in
`middleware.ts` erzwungen (behebt zugleich das abgelaufene TLS-Zertifikat der Alt-Seite).
Canonical-Wahl (`www` vs. Apex) in Phase 1 festlegen und konsistent halten.

## 2. Vollständige Alt-URL-Liste (aus `extract/sitemaps/all-urls.txt` = 73 URLs)

Die Sitemap (Yoast) enthält **29 Seiten** (`page-sitemap.xml`) + **44 Attachments**
(`attachment-sitemap.xml`); `post-sitemap.xml` ist leer (kein Blog). Behandlung:

### 2.1 Zusätzliche Seiten-URLs (nicht in Abschnitt 1, aber in der Page-Sitemap)

| Alt-URL | Neu-URL | Typ | Hinweis |
|---|---|---|---|
| `/rundflug-shop/matterhorn-rundflug/` | `/rundfluege/matterhorn/` | 301 | 140 min / 489 € |
| `/rundflug-shop/mont-blanc-rundflug/` | `/rundfluege/mont-blanc/` | 301 | 150 min / 489 € |
| `/rundflug-shop/bodensee-rundflug/` | `/rundfluege/bodensee/` | 301 | 60 min / 249 € |
| `/rundfluege/rundflug-buchen/` | `/kontakt/anfrage/` | 301 | Anfrageformular |
| `/rundfluege/rundflugbox/` | `/gutscheine/` | 301 | „Rundflugbox" = Gutschein |
| `/cessna-p210n/` (EN) | `/flugzeug/cessna-p210n/` | 301 | engl. Variante von `-2/` |
| `/267-2/` (EN „Scenic Flight") | `/rundfluege/` | 301 | verwaiste EN-Seite |
| `/267-2/book-a-scenic-flight/` (EN) | `/kontakt/anfrage/` | 301 | EN-Anfrageseite |
| `/imprint/` (EN) | `/rechtliches/impressum/` | 301 | engl. Impressum |

> **Hinweis EN-Seiten:** `/imprint/`, `/267-2/`, `/267-2/book-a-scenic-flight/`, `/cessna-p210n/`
> sind englische Seiten (`<html lang>` global „de", Sprache nur am Inhalt erkennbar). Da kein
> EN-Launch geplant ist (`05-gsc-analyse.md` §4), werden sie auf die passende **deutsche** Seite
> weitergeleitet. Falls später `/en/` gebaut wird, können sie dorthin zeigen.

### 2.2 Attachment-URLs (44) → 410 Gone

Alle WordPress-Attachment-/Medienseiten unter folgenden Pfaden werden **pauschal 410 Gone**
(nicht in die neue Sitemap, kein Crawl-Budget) – sie haben nie gerankt (0 Klicks/Impr.):

```
/allgau-wings/<bild>/                    (12×  z. B. _38a2619, matterhornhigh, main, image001-2)
/cessna-p210n-2/<bild>/                  ( 7×  fullsizerender, ifr, ifrblue, ifrcockpit, mein-film …)
/news-und-aktionen/<bild-oder-attachment>/  (12×  front1, jury, hospiz, *logo, attachment/012 …)
/rundfluege/<img_xxxx>/                   ( 7×  img_0628, img_1032, img_20150802_… )
/rundflug-shop/mont-blanc-rundflug/<bild>/   ( 2×  montblancroute, olympus-digital-camera-3 )
/rundfluege/wunschrundfluege/oesterreich_rundflug/austria/   (1×)
/rundfluege/rundflug-buchen/rundflug/     (1×)
/rundfluege/rundflugbox/rundfluggeschenk/ (1×)
/wer-wir-sind/{heiko,olympus-digital-camera-4}/  (2×)
```

Umsetzung als **Catch-all** in `middleware.ts` (Muster `drossnet/middleware.ts`): jede URL, die
auf ein bekanntes Attachment-Muster passt und keine kuratierte Seite ist → 410. Die vollständige
Liste steht in `extract/sitemaps/all-urls.txt` und `extract/sitemaps/attachment-sitemap.xml`.

> **Ergebnis:** Alle 73 Alt-URLs sind abgedeckt — 29 Seiten via Abschnitt 1 + 2.1 (301 auf
> kuratierte Ziele), 44 Attachments via 2.2 (410 Gone). Nichts bleibt offen, nichts geraten.

## 3. Implementierungshinweis

```ts
// next.config.ts (Auszug, Muster)
async redirects() {
  return [
    { source: '/rundflug-shop/zugspitze-rundflug/', destination: '/rundfluege/zugspitze/', permanent: true },
    { source: '/wer-wir-sind/', destination: '/ueber-uns/', permanent: true },
    // … vollständige Liste generiert aus dieser Tabelle + extract/sitemaps/all-urls.txt
  ]
}
```

Bei sehr vielen Attachment-URLs statt Einzelregeln eine **Catch-all-Regel** bzw. Behandlung in
`middleware.ts` (Muster: `drossnet/middleware.ts`), um die `next.config.ts` schlank zu halten.
Verifikation: `09-migration-runbook.md` Phase 4.
