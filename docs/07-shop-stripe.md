# 07 · Shop & Stripe

Ersetzt den **Regiondo-iframe** durch einen nativen Shop auf eigener Domain. Muster: die produktive
Stripe-Integration in `drossnet` (`app/api/checkout/route.ts`, `app/api/webhooks/stripe/route.ts`).

## 1. Shop-Modell: Gutschein-first (empfohlen)

Der Kunde kauft einen **Rundflug-Gutschein**; der Termin wird danach vereinbart.

**Begründung:**
- Bildet das heutige Regiondo-Verhalten 1:1 ab (kein Bruch für Bestandskunden).
- **Wetterrobust:** Rundflüge sind wetterabhängig – feste Slots erzeugen Storno- und
  Umbuchungslast. Ein Gutschein entkoppelt Kauf und Termin.
- **Kürzester Weg zum Go-live** – kein Verfügbarkeitsmodell nötig.
- Ein Slot-Kalender ist **Phase 6** (`10-roadmap.md`), nicht gestrichen.

## 2. Produktkatalog (Single Source of Truth im Repo)

`src/data/flights.ts` – jedes Ziel ist Content **und** Produkt (`03-informationsarchitektur.md`).

```ts
export interface Rundflug {
  slug: string            // /rundfluege/[slug]/
  name: string
  standortId: string      // 'memmingen' | 'friedrichshafen'
  flugzeitMin: number
  basisPreis: number      // € brutto  ← aus extract/shop/produkte.md
  varianten?: Variante[]  // Dauer/Personen-Konfigurationen
  kategorie: 'alpen'|'see'|'berg'|'stadt'|'wunsch'
}
export interface Variante { id, label, dauerMin, preis }  // preis brutto, server-only
```

**Preise werden serverseitig aufgelöst** – der Client schickt nur `slug`/`variantId`, **nie einen
Betrag** (Manipulationsschutz, Muster `drossnet` `checkout/route.ts`).

> **TODO (aus Extract):** `basisPreis`, `flugzeitMin`, Varianten und Personenzahl je Ziel aus
> `extract/shop/produkte.md` übernehmen. Bis dahin Platzhalter. **Nichts schätzen.**

## 3. Checkout-Flow

```
Produktseite /rundfluege/[slug]/
   │  Auswahl Dauer/Personen  → Warenkorb (Cookie)
   ▼
POST /api/checkout            → Preis serverseitig auflösen, Zod-Validierung, Rate-Limit
   ▼
Stripe Checkout Session       → mode:'payment', tax_behavior:'inclusive',
   │                             invoice_creation, phone_number_collection, locale:'de'
   ▼
success_url /shop/danke/?session_id=…   |   cancel_url /shop/abbruch/
   ▼
POST /api/webhooks/stripe     → checkout.session.completed (nur wenn 'paid')
   ▼
Gutschein erzeugen → PDF → Mail an Käufer + Büro → D1 vouchers (status 'issued')
```

**Zahlarten:** Karte, Apple/Google Pay, PayPal; SEPA optional (dann
`checkout.session.async_payment_succeeded` behandeln – Fulfillment erst nach Zahlungseingang).

**Kein Versand** – Ausnahme: physische **Gutschein-Box** als Add-on mit einer DE-Flatrate
(`shipping_options`, nur wenn Box im Warenkorb).

## 4. Webhook & Idempotenz

Doppelte Absicherung (Muster `drossnet`):

1. **`WEBHOOK_IDEMPOTENCY_KV`** (24 h TTL) – schneller Replay-Filter über Isolate-Grenzen hinweg
   (auf Workers zwingend: jedes Isolate hat eigenen Speicher).
2. **`order_processed`-Metadatum** am PaymentIntent + Unique-Index `webhook_events.stripe_event_id`
   in D1 – dauerhafte Idempotenz.

Signaturprüfung via `STRIPE_WEBHOOK_SECRET`. Fulfillment **nur** bei `payment_status === 'paid'`.
Nie doppelt versenden/gutschreiben.

## 5. Gutschein-Lifecycle

| Status | Auslöser |
|---|---|
| `issued` | Zahlung bestätigt → Code + PDF erzeugt, Mail raus |
| `redeemed` | Einlösung über `/gutschein-einloesen/` (Terminanfrage) |
| `expired` | Ablaufdatum überschritten |
| `cancelled` | Storno/Refund |

- **Code-Format:** `AW-XXXX-XXXX`, kryptografisch zufällig (`node:crypto`), mit Prüfziffer.
- **Gültigkeit:** 3 Jahre (§§ 195, 199 BGB – Verjährung zum Jahresende; im AGB benennen).
- **PDF:** serverseitig gerendert, Marke + Code + Leistung + Gültigkeit; per Mail (`worker-mailer`)
  an Käufer, Kopie ans Büro.
- **Einlösung:** `/gutschein-einloesen/` – Code + Wunschtermin + Passagiere + Abflugort →
  `redemptions` in D1 → Mail ans Büro (Turnstile-geschützt).
- **Regiondo-Alt-Codes** bleiben einlösbar (Import in D1, `09-migration-runbook.md` Phase 5).

## 6. Steuer (Tax)

`STRIPE_AUTOMATIC_TAX` default **`false`** bis der USt-Satz fachlich geklärt ist
(`08-recht-compliance.md` §2.1 – Rundflug ohne Ortsveränderung vs. grenzüberschreitende
Beförderung nach IT/CH/AT). Bis dahin Bruttopreise mit bestätigtem Satz, `tax_behavior:
'inclusive'`. Nach Klärung: Stripe Tax / OSS aktivieren, Origin-Adresse + Registrierungen im
Stripe-Dashboard hinterlegen. `invoice_creation` liefert USt-Rechnungen als PDF.

## 7. Admin (Phase 2, minimal)

Hinter **Cloudflare Access** (kein eigenes Auth-System): Gutscheinsuche, Status, manuelle
Einlösung, Anfragen-Liste. Bestellungen/Zahlungen bleiben im **Stripe-Dashboard** (= primäre
Bestellübersicht) – kein doppeltes Order-System.

## 8. Umgebungsvariablen (Shop)

```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_AUTOMATIC_TAX=false          # bis USt geklärt
SHOP_EMAIL_TO                       # Büro-Postfach
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS   # worker-mailer
NEXT_PUBLIC_TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY
```

Runtime-Vars im Cloudflare-Dashboard (`keep_vars: true`), lokal in `.dev.vars`.

## 9. D1-Schema (Kern)

```sql
CREATE TABLE vouchers (
  id TEXT PRIMARY KEY,            -- AW-XXXX-XXXX
  slug TEXT NOT NULL,            -- gekauftes Ziel/Produkt
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL,          -- issued|redeemed|expired|cancelled
  buyer_email TEXT,
  stripe_session_id TEXT,
  origin TEXT DEFAULT 'shop',    -- shop|regiondo (Migration)
  issued_at TEXT, expires_at TEXT
);
CREATE TABLE redemptions (
  id TEXT PRIMARY KEY, voucher_id TEXT NOT NULL,
  wish_date TEXT, passengers INTEGER, departure TEXT,
  status TEXT, created_at TEXT
);
CREATE TABLE booking_requests (
  id TEXT PRIMARY KEY, name TEXT, email TEXT, phone TEXT,
  route TEXT, departure TEXT, passengers INTEGER, message TEXT, created_at TEXT
);
CREATE TABLE webhook_events (
  stripe_event_id TEXT PRIMARY KEY, type TEXT, received_at TEXT
);
```
