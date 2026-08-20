# 09 · Migrations-Runbook

Cutover von WordPress zu Next.js auf Cloudflare Workers. Struktur nach Vorbild
`drossnet/src/docs/memory/architecture/cutover-checklist.md`. **Das alte WordPress läuft bis zur
Freigabe parallel** – Rollback = DNS zurück.

## Phase 0 · Rohextraktion ✅ (erledigt durch Fetcher-Session)

Eine separate Session mit vollem Netzzugriff hat die Live-Seite extrahiert und nach `extract/`
committet (79 Dateien, ~13 MB). Kernzahlen aus `extract/EXTRACT-REPORT.md`:

- **73 Alt-URLs** gesamt (29 Seiten + 44 Attachments; kein Blog).
- **WordPress 6.8.8 / Divi 4.19.3**, Yoast, Contact Form 7, Complianz, WP Google Maps, OMGF (Open Sans).
- **Regiondo-Widget**, Vendor-ID **11122**, 7 Produkte (249–489 €).
- **Ungültiges TLS-Zertifikat** der Alt-Seite bestätigt (nur mit `-k`/`--ignore-certificate-errors`
  erreichbar; Gegenprobe `example.com` = gültig → Eigenschaft der Zielsite).
- Alle 10 Screenshots, CI-Farben (`#173f68` Navy, `#2ea3f2` Akzent, Rot), Logo + Favicons gesichert.

Inhalt siehe `extract/`:

| Ordner | Inhalt |
|---|---|
| `extract/sitemaps/` | `sitemap_index.xml`, `page-sitemap.xml`, `attachment-sitemap.xml`, `all-urls.txt` |
| `extract/html/` | Roh-HTML aller Seiten |
| `extract/css/` | Stylesheets + `colors.txt` (CI-Farben) |
| `extract/assets/` | Logo, Favicon, Bild-URLs |
| `extract/screenshots/` | Desktop/Mobil-Screenshots |
| `extract/shop/` | Regiondo-iframe-URLs, Produkt-/Preistabelle |
| `extract/EXTRACT-REPORT.md` | Protokoll, CMS/Theme, Top-Farben |

Diese Artefakte speisen `02-design-system.md` (Farben), `06-redirect-map.md` (Alt-URLs) und
`07-shop-stripe.md` (Preise).

## Phase 1 · Cloudflare-Ressourcen anlegen

```bash
wrangler r2 bucket create allgaeu-wings-inc-cache      # NEXT_INC_CACHE_R2_BUCKET
wrangler kv namespace create WEBHOOK_IDEMPOTENCY_KV     # Webhook-Idempotenz
wrangler d1 create allgaeu-wings                        # DB-Binding
# optional: R2-Bucket für Medien (MEDIA)
```
IDs in `wrangler.jsonc` eintragen. D1-Schema (`vouchers`, `redemptions`, `booking_requests`,
`webhook_events`) via Drizzle-Migration anwenden.

## Phase 1b · Cloudflare-Ressourcen — aktuell KEINE nötig

Da die Seite statisch ist und `wrangler.jsonc` auf **`ASSETS`** abgeschlankt ist, braucht das
erste Deploy **keinen** R2-/KV-/D1-Namespace. Statische Bilder laufen über `ASSETS`. R2/KV/D1
werden erst mit ihren Phasen aus den kommentierten Blöcken in `wrangler.jsonc` reaktiviert
(`01-architektur.md`).

## Phase 2 · Workers Builds verbinden

1. Cloudflare-Dashboard → **Workers & Pages → Create → Workers → Connect to Git** → Repo
   `alexanderdross/allgaeu-wings`, Branch `main`.
2. Einstellungen:
   - **Build command:** `pnpm build:cf`
   - **Deploy command:** `npx wrangler deploy` (oder leer lassen — Workers Builds deployt den
     durch `build:cf` erzeugten Worker automatisch)
   - **Root directory:** `/`
3. **Wichtig — Build-Scripts:** `package.json` enthält
   `pnpm.onlyBuiltDependencies: ["workerd", "esbuild", "unrs-resolver"]`, damit der Runner
   `workerd` baut (sonst schlägt `opennextjs-cloudflare build` fehl). Dieser Deploy-Pfad wird im
   GitHub-CI-Job **„OpenNext Cloudflare Build"** vor jedem Merge geprüft.
