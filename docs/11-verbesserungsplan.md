# 11 · Verbesserungsplan (SEO, Funktion, UX)

Priorisierter Plan für die nächsten Änderungen an der neuen Website, datengetrieben
aus der GSC-Auswertung (`data/gsc/`) und dem Ist-Stand des Codes. Erstellt nach
Abschluss von Phase 1 bis 2 (Inhalte, Basis-SEO, Formulare) und Teilen von Phase 3
(Checkout-Grundgerüst).

## Ausgangslage (GSC 19.05. bis 18.08.2026)

828 Klicks / 15.867 Impressionen / Ø Position 12,4 · 71 % mobil · 93 % Deutschland ·
**84 % non-branded**. Zwei Kernprobleme steuern die Priorität:

1. **Kannibalisierung:** Die Startseite zieht allein **8.102 Impressionen auf Ø Pos. 15**
   und rankt breit für Ziel-Suchbegriffe, für die es keine fokussierte Landingpage gibt.
2. **Indexierung nur ~30 %** (43 „gefunden, nicht indexiert" + 25 „gecrawlt, nicht
   indexiert"), dünne/duplizierte Inhalte und schwache interne Verlinkung.

Gliederung in Stufen: **A** sofort umsetzbar (kein Business-Input nötig), **B** baubar,
Go-live braucht Config/Keys, **C** fachlich/rechtlich blockiert (nur klären).

---

## Stufe A, Sofort umsetzbar, hoher Hebel ✅ abgeschlossen

**Stand 21.08.2026: Stufe A ist komplett umgesetzt und in `main` gemergt** (PRs #16, #18, #19,
#20, #21). Zusätzlich im Zuge von A7 zwei Formular-Korrekturen: Taxiflug als Option im
Anfrageformular, Personenauswahl auf maximal 5 begrenzt. Wirkung (Indexierung, Positionen der
neuen Seiten) über die nächsten 2 bis 4 Wochen in der GSC beobachten.

### A1. ✅ `/rundfluege/alpen/` Landingpage (größter GSC-Hebel)
Cluster „alpen*" (`alpenrundflug` 471, `rundflug alpen` 306, `alpen rundflug` 179,
`alpenrundflüge` 153 …) = **~3.170 Impressionen ohne eigene Seite**, absorbiert von `/`.
Eigene Kategorie-/Übersichtsseite für den Kopf-Begriff „Alpenrundflug", die auf die
konkreten Ziel-Detailseiten verlinkt (interne Verlinkung gegen Kannibalisierung).
- Neu: `app/rundfluege/alpen/page.tsx` (`ItemList` + `BreadcrumbList`, Einleitung,
  Karten der alpinen Flüge). Verlinkung in `src/lib/nav.ts` und im `/rundfluege/` Hub.

### A2. ✅ Ratgeber „Hubschrauber oder Flugzeug-Rundflug?"
Helikopter-Intent (`hubschrauber/helikopter rundflug alpen …`) = **~2.820 Impressionen**,
viele 0 Klicks, Intent-Mismatch (Betrieb fliegt Tragflächen-Cessna). Ehrliche
Vergleichs-/Ratgeberseite, die diese Suchenden abholt und auf die Rundflüge leitet.
- Neu: `app/ratgeber/hubschrauber-oder-flugzeug-rundflug/page.tsx` (docs/04 §1), mit
  `FAQPage`/`Article`-Schema und internen Links.

### A3. ✅ Schema.org vervollständigen (Rich Results)
Helfer in `src/lib/schema.ts` erweitern (aktuell nur `breadcrumbJsonLd`, `faqJsonLd`):
- **`TouristAttraction`** auf Rundflug-Detailseiten + Product-`image` aus `flug.bild`.
- **Product/Vehicle** auf der Cessna-Seite (aktuell kein JSON-LD).
- **Product (Gift) + Offer** auf `/gutscheine/` (aktuell kein JSON-LD).
- **`Service`** zusätzlich zur `FAQPage` auf der Flugangstseminar-Seite.
- **`BreadcrumbList`** auf dem `/rundfluege/` Hub; **`geo` + `openingHours`** im
  `LocalBusiness` der Standortseiten.

### A4. ✅ Cessna-Flugzeugseite mit echtem Foto + Specs
Platzhalter-Gradient ersetzen (echtes Motiv aus `extract/assets`, next/image, statischer
Import). Specs ergänzen, u. a. Reisegeschwindigkeit **~330 bis 355 km/h (179 bis 191 kn)**.
`src/data/flights.ts` `Flugzeug.specs` erweitern.

### A5. ✅ Galerie befüllen (statt Stub)
`app/galerie/page.tsx` mit Fotos aus `extract/assets` und dem Erklärvideo als
`VideoObject`-Schema füllen.

### A6. ✅ Allgemeine FAQ-Seite
Neu: `app/faq/page.tsx` mit `FAQPage`-Schema (Wetter/Stornierung, was mitbringen,
Gewicht/Personen, Ablauf, Gutschein-Einlösung).

### A7. ✅ Accessibility & UX
- Nav-Dropdowns tastatur-/fokusbedienbar (aktuell nur `group-hover`, kein `aria-expanded`).
- Skip-to-content-Link + `id="main"` auf `<main>`.
- Sticky Mobile-CTA auf Produktseiten (71 % Mobil-Traffic).
- Anfrageformular angleichen: Turnstile + Datenschutz-Checkbox ergänzen und
  serverseitig verifizieren (analog `/api/kontakt`).
- Fokus-Rückgabe auf die Erfolgsmeldung nach Submit.

### A8. ✅ Index-Hygiene / interne Verlinkung
Kontextuelle interne Links (Hub → Detail, Ratgeber/FAQ → Rundflüge, Standort → Flüge),
sichtbare Breadcrumbs auf tiefen Seiten. `docs/10-roadmap.md` als veraltet aktualisieren
(Phase 1 bis 2 sind gebaut).

### A9. ✅ Regionale Longtail-Seiten (nachrangig)
0-Klick-Impressionen mit Nachfrage ohne Seite: `rundflug schloss neuschwanstein` (70),
`alpenrundflug münchen/bayern` (83/79), `rundflug chiemsee` (46), `rundflug tegernsee`
(19). Als leichte Content-Abschnitte ergänzen, wenn A1 bis A8 stehen.

**Reihenfolge nach Hebel:** A1 → A3 → A2 → A4/A5 → A6/A7 → A8 → A9. Je Block ein PR nach
`main`, Build/Typecheck/Lint grün, lokal (Desktop + Mobil) geprüft.

---

## Stufe B, Baubar, Go-live braucht Config/Keys

**Stand 21.08.2026:** B1 ist umgesetzt (PR #23, CI grün, Merge ausstehend). B2 ist reine
Konfiguration (kein Code). B3/B4/B5 offen.

- **B1. Echter Mailversand der Formulare. ✅ (PR #23)** `/api/kontakt` und `/api/anfrage`
  versenden jetzt per `worker-mailer` eine E-Mail an `SHOP_EMAIL_TO` (Reply-To auf den
  Absender), statt nur zu loggen. Ohne gesetzte `SMTP_*` bleibt `delivered:false` und die
  Eingabe wird weiterhin protokolliert, es geht also nichts verloren. Helfer:
  `src/lib/mailer.ts` (dynamischer Import, hält `cloudflare:sockets` aus dem Node-Build).
  Toolchain-Detail: `worker-mailer` importiert `cloudflare:sockets`; das aktuelle
  `@opennextjs/cloudflare` (1.20, wrangler 3) externalisiert `cloudflare:*` im Server-Bundle
  nicht, daher ein minimaler committeter `pnpm patch`
  (`patches/@opennextjs__cloudflare@1.20.2.patch`), der `cloudflare:*` als esbuild-external
  markiert. Entfällt bei einem Toolchain-Upgrade (wrangler 4 / neueres OpenNext).
  **Offen (Config):** `SMTP_HOST/PORT/USER/PASS` und `SHOP_EMAIL_TO` im Cloudflare-Dashboard
  setzen (Vorlage `.dev.vars.example`), dann per `pnpm preview` real testen.
- **B2. Turnstile echte Schlüssel.** Reine Konfiguration, kein Code. Code steht;
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Build-Var) + `TURNSTILE_SECRET_KEY` (Runtime) im
  Cloudflare-Dashboard setzen (aktuell Testschlüssel, kein echter Schutz).
- **B3. Stripe scharfschalten + Webhook + Gutschein-Lifecycle.** Checkout ist 503-gated.
  Fehlt (docs/07): `app/api/webhooks/stripe/route.ts`, KV-Idempotenz, D1-Schema
  (`vouchers`, `redemptions`, `booking_requests`, `webhook_events`), Gutschein-Code
  (`AW-XXXX-XXXX`) + PDF + Mail, `/gutschein-einloesen/`-Seite. Braucht Stripe-Keys,
  D1/KV-Bindings (in `wrangler.jsonc` auskommentiert) und die Klärungen aus C.
- **B4. CWV-Budget in CI.** `.lighthouserc.json` (nach drossnet), Budgets LCP<2,5 s /
  CLS<0,1 / INP<200 ms.

### B5. Mehrsprachigkeit / Übersetzung (Deutsch + Englisch)
Deutsch bleibt Root **ohne** Präfix, Englisch kommt unter **`/en/`** (docs/04 §Deutsch als
Root, CLAUDE.md „hreflang/en/ vorbereitet, ungebaut"). Die Alt-Seite hatte bereits EN-Seiten
(`/imprint`, `/267-2/book-a-scenic-flight`), Redirects zeigen aktuell nur auf DE.

- **Routing:** App-Router-i18n mit Default-Locale `de` (kein Präfix) und `en` unter `/en/…`.
  Umsetzung z. B. über ein `locale`-Segment oder Locale-aware Rewrites in `middleware.ts`
  (Edge, kein Node), `trailingSlash: true` beibehalten. Alle Templates locale-fähig machen.
- **Inhalte:** Datenmodell zweisprachig (`{ de, en }` je Feld) nach dem Bilingual-Muster aus
  `drossnet/src/data/flightData.ts` (CLAUDE.md „Content & Daten"); zentrales UI-String-Wörterbuch
  für Navigation, Buttons, Formulare. Rundflug-Texte, Hero, Hub, Flugerlebnisse, Kontakt zuerst.
- **SEO:** `hreflang`-Alternates je Seite (`de`, `en`, `x-default`), self-referenzierende
  Canonicals **pro Locale**, beide Sprachen in Sitemap; `og:locale` + `og:locale:alternate`.
- **Umfang/Reihenfolge:** Kernseiten zuerst (Start, Rundflüge-Hub + Detailseiten, Alpen-Landing,
  Flugzeug, Flugerlebnisse, Kontakt). Rechtstexte (Impressum/Datenschutz/AGB/Widerruf) auf EN
  brauchen separate fachliche Freigabe (siehe Stufe C) und kommen später; bis dahin EN-Seiten
  mit Verweis auf die DE-Rechtstexte.
- **Sprachumschalter** im Header/Footer (mit `hreflang`-korrekten Links, Locale bleibt beim
  Seitenwechsel erhalten).
- **Aufwand:** größerer, eigener Block (Roadmap-Phase 6). Sinnvoll erst nach den A-Kernseiten,
  damit nicht zweimal übersetzt wird. Go-live der EN-Version braucht die fertigen Übersetzungen.

---

## Stufe C, Fachlich/rechtlich blockiert (nur klären)

1. **USt-Satz** (Steuerberater) → blockiert Stripe-Tax.
2. **Widerrufsrecht** für undatierte Gutscheine (Anwalt) → blockiert finale AGB;
   Rechtstexte aktuell als „Entwurf" markiert.
3. **Preis-Diskrepanz** Mont Blanc / Dolomiten-Gardasee: 489 € (Regiondo, ganze Buchung)
   vs. 444 € p. P. (alte WP).
4. ~~**Personenzahl je Flug** / `maxPassagiere`~~ **geklärt (21.08.2026):** bis zu 5 Passagiere
   plus Pilot (6 Sitze). In `flights.ts`, Cessna-Specs, FAQ und Taxiflug übernommen; das
   Anfrageformular begrenzt die Personenauswahl auf 5.
5. **Buchungstelefon** +49 8387 3924328 vs. HQ 08387 391-0 abgleichen.
6. **Kontakt-E-Mail** `info@allgaeu-wings.de` bestätigen (`business.ts` TODO).
7. **Luftrecht/Versicherung/Wetterstorno**-Bedingungen (Betrieb) → FAQ/AGB-Inhalt.
8. **Regiondo-Vertrag/Kündigungsfrist** + Alt-Code-Import in D1 vor Cutover.

---

## Verifikation
- Pro PR: `pnpm build` + `pnpm typecheck` + `pnpm lint` grün; lokal via `pnpm start`
  gerendert und Desktop + 390px Mobil per Screenshot geprüft; keine Gedankenstriche
  (Regel in `CLAUDE.md`).
- Schema gegen Google Rich-Results-Test / Schema-Validator prüfen; nach Deploy per
  GSC-URL-Prüfung.
- SEO-Wirkung: nach Merge Sitemap in der GSC einreichen und Indexierung/Position der
  neuen Seiten (`/rundfluege/alpen/`, Ratgeber, FAQ) über 2 bis 4 Wochen beobachten.
- CWV: nach B4 Lighthouse-Budget in CI; Mobile-LCP < 2,5 s auf der Startseite.
