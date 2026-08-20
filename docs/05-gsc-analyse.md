# GSC-Analyse: allgaeu-wings.de

**Property:** `allgaeu-wings.de` · **Suchtyp:** Web
**Zeitraum:** 19.05.–18.08.2026 (letzte 3 Monate; Filter siehe `data/gsc/performance/Filter.csv`)
**Quelle:** Google-Search-Console-Exporte, eingecheckt unter `data/gsc/`
**Coverage-Export:** Sitemap „Alle bekannten Seiten"

> Alle Zahlen dieses Dokuments sind aus den CSVs unter `data/gsc/` reproduzierbar.
> Kleine Abweichungen zwischen den Exporten sind GSC-typisch (Anonymisierung seltener Queries):
> die Zeitreihe (`performance/Diagramm.csv`) und die Geräte-Aufschlüsselung
> (`performance/Geräte.csv`) stimmen exakt überein (**828 Klicks / 15.867 Impressionen**),
> während die Seiten-Aufschlüsselung (`performance/Seiten.csv`) granularer attribuiert
> (844 Klicks / 20.277 Impressionen). Headline-Zahl = **828 / 15.867**.

---

## 1. Executive Summary

| Kennzahl | Wert |
|---|---|
| Klicks | **828** |
| Impressionen | **15.867** |
| Ø CTR | **5,22 %** |
| Ø Position | **12,4** |
| Indexierte URLs (Coverage) | **30 von ~102** (≈ 29 %) |
| Darstellung „Videos" | 72 Impr., 0 Klicks, Pos. 7,85 |

**Drei strukturelle Befunde bestimmen den Neubau:**

1. **Fehlende Intent-Landingpages.** Die Startseite akkumuliert 8.102 Impressionen auf
   Ø-Position 14,9 – sie rankt für Dutzende Ziel- und Regionsbegriffe, für die keine eigene
   Seite existiert. Das ist Kannibalisierung, kein Ranking.
2. **Indexierungs-Notstand.** Nur 30 von ~102 URLs sind indexiert. 43 URLs „Gefunden – zurzeit
   nicht indexiert", 25 „Gecrawlt – zurzeit nicht indexiert". WordPress-Ballast
   (Attachment-Seiten) verbrennt Crawl-Budget.
3. **Umsatz außerhalb der Domain.** Die drittstärkste Seite ist eine Shop-Seite
   (`/rundflug-shop/zugspitze-rundflug/`, 70 Klicks) – der Kauf passiert aber im
   Regiondo-iframe, ohne SEO-Wert und ohne eigene Kundendaten.

---

## 2. Zeitlicher Trend (`performance/Diagramm.csv`)

| Monat | Klicks | Impressionen | CTR | Tage im Export |
|---|---|---|---|---|
| Mai 2026 (ab 19.) | 112 | 2.415 | 4,64 % | 13 |
| Juni 2026 | 263 | 5.195 | 5,06 % | 30 |
| Juli 2026 | 291 | 5.268 | 5,52 % | 31 |
| Aug. 2026 (bis 18.) | 162 | 2.989 | 5,42 % | 18 |

Leicht steigender Trend bei Klicks **und** CTR – die Marke gewinnt, aber von niedriger Basis.
Saisonlogik (Rundflüge = Sommergeschäft) ist im kurzen Fenster nicht ablesbar; für die Roadmap
ist die Sommer-Nachfragespitze dennoch einzuplanen.

---

## 3. Geräte (`performance/Geräte.csv`)

| Gerät | Klicks | Impressionen | CTR | Anteil Klicks |
|---|---|---|---|---|
| **Mobil** | **592** | 9.385 | **6,31 %** | **71,5 %** |
| Computer | 221 | 6.162 | 3,59 % | 26,7 % |
| Tablet | 15 | 320 | 4,69 % | 1,8 % |

**Konsequenz:** Mobile-First ist keine Option, sondern die Grundlage. Sticky-Buchungs-CTA,
Touch-Ziele, schnelles LCP auf Mobil. Der schwächere Desktop-CTR (3,59 %) deutet auf schlechtere
Snippets/Above-the-fold auf großen Screens hin – im Neubau durch strukturierte Daten und klare
Meta-Titel adressierbar.

---

## 4. Länder (`performance/Länder.csv`)

| Land | Klicks | Impressionen | CTR |
|---|---|---|---|
| Deutschland | 773 | 13.298 | 5,81 % |
| Österreich | 19 | 545 | 3,49 % |
| Schweiz | 12 | 387 | 3,10 % |
| Italien | 7 | 224 | 3,12 % |
| Niederlande | 4 | 63 | 6,35 % |

