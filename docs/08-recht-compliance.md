# 08 · Recht & Compliance

> **Kein Rechtsrat.** Dieses Dokument trennt, was im Neubau technisch/redaktionell umgesetzt wird,
> von dem, was **fachlich (Steuerberater / Rechtsanwalt) geklärt werden muss**. Offene Punkte
> werden als solche ausgewiesen, nicht als gesichert dargestellt.

## 1. Wird im Neubau umgesetzt

| Pflicht | Umsetzung |
|---|---|
| **Button-Lösung** (§ 312j Abs. 3 BGB) | Bestell-Button beschriftet „Zahlungspflichtig bestellen" |
| **Preisangaben** (PAngV) | Endpreise inkl. USt, Grundpreis n. a. (Dienstleistung), Versandkosten nur bei physischer Gutschein-Box |
| **Vorvertragliche Infos** (Art. 246a EGBGB) | Leistungsbeschreibung, Gesamtpreis, Zahlungs-/Lieferbedingungen, Gültigkeit auf Produkt- und Checkout-Seite |
| **Impressum** (§ 5 DDG) | `/rechtliches/impressum/` – Firma, Anschrift Weiler-Simmerberg, GF, USt-IdNr. DE299519907, Kontakt |
| **Datenschutzerklärung** (Art. 13 DSGVO) | `/rechtliches/datenschutz/` – Hosting Cloudflare, Stripe, Turnstile, worker-mailer, Analytics |
| **AGB** | `/rechtliches/agb/` – Rundflug-/Gutschein-Bedingungen, Wetter-/Stornoregeln |
| **Widerrufsbelehrung + Muster-Formular** | `/rechtliches/widerruf/` – abhängig von §2 unten |
| **Cookie-/Consent** | siehe §4 – Start ohne Banner |

## 2. Fachlich zu klären (offen)

### 2.1 Umsatzsteuersatz — OFFEN

Rundflüge **ohne Ortsveränderung** (Start = Ziel) werden umsatzsteuerlich regelmäßig anders
behandelt als **grenzüberschreitende Personenbeförderung** (Flüge nach Italien/Schweiz/Österreich
– Gardasee, Matterhorn, Mont Blanc). Der anzuwendende Satz und die korrekte Behandlung
grenzüberschreitender Strecken sind **vom Steuerberater zu bestätigen**.

**Technische Konsequenz:** `STRIPE_AUTOMATIC_TAX` bleibt per Env-Flag **auf `false`**, bis der
Satz geklärt ist. Preise werden bis dahin als Bruttopreise mit fixem, bestätigtem Satz geführt
(`tax_behavior: 'inclusive'`). Erst nach Klärung wird Stripe Tax / OSS aktiviert
(`07-shop-stripe.md` §Tax).

### 2.2 Widerrufsrecht — OFFEN, weichenstellend

- **Terminierte Freizeitleistung:** Für einen *konkret datierten* Rundflug greift die Ausnahme
  nach **§ 312g Abs. 2 Nr. 9 BGB** (Freizeitbetätigung zu bestimmtem Termin) – i. d. R. **kein**
  Widerrufsrecht.
- **Undatierter Wertgutschein:** Ein *nicht terminierter* Gutschein fällt nach überwiegender
  Auffassung **nicht** unter diese Ausnahme und ist damit **widerruflich** (14 Tage).

Da das Shop-Modell **gutschein-first** ist (`07-shop-stripe.md`), ist die überwiegende Zahl der
Verkäufe voraussichtlich widerruflich. AGB, Widerrufsbelehrung und der Prozess (Erstattung über
Stripe-Refund) sind entsprechend auszulegen. **Rechtliche Bestätigung erforderlich**, bevor die
AGB final formuliert werden.

### 2.3 Luftrechtliche/versicherungsrechtliche Hinweise — OFFEN

Passagier-Voraussetzungen (Gewicht, Anzahl je Flug), Wetterstorno, Haftung, ggf.
Beförderungsbedingungen. Inhalte kommen vom Betrieb; die Seite stellt sie nur dar.

## 3. Auftragsverarbeiter (AVV) — DSGVO-Kette

| Dienst | Zweck | AVV nötig |
|---|---|---|
| Cloudflare (Workers, D1, R2, KV, Turnstile, Analytics) | Hosting, Daten, Bot-Schutz, Reichweite | ja |
| Stripe | Zahlungsabwicklung | ja |
| SMTP-Provider (worker-mailer-Backend) | Transaktionsmails | ja |

Bewusste Designentscheidung: **kein zusätzlicher E-Mail-SaaS** (Resend o. ä.) – `worker-mailer`
spricht direkt SMTP, das hält die AVV-Kette kurz. Cloudflare-Datenverarbeitung: Standorte/DPA im
Datenschutztext benennen.

## 4. Consent / Analytics

**Empfehlung: Start ohne Cookie-Banner.**

- **Cloudflare Web Analytics** ist cookielos und setzt keine personenbezogenen Identifier →
  kein Consent-Banner nötig, besseres CWV, höhere Conversion.
- **Turnstile** ersetzt reCAPTCHA (kein Google-Consent, DSGVO-freundlicher).
- **Selbstgehostete Fonts** (`next/font/local`) – keine Google-Fonts-CDN, kein Drittland-Transfer
  beim Seitenaufruf.
- **Stripe** lädt erst im Checkout (nutzergewollte Zahlung) – dort ist die Datenverarbeitung
  vertragsnotwendig.

GA4 nur auf ausdrücklichen Wunsch – dann mit **Consent Mode v2** und einem Consent-Banner
(z. B. Cookiebot/Usercentrics). Das ist bewusst die schlechtere Default-Wahl.

## 5. Regiondo-Exit

- **Bestehende Regiondo-Gutscheine bleiben einlösbar.** Der Importpfad für Alt-Codes ist im
  Migrations-Runbook Pflichtschritt (`09-migration-runbook.md`), nicht optional.
- Vertragslaufzeit/Kündigungsfrist bei Regiondo prüfen; Kündigung **erst nach** stabilem Betrieb
  des nativen Shops.
- Übergangsphase: native Produktseiten live, Regiondo-Einlösung weiter möglich, bis alle Alt-Codes
  abgelaufen oder migriert sind.

## 6. Sicherheit (akut)

Die aktuelle Live-Seite hat ein **ungültiges/abgelaufenes TLS-Zertifikat** (bei der Extraktion nur
mit `--insecure` erreichbar). Nach Cutover auf Cloudflare ist TLS **managed** (Universal SSL,
Auto-Renewal) – das Problem entfällt strukturell. Bis dahin: das bestehende WordPress-Zertifikat
sollte kurzfristig erneuert werden, unabhängig vom Neubau.
