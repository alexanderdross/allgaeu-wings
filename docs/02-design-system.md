# 02 · Design-System

**Grundsatz:** Corporate Identity und Farbpalette **bleiben erhalten**, die Umsetzung wird
modernisiert. Token-Struktur exakt nach `drossnet/app/globals.css` (Tailwind v4 `@theme` +
semantische HSL-Variablen), damit Komponenten und Muster direkt übernehmbar sind – nur die
Farbwerte sind Allgäu-Wings-spezifisch.

## 1. Farb-Tokens

Zwei Ebenen: eine **Brand-Ebene** (die CI-Farben der Allgäu Wings) und eine **semantische Ebene**
(die shadcn/ui-Tokens), die auf die Brand-Ebene gemappt wird. So ist die CI an **einer** Stelle
gepflegt.

```css
/* app/globals.css */
@layer base {
  :root {
    /* ── Brand (CI Allgäu Wings) ─────────────────────────────
       TODO: echte Werte aus extract/css/colors.txt eintragen.
       Der häufigste Marken-Blauton wird --aw-primary, die
       Textfarbe --aw-ink, die helle Fläche --aw-surface. */
    --aw-primary:  /* TODO hsl(...)  Marken-Primärfarbe */;
    --aw-ink:      /* TODO hsl(...)  Textfarbe dunkel   */;
    --aw-surface:  /* TODO hsl(...)  helle Akzentfläche */;
    --aw-accent:   /* TODO hsl(...)  optionaler Akzent  */;

    /* ── Semantik (shadcn/ui) → auf Brand gemappt ──────────── */
    --background:            210 20% 98%;   /* TODO ggf. an CI */
    --foreground:            var(--aw-ink);
    --card:                  0 0% 100%;
    --card-foreground:       var(--aw-ink);
    --primary:               var(--aw-primary);
    --primary-foreground:    0 0% 100%;
    --secondary:             210 16% 93%;   /* TODO */
    --secondary-foreground:  var(--aw-ink);
    --muted:                 210 16% 90%;   /* TODO */
    --muted-foreground:      215 12% 40%;
    --accent:                var(--aw-primary);
    --accent-foreground:     0 0% 100%;
    --destructive:           0 72% 45%;
    --border:                210 16% 86%;   /* TODO */
    --input:                 210 16% 86%;
    --ring:                  var(--aw-primary);
    --radius:                0.5rem;
  }
}
```

> **Wichtig:** Kein Farbwert oben ist final – die `TODO`-Werte sind Platzhalter im
> drossnet-Blauschema. Die echten Werte stammen aus **`extract/css/colors.txt`** (Farben der
> Live-Seite, nach Häufigkeit sortiert) und dem Logo (`extract/assets/`). Erst nach Vorliegen des
> Extracts werden sie hier und in `globals.css` gesetzt. **Nichts geraten als final ausgeben.**

## 2. Typografie

Nach drossnet-Vorbild, **selbstgehostet via `next/font/local`** (DSGVO – keine Google-Fonts-CDN):

- **Headings:** eine geometrische/humanistische Sans (z. B. Outfit) – `--font-heading`
- **Body:** eine gut lesbare Sans (z. B. Inter) – `--font-body`
- `font-display: swap`, Gewichte 400–700

> **TODO:** falls die CI eine bestimmte Hausschrift vorgibt (aus `extract/` / Styleguide), diese
> selbstgehostet einbinden statt der Defaults.

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

## 7. Offene Design-Punkte (nach Extract zu füllen)

- [ ] `--aw-primary/-ink/-surface/-accent` mit echten Hex/HSL aus `colors.txt` setzen
- [ ] Semantische Tokens (`background`, `secondary`, `muted`, `border`) an CI feinjustieren
- [ ] Hausschrift prüfen und ggf. selbstgehostet einbinden
- [ ] Logo in SVG/optimiertem Format bereitstellen (aus `extract/assets/`)
