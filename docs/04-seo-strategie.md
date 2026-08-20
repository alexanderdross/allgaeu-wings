# 04 · SEO-Strategie

Datenbasis: `05-gsc-analyse.md`. Ziel: Index-Quote 29 % → > 90 %, Ø-Position der Ziel-Queries
von 10–27 auf < 8, „alpen\*"-Cluster von 50 auf > 200 Klicks.

## 1. Keyword → URL Mapping

| Keyword-Cluster | Impr. | Ziel-URL | Primäres Keyword |
|---|---|---|---|
| alpenrundflug, rundflug alpen, hubschrauberflug alpen | 3.170 | `/rundfluege/alpen/` | „alpenrundflug allgäu" |
| rundflug zugspitze, hubschrauber rundflug zugspitze | 354 | `/rundfluege/zugspitze/` | „rundflug zugspitze" |
| rundflug bodensee (+ 2 personen, friedrichshafen) | 487 | `/rundfluege/bodensee/` | „rundflug bodensee" |
| rundflug gardasee, dolomiten | 437 | `/rundfluege/dolomiten-gardasee/` | „rundflug gardasee" |
| österreich rundflug, alpen österreich | 251 | `/rundfluege/oesterreich/` | „rundflug österreich" |
| matterhorn rundflug | 30 | `/rundfluege/matterhorn/` | „matterhorn rundflug" |
| mont blanc | 3 | `/rundfluege/mont-blanc/` | „mont blanc rundflug" |
| rundflug schweiz, schweizer alpen | 30 | `/rundfluege/schweiz/` | „rundflug schweiz" |
| cessna p210n, p210, cessna 210 | 153 | `/flugzeug/cessna-p210n/` | „cessna p210n" |
| flugangstseminar(e) | 455 | `/flugerlebnisse/flugangstseminar/` | „flugangstseminar" |
| a320 flugsimulator, flugsimulator münchen haar | ~60 | `/flugerlebnisse/a320-flugsimulator/` | „a320 flugsimulator" |
| rundflug/hubschrauber „in der nähe" | 337 | `/standorte/` + je Standort | Local Intent |
| hubschrauber-/helikopter-rundflug (Mismatch) | 2.820 | `/ratgeber/hubschrauber-oder-flugzeug-rundflug/` | Aufklärung + Redirect zu Fläche |
| allgäu wings (Brand) | 425 | `/` | Brand |

## 2. Head-Term-Strategie

Generische Head-Terms (`rundflug` 645 Impr./Pos. 32, `alpenrundflug` 471/Pos. 22) sind **nicht**
direkt bespielbar – zu breit, zu umkämpft. Sie werden **über die Summe der Ziel-Landingpages +
den Hub `/rundfluege/`** erreicht (interne Verlinkung, Breadcrumbs, `ItemList`). Der Hub trägt das
Head-Term, die Ziele tragen die konkreten Intents.

## 3. Schema.org (JSON-LD)

Muster aus `drossnet/src/lib/seo-schemas.ts` und den Air-Views. Pro Template:

| Template | Schema-Typen |
|---|---|
| Startseite | `Organization`, `WebSite` (+ `SearchAction`) |
| Ziel = Produkt | `Product` (mit `Offer`, Preis, `priceCurrency: EUR`), `TouristAttraction`, `BreadcrumbList` |
| Rundflug-Hub | `ItemList` (alle Ziele), `BreadcrumbList` |
| Standort | `LocalBusiness` (Adresse, `geo`, Öffnungszeiten, Telefon), `BreadcrumbList` |
| Flugzeug | `Product`/`Vehicle`-nahe Beschreibung, `BreadcrumbList` |
| Flugangstseminar | `FAQPage`, `Service`, `Offer` |
| Galerie | `VideoObject` (die 72 Video-Impressionen zeigen: Video-Rich-Results sind erreichbar) |
| Gutschein | `Product` (`Gift`-Charakter), `Offer` |