93 % der Klicks kommen aus Deutschland. USA (388 Impr.), Indien (147), Indonesien, Philippinen
etc. erzeugen Impressionen ohne einen einzigen Klick – irrelevanter Long-Tail
(„flugsimulator", „aviation", generische Begriffe).

**Konsequenz:** **Deutsch als Root-Sprache ohne `/de/`-Präfix.** Kein EN-Launch – der
Auslandstraffic ist Rauschen. `hreflang`/`/en/` bleiben strukturell vorbereitet, aber ungebaut.
DACH-Nachbarländer (AT/CH) rechtfertigen später allenfalls Ziel-Landingpages
(Vorarlberg, Schweizer Alpen), keine zweite Sprachebene.

---

## 5. Top-Seiten (`performance/Seiten.csv`)

| # | URL | Klicks | Impr. | Ø Pos. |
|---|---|---|---|---|
| 1 | `/` | 484 | 8.102 | 14,9 |
| 2 | `/rundfluege/` | 116 | 4.629 | 17,9 |
| 3 | `/rundflug-shop/zugspitze-rundflug/` | 70 | 1.629 | 15,1 |
| 4 | `/wer-wir-sind/` | 37 | 663 | 4,1 |
| 5 | `/a320-flugsimulator/` | 24 | 343 | 6,6 |
| 6 | `/cessna-p210n-2/` | 22 | 584 | 9,9 |
| 7 | `/rundflug-shop/dolomiti-gardasee-rundflug/` | 16 | 601 | 14,5 |
| 8 | `/flugangstseminar/` | 14 | 432 | 15,7 |
| 9 | `/rundfluege/wunschrundfluege/oesterreich_rundflug/` | 10 | 403 | 27,2 |
| 10 | `/rundflug-shop/` | 10 | 357 | 13,0 |
| 11 | `/rundflug-shop/matterhorn-rundflug/` | 7 | 407 | 16,6 |
| 12 | `/kontakt/` | 6 | 361 | 2,6 |

**Beobachtungen:**
- Startseite + `/rundfluege/` = 600 Klicks / 12.731 Impr. auf schwachen Positionen (14,9 / 17,9).
  Beide ranken breit für Ziel-Queries statt scharf für einen Intent → **Aufsplittung in
  Ziel-Landingpages** hebt Positionen.
- Die Shop-Seiten (`/rundflug-shop/*`) ranken respektabel, obwohl der Inhalt ein iframe ist →
  eigenständige, indexierbare Produktseiten heben das deutlich.
- `/wer-wir-sind/` (Pos. 4,1) und `/kontakt/` (Pos. 2,6) sind stark → Brand + Local Intent
  funktionieren bereits.
- `/rundfluege/wunschrundfluege/oesterreich_rundflug/` auf Pos. 27 mit 403 Impr. → verschenktes
  Österreich-Potenzial, gehört auf eine eigene, verlinkte Ziel-Seite.

Vollständige 32-URL-Liste → Basis der Redirect-Map (`docs/06-redirect-map.md`).

---

## 6. Query-Cluster (`performance/Suchanfragen.csv`, 382 Queries)

Aggregiert nach thematischem Cluster (Substring-Match; Klicks/Impr. summiert):

| Cluster | Impr. | Klicks | Ø Pos.-Spanne | Bewertung |
|---|---|---|---|---|
| **Brand** („allgäu wings", „wings") | 425 | 132 | 1,4–7 | ✅ gesichert |
| **„alpen\*"** (alpenrundflug, rundflug alpen, hubschrauberflug alpen …) | 3.170 | 50 | 10–27 | 🔴 größtes ungenutztes Cluster |
| **Hubschrauber / Helikopter** | 2.820 | 66 | 25–50 | ⚠️ Intent-Mismatch (Flächenflieger) |
| **Bodensee** | 487 | 4 | 15–39 | 🔴 kaum abgeholt |
| **Gardasee / Dolomiten** | 437 | 5 | 9–14 | 🟡 nah an Seite 1 |
| **Flugangstseminar** | 455 | 5 | 10–16 | 🟡 eigene Seite fehlt |
| **Zugspitze** | 354 | 14 | 6,4 | ✅ Stärke, ausbauen |
| **„in der Nähe" / near me** | 337 | 15 | 3–8 | 🟢 Local-Intent, gut positioniert |
| **Österreich** | 251 | 1 | 3–11 | 🔴 Seite auf Pos. 27 |
| **Cessna / P210** | 153 | 20 | 5–17 | 🟡 echte Spec-Seite fehlt |
| Neuschwanstein / Chiemsee / Tegernsee / Großglockner | ~140 | 0 | 24–48 | Phase-2-Ziele |
| Matterhorn / Mont Blanc | ~35 | 0 | 12–24 | 🟡 Shop-Seiten da, schwach |

