# 02 · Design-System

**Grundsatz:** Corporate Identity und Farbpalette **bleiben erhalten**, die Umsetzung wird
modernisiert. Token-Struktur exakt nach `drossnet/app/globals.css` (Tailwind v4 `@theme` +
semantische HSL-Variablen), damit Komponenten und Muster direkt übernehmbar sind – nur die
Farbwerte sind Allgäu-Wings-spezifisch.

## 1. Farb-Tokens

**Quelle:** Rekonstruiert aus `extract/css/` (Divi-Dynamic-CSS + Inline-Styles), dem Logo
(`extract/assets/Logo.png`) und den Screenshots (`extract/screenshots/`).

**Belegte CI-Farben:**

| Rolle | Hex | Beleg |
|---|---|---|
| **Marineblau (Primär)** | `#173f68` | Header, Footer, CTA-Sektionen; als `background-color:#173f68` und Overlay `rgba(23,63,104,0.65)` in Inline-Styles |
| **Marineblau dunkel (Variante)** | `#1b3668` | Überschriften-Blau in Inline-Styles |
| **Akzentblau (Links/Buttons)** | `#2ea3f2` | Links („Shop.", Social), Button-/Border-Akzent (`color:#2ea3f2`, 19 Treffer; Divi-Akzent, faktisch die interaktive Farbe der Seite) |
| **Signalrot (Sekundär-Akzent)** | ~`#d32422` | Logo-Rand, rote Diagonal-Banner der Produktkarten, rote Aufmerksamkeits-Headline („Unser neues Rundflug Erklärvideo!") — **visuell aus Logo + Screenshots abgeleitet, exakter Hex am Logo-Original zu bestätigen** |
| **Footer-Leiste (fast schwarz)** | ~`#1e1f26` | Rechtstext-Leiste unter dem Footer |
| Text | `#333` | Fließtext |
| Muted | `#666` / `#777` | Sekundärtext |
| Border | `#eee` / `#ddd` | Trennlinien |
| Weiß | `#fff` | Flächen (107 Treffer, dominant) |

> Nicht als Markenfarben verwendet: die vielen 2er-Treffer in `colors.txt` (`#5865f2`, `#25d366`,
> `#1da1f2`, `#3b5998` …) sind **Social-Share-Button-Farben** aus einem Plugin — bewusst ignoriert.

```css
/* app/globals.css — CI Allgäu Wings, HSL-Umrechnung der belegten Hex-Werte */
@layer base {
  :root {
    /* ── Brand (CI Allgäu Wings) ───────────────────────────── */
    --aw-navy:    211 64% 25%;   /* #173f68  Primär: Header/Footer/CTA */
    --aw-navy-deep: 219 61% 20%; /* #011835/#1b3668  dunkle Variante   */
    --aw-blue:    204 88% 56%;   /* #2ea3f2  Akzent: Links/Buttons      */
    --aw-red:       1 72% 48%;   /* ~#d32422 Signalrot: Banner/Logo-Rand (Hex bestätigen) */
    --aw-ink:     220 15% 20%;   /* #333     Textfarbe                  */
    --aw-footer:  228 13% 13%;   /* ~#1e1f26 Footer-Leiste              */

    /* ── Semantik (shadcn/ui) → auf Brand gemappt ──────────── */
    --background:            0 0% 100%;        /* Seite ist überwiegend weiß */
    --foreground:            var(--aw-ink);
    --card:                  0 0% 100%;
    --card-foreground:       var(--aw-ink);
    --primary:               var(--aw-navy);   /* Marineblau trägt die Marke */
    --primary-foreground:    0 0% 100%;
    --secondary:             211 30% 95%;      /* helles Blaugrau als Sektionsfläche */
    --secondary-foreground:  var(--aw-ink);
    --muted:                 210 16% 90%;
    --muted-foreground:      220 8% 40%;       /* #666/#777 */
    --accent:                var(--aw-blue);   /* interaktives Blau */
    --accent-foreground:     0 0% 100%;
    --destructive:           var(--aw-red);
    --border:                210 16% 90%;      /* #eee/#ddd */
    --input:                 210 16% 88%;
    --ring:                  var(--aw-blue);
    --radius:                0.5rem;
  }
}
```

> **Refresh-Hinweis:** Rot war auf der Alt-Seite laut und flächig (Diagonal-Banner). Im Refresh
> **sparsamer** einsetzen — als Akzent (Badges „Beliebt", Sonderaktion), nicht als Dauerfläche.
> Marineblau bleibt die tragende Markenfarbe, Akzentblau die interaktive. Der exakte Rot-Hex ist
> am Logo-Original zu final­isieren (das gerenderte `Logo.png` liegt in `extract/assets/`).

## 2. Typografie

**Ist-Zustand (Extract):** Die Alt-Seite nutzt **Open Sans** (Divi-Standard), selbstgehostet über
das Plugin OMGF (`wp-content/uploads/omgf/et-divi-open-sans/`) – DSGVO-konform ohne Google-CDN. Es
gibt **keine spezielle Hausschrift** in der CI.

**Neubau,** selbstgehostet via `next/font/local` (DSGVO – keine Google-Fonts-CDN):

- **Headings:** eine geometrische/humanistische Sans (z. B. Outfit) – `--font-heading`.
  Passt zum technischen, klaren Charakter der Marke und hebt den Refresh sichtbar von der
  Divi-Standardanmutung ab.
- **Body:** eine gut lesbare Sans (z. B. Inter) – `--font-body`. Alternativ Open Sans beibehalten,
  wenn Kontinuität zur Alt-Seite gewünscht ist.
- `font-display: swap`, Gewichte 400–700.

Da keine Marken-Hausschrift existiert, ist die Schriftwahl ein **echter Design-Freiheitsgrad** –
Open Sans muss nicht übernommen werden.

## 3. Layout-Grundraster

| Element | Wert |
|---|---|
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Sektionsrhythmus | `py-12 sm:py-16`, alternierend `bg-background` / `bg-secondary/30` |
| Breakpoints | xs 375 · sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 |
| Radius | `--radius: 0.5rem` (lg/md/sm abgeleitet) |

## 4. Komponenten (aus drossnet übernehmbar)

| Komponente | Quelle in drossnet | Verwendung |
|---|---|---|
| Standort-/Ziel-Karte | `src/views/air/AirStandorte.tsx` | Grid mit Bild, ICAO-Badge, Meta-Zeilen, Vollbreiten-Button |
| Sticky-Header + Dropdown | `src/components/air/AirLayout.tsx` | Navigation, Mobile-Drawer, Fokus-Rückgabe |
| Gutschein-Sektion | `src/components/air/GiftVoucherSection.tsx` | Gutschein-Varianten mit „Beliebt"-Badge |
| Buchungs-/Anfrageformular | `src/components/air/BookingForm.tsx` | react-hook-form + Zod + Turnstile |
| Galerie | `src/components/air/FlightGallery.tsx` | Foto-/Videoflug-Impressionen |

**Refresh-Richtung** (CI bleibt, Umsetzung modernisiert):
- Vollflächiger Hero mit Bildscrim, große `font-heading`-Headline, zwei CTAs (Buchen / Beraten)
- Karten mit `hover:scale-105` auf dem Bild, dezente Schatten, klare Badges
- **Mobile-First:** sticky Bottom-CTA auf Ziel-/Produktseiten (71 % Mobil-Traffic)
- Bewegung dezent, `prefers-reduced-motion` respektiert
- WCAG 2.1 AA: Fokus-Ringe (`ring-2 ring-primary`), semantisches HTML, Tastaturnavigation

## 5. Bilder & CLS

Auf Cloudflare Workers greift **kein automatischer Bildoptimierer** (`01-architektur.md`):
- jedes `next/image` mit fixen `width`/`height` (CLS)
- AVIF/WebP über Cloudflare Image Transformations (`image-loader.ts` aus drossnet)
- Hero als `priority`, korrekte `sizes`
- feste Bilddimensionen als Konvention (Hero 1920×600/1080, Card 400×300, Attraktion 800×544)

## 6. Assets aus dem Extract

| Asset | Quelle | Verwendung |
|---|---|---|
| Logo | `extract/assets/` | Header, Footer, OG, PDF-Gutschein |
| Favicon / Apple-Touch | `extract/assets/` | `app/icon`, Metadata |
| Bild-URLs | `extract/assets/asset-urls.txt` | Referenz für neu zu beschaffende/optimierende Motive |
| Screenshots | `extract/screenshots/` | Referenz für Alt-Layout (Design-Vergleich) |
| Farben | `extract/css/colors.txt` | CI-Rekonstruktion (§1) |

## 7. Logo & Marke (aus `extract/assets/Logo.png`)

Das Logo ist ein **geflügeltes Wappen/Emblem**: marineblaues Schild mit **rotem Rand**,
weißer Schriftzug „ALLGÄU WINGS", stilisierte Bergsilhouette und konzentrische Radar-/Zielkreise,
seitliche Schwingen, darunter **fünf hellblaue Sterne**. Es transportiert die CI kompakt:
Marineblau + Rot + Weiß, mit Aviation-/Präzisions-Anmutung.

- Für den Neubau: Logo als **SVG** nachbauen/vektorisieren (das Original liegt nur als PNG vor),
  für scharfe Darstellung und Dark-Header. Favicons vorhanden (`favicon-32/96`, `apple-180`,
  `android-192`).
- Der rote Rand des Logos = der Bezugspunkt für den exakten Rot-Ton (`--aw-red`).

## 8. Erkenntnisse aus den Screenshots (Refresh-Leitplanken)

Aus `extract/screenshots/` (Desktop + Mobil):

- **Header:** marineblau, weiße Textnavigation, zentriertes Logo. → im Refresh sticky + Dropdown.
- **Hero:** vollflächiges Flugzeug-über-Alpen-Foto mit mittigem „Zum Shop"-Button. → beibehalten,
  aber mit stärkerem Textscrim und klarer Headline + zwei CTAs.
- **Produktkarten:** Bild mit **roter Diagonal-Ribbon** („Dauer: 140 min") und „Zur Box"-Button.
  → Ribbon dezenter, Meta-Zeilen strukturierter (Flugzeit, Preis, Abflugort), Karte als Link.
- **CTA-Sektionen** („Flugangstseminar", „Anfrage"): marineblaue Vollflächen mit weiß-outline
  Buttons. → beibehalten, Rhythmus `bg-secondary/30` ↔ `bg-primary`.
- **Footer:** marineblau + fast-schwarze Rechtstext-Leiste. → übernehmen.
- **Schwächen der Alt-Seite** (Refresh-Ziele): sehr viel Leerraum/unruhiger vertikaler Rhythmus,
  Divi-Standardanmutung, roter Fließtext als Headline, kleiner nativer Video-Player ohne Poster,
  Shop nur als externer „Zur Box"-Sprung. → strafferer Grid, native Produktseiten, konsistente
  Typo-Hierarchie.

## 9. Erledigte Design-Punkte

- [x] Brand-Tokens mit belegten Hex/HSL gesetzt (`#173f68`, `#2ea3f2`, Rot, Neutrale)
- [x] Semantische Tokens an CI gemappt
- [x] Schrift-Ist-Zustand geklärt (Open Sans, keine Hausschrift → Refresh-Freiheit)
- [x] Logo analysiert; Favicons vorhanden
- [ ] **Offen:** exakter Rot-Hex am Logo-Original bestätigen; Logo als SVG vektorisieren