Die `Organization`/`LocalBusiness`-Daten (Name, Adresse Weiler-Simmerberg, USt-IdNr., Standorte
Memmingen/Friedrichshafen) sind belegt (`05-gsc-analyse.md`, Impressum).

> Für die Umsetzung steht die Skill `structured-data` bereit (JSON-LD-Generierung je Typ).

## 4. Core Web Vitals

Auf Cloudflare Workers gibt es **keinen automatischen Vercel-Bildoptimierer** – CWV muss aktiv
gebaut werden (`01-architektur.md` §Constraints):

- **LCP < 2,5 s (Mobil):** Hero-Bild als `priority`, `next/image` mit fixen `width`/`height`,
  AVIF/WebP über Cloudflare Image Transformations, `sizes` korrekt gesetzt.
- **CLS < 0,1:** feste Bilddimensionen überall, selbstgehostete Fonts mit `font-display: swap`,
  reservierte Höhen für dynamische Blöcke (Preis-Konfigurator).
- **INP < 200 ms:** minimales Client-JS, `"use client"` nur wo nötig, Radix-Komponenten
  code-split.
- **Caching:** SSG/ISR über R2 + Regional-Cache; statische Assets über `public/_headers`.

Messung: Cloudflare Web Analytics + GSC Core Web Vitals Report. Lighthouse-Budget im CI
(nach Vorbild `drossnet/.lighthouserc.json`).

## 5. Indexierungs-Hygiene

Der 71-URL-„nicht indexiert"-Berg ist das dringlichste Problem. Gegenmaßnahmen:

1. **URL-Konsolidierung** – 102 → ~35–45 starke URLs (`03-informationsarchitektur.md`).
2. **Saubere `robots.txt` + XML-Sitemap** (`next-sitemap`), nur kuratierte URLs.
3. **Keine Attachment-/Tag-/Kalender-URLs** – gar nicht erst erzeugen.
4. **Interne Verlinkung** – jede Ziel-Seite ist aus Hub, Standort und verwandten Zielen erreichbar
   (Muster: `drossnet/src/lib/aviation-internal-links.tsx`).
5. **301-Redirects** der 32 rankenden Alt-URLs (`06-redirect-map.md`) – erhält aufgebaute Autorität.
6. **Canonicals** absolut und selbstreferenzierend; `trailingSlash: true` konsistent.
7. **GSC-Sitemap-Einreichung** direkt nach Cutover, dann 14 Tage Indexierung beobachten.

## 6. Content-Prioritäten (nach ROI)

| Priorität | Seite | Begründung |
|---|---|---|
| **P0** | `/rundfluege/alpen/` | 3.170 Impr. ungenutzt, größter Hebel |
| **P0** | `/rundfluege/zugspitze/` | 70 Klicks, Pos. 6 – ausbauen + Produkt |
| **P0** | `/rundfluege/` Hub | trägt Head-Terms, verteilt Autorität |
| **P1** | `/rundfluege/bodensee/` + `/standorte/friedrichshafen/` | 487 Impr., Local Intent |
| **P1** | `/rundfluege/dolomiten-gardasee/` | 437 Impr., nah an Seite 1 |
| **P1** | `/flugerlebnisse/flugangstseminar/` | 455 Impr., FAQ-Rich-Results |
| **P1** | `/flugzeug/cessna-p210n/` | 153 Impr., Kaufunterstützung |
| **P2** | `/rundfluege/oesterreich/`, `/matterhorn/`, `/mont-blanc/`, `/schweiz/` | vorhandene schwache Rankings heben |
| **P2** | `/ratgeber/hubschrauber-oder-flugzeug-rundflug/` | 2.820 Impr., Test mit 6-Monats-Kriterium |
| **P3** | Ziele Neuschwanstein, Chiemsee, Tegernsee, Großglockner | je < 70 Impr., später |
