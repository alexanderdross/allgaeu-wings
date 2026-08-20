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

## 2. Nicht rankende Alt-URLs — aus dem Extract ergänzen

`data/gsc/` enthält nur die **rankenden** URLs. Die **vollständige** Alt-URL-Liste steht in
`extract/sitemaps/all-urls.txt` (Fetcher-Session). Beim Implementieren gilt:

- [ ] `all-urls.txt` gegen die Tabelle oben abgleichen; jede zusätzliche Seiten-URL bekommt ein
      Redirect-Ziel (nächste passende neue Seite) oder – wenn ersatzlos – 301 auf den nächsten Hub.
- [ ] **Attachment-URLs** (`page-sitemap` vs. `attachment-sitemap`): pauschal **410 Gone** oder
      301 auf das zugehörige Elternobjekt. Nicht in die neue Sitemap aufnehmen.
- [ ] Etwaige `/rundflug-shop/*`-Unterseiten ohne Entsprechung → `/rundfluege/` (Hub).
- [ ] Etwaige `/rundfluege/wunschrundfluege/*`-Unterseiten → passendes `/rundfluege/[ziel]/` oder
      `/rundfluege/wunschrundflug/`.

> Dieser Abschnitt ist bewusst als **Checkliste** angelegt: die rankenden URLs (Abschnitt 1) sind
> die geschäftskritischen 301s und vollständig belegt; der Long-Tail wird mechanisch aus dem
> Extract vervollständigt, nicht geraten.

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
