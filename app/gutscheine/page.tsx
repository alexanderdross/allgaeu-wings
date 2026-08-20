import type { Metadata } from 'next';
import { Gift, Calendar, CreditCard } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { CheckoutButton } from '@/components/checkout-button';
import { Card, CardContent } from '@/components/ui/card';
import { rundfluege, formatPreis, formatDauer } from '@/data/flights';

export const metadata: Metadata = {
  title: 'Rundflug-Gutscheine verschenken',
  description:
    'Verschenken Sie ein Rundflug-Erlebnis: Gutscheine für alle Allgäu-Wings-Rundflüge, ' +
    'flexibel einlösbar und drei Jahre gültig.',
  alternates: { canonical: '/gutscheine/' },
};

export default function GutscheinePage() {
  return (
    <>
      <PageHeader
        title="Rundflug-Gutscheine"
        lead="Das perfekte Geschenk — flexibel einlösbar, drei Jahre gültig, für jedes Ziel."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Gift, title: 'Für jedes Ziel', text: 'Zugspitze bis Mont Blanc' },
            { icon: Calendar, title: '3 Jahre gültig', text: 'Termin flexibel abstimmbar' },
            { icon: CreditCard, title: 'Sichere Zahlung', text: 'Bequem online (bald verfügbar)' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 rounded-lg border border-border bg-card p-5">
              <Icon className="h-8 w-8 shrink-0 text-accent" aria-hidden />
              <div>
                <p className="font-heading font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rundfluege.map((flug) => (
            <Card key={flug.slug} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col pt-6">
                <h2 className="font-heading text-lg font-semibold">{flug.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{formatDauer(flug.flugzeitMin)}</p>
                <p className="mt-4 font-heading text-2xl font-bold text-primary">{formatPreis(flug.preis)}</p>
                <div className="mt-4">
                  <CheckoutButton slug={flug.slug} label="Als Gutschein kaufen" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-10 rounded-lg border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
          Der Kauf läuft über den sicheren Stripe-Checkout. Der automatische Versand von
          Gutscheincode und PDF (Webhook) wird mit dem Shop-Backend aktiviert
          (siehe docs/07-shop-stripe.md) — bis dahin melden wir uns nach dem Kauf persönlich.
        </p>
      </section>
    </>
  );
}