4. **Vars & Secrets im Dashboard** setzen (nicht in `wrangler.jsonc`): `SITE_URL`, später
   `STRIPE_*`, `SMTP_*`, `TURNSTILE_*`. `keep_vars: true` schützt sie vor Überschreiben.
5. Erster Deploy landet auf `https://allgaeu-wings.<subdomain>.workers.dev` – **kein**
   Custom-Domain-Traffic. Lokal ist der Build mit `pnpm build:cf` bereits verifiziert
   (`.open-next/worker.js` wird erzeugt).

## Phase 3 · Smoke-Test ohne Traffic

Auf der `*.workers.dev`-URL prüfen:

- [ ] Alle Templates rendern (Start, Ziel/Produkt, Standort, Flugzeug, Erlebnis, Gutschein, Recht)
- [ ] `next/image` lädt (Fallback-Modus, Transformations ggf. noch aus)
- [ ] Kontakt-/Anfrage-Formular → Turnstile → Mail kommt an
- [ ] Stripe im **Testmodus**: Checkout → `success_url` → Webhook → Bestätigungsmail + Gutschein-PDF
- [ ] Webhook-Idempotenz: Event-Replay erzeugt keine Doppel-Mail
- [ ] Sitemap `/sitemap.xml` + `/robots.txt` korrekt
- [ ] Lighthouse (Mobil) grün gegen die CWV-Budgets (`04-seo-strategie.md`)

## Phase 4 · Redirect-Verifikation

- [ ] Jede der 32 rankenden Alt-URLs (`06-redirect-map.md`) liefert den korrekten 301.
- [ ] Vollständige Alt-URL-Liste aus `extract/sitemaps/all-urls.txt` durchgetestet
      (Skript: alte URL → erwarteter Status/Ziel).
- [ ] Attachment-URLs liefern 410 bzw. 301 auf Elternobjekt.
- [ ] Keine Redirect-Ketten, keine 404 auf zuvor rankenden URLs.

## Phase 5 · Gutschein-Migration (Regiondo)

- [ ] Bestehende Regiondo-Gutschein-Codes exportieren.
- [ ] In D1 `vouchers` importieren (Status `issued`, Herkunft `regiondo`, Original-Ablaufdatum).
- [ ] Einlösepfad `/gutschein-einloesen/` akzeptiert Alt-Codes.
- [ ] Testeinlösung eines migrierten Codes.

## Phase 6 · Domain-Cutover

- [ ] DNS-TTL vorab senken (z. B. 300 s), 24 h vorher.
- [ ] Stripe-Webhook auf **Live-Endpoint** umstellen, Live-Keys setzen.
- [ ] `automatic_tax` nur aktivieren, wenn USt geklärt (`08-recht-compliance.md`).
- [ ] Custom Domain `allgaeu-wings.de` + `www` an den Worker hängen (per Hostname umschaltbar).
- [ ] `www` → Apex (oder umgekehrt) konsistent zur Canonical-Wahl; TLS managed (behebt das
      abgelaufene Zertifikat).
- [ ] `/robots.txt` gibt die produktive Sitemap frei.

## Phase 7 · Nachlauf

- [ ] Sitemap in der **GSC** einreichen (neue Property ggf. verifizieren).
- [ ] URL-Prüfung der P0-Seiten in der GSC, Indexierung anstoßen.
- [ ] 14 Tage Indexierung + CWV beobachten; „nicht indexiert"-Zahl muss fallen.
- [ ] Cloudflare Web Analytics + Stripe-Dashboard auf Conversions prüfen.
- [ ] Erst nach stabilem Betrieb: **Regiondo kündigen**, WordPress abschalten.

## Rollback

Jederzeit bis zur endgültigen Abschaltung:

1. Custom Domain vom Worker lösen bzw. DNS zurück auf den WordPress-Host.
2. Niedrige TTL sorgt für schnelle Rückkehr.
3. Stripe-Webhook zurückstellen.

WordPress bleibt bis zur Freigabe unverändert erreichbar – kein Datenverlust, kein Zeitdruck.