### 6.1 Die zwei wichtigsten Ableitungen

**(a) Ziel-Landingpage = Shop-Produktseite.** Heute existieren `/rundfluege/` **und**
`/rundflug-shop/zugspitze-rundflug/` parallel – zwei URLs, ein Intent, geteilte Autorität.
Künftig ist z. B. `/rundfluege/zugspitze/` Inhalt, Preis, Schema **und** Kauf-CTA in einer URL.

**(b) Hubschrauber-Nachfrage ehrlich behandeln.** 2.820 Impressionen suchen einen Helikopter,
Allgäu Wings fliegt Fläche (Cessna P210N). **Keine Doorway-Pages.** Stattdessen **eine** ehrliche
Vergleichsseite `/ratgeber/hubschrauber-oder-flugzeug-rundflug/`
(Sichtfeld, Reichweite, Preis/Stunde, Lärm, Alpentauglichkeit), die den konvertierbaren Teil der
Nachfrage abholt und den Rest korrekt einordnet. Erfolgskriterium: rankt + konvertiert nach 6
Monaten, sonst entfernen.

### 6.2 Datenqualität

Viele Long-Tail-Queries sind Tippfehler/Fragmente („rundglug", „winhs", „wilgs", „opcao 2",
`helikopter rundflug alpen – welche anbieter gibt es?. my location is germany.`) – KI-Suchmuster
und Autocomplete-Rauschen. Nicht optimierungsrelevant, aber ein Hinweis, dass generische
Head-Terms (`rundflug` mit 645 Impr., Pos. 32) über Ziel-Longtails effizienter erreichbar sind.

---

## 7. Indexierung / Coverage (`data/gsc/coverage/`)

| Grund | Quelle | Seiten |
|---|---|---|
| Gefunden – zurzeit nicht indexiert | Google-Systeme | **43** |
| Gecrawlt – zurzeit nicht indexiert | Google-Systeme | **25** |
| Seite mit Weiterleitung | Website | 3 |
| Nicht gefunden (404) | Website | 1 |
| Durch „noindex"-Tag ausgeschlossen | Website | 0 |
| **Indexiert (Zeitreihe `coverage/Diagramm.csv`, Stand 17.08.)** | | **30** |

Über den Exportzeitraum stagniert „indexiert" bei 30–32, „nicht indexiert" steigt von 71 auf 72.
**Diagnose:** Google hält den Großteil der URLs für nicht indexierungswürdig – dünner Inhalt,
Attachment-Seiten, Near-Duplicate-Kategorien. Klassisches WordPress-Symptom.

**Neubau-Ziel:** ~35–45 kuratierte, inhaltsstarke URLs statt ~102 dünner → Ziel-Indexierungsquote
> 90 %. Attachment-URLs werden nicht migriert (410 Gone bzw. 301 auf das Elternobjekt).
Mechanik in `docs/04-seo-strategie.md` und `docs/06-redirect-map.md`.

---

## 8. Direkt abgeleitete Maßnahmen (→ Informationsarchitektur)

| Befund | Maßnahme | Ziel-URL |
|---|---|---|
| „alpen\*" 3.170 Impr. ungenutzt | Alpen-Hub-Landingpage | `/rundfluege/alpen/` |
| Bodensee 487 Impr., 4 Klicks | Ziel- + Standortseite | `/rundfluege/bodensee/`, `/standorte/friedrichshafen/` |
| Gardasee/Dolomiten 437 Impr. | Ziel-Landingpage | `/rundfluege/dolomiten-gardasee/` |
| Österreich Pos. 27 | eigene Ziel-Seite | `/rundfluege/oesterreich/` |
| Zugspitze Pos. 6 (Stärke) | Content ausbauen + Produkt | `/rundfluege/zugspitze/` |
| Cessna 153 Impr. | echte Spec-Seite | `/flugzeug/cessna-p210n/` |
| Flugangstseminar 455 Impr. | Seite + FAQPage-Schema | `/flugerlebnisse/flugangstseminar/` |
| „in der Nähe" 337 Impr. | LocalBusiness-Schema je Standort | `/standorte/memmingen/`, `/standorte/friedrichshafen/` |
| Hubschrauber 2.820 Impr. | 1 ehrliche Vergleichsseite | `/ratgeber/hubschrauber-oder-flugzeug-rundflug/` |
| 71 % Mobil | Mobile-First, Sticky-CTA | global |
| 29 % Index-Quote | URL-Konsolidierung + Redirects | `docs/06-redirect-map.md` |

Fortsetzung: `docs/03-informationsarchitektur.md`, `docs/04-seo-strategie.md`.
