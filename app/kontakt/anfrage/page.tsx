import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { AnfrageForm } from '@/components/anfrage-form';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'Rundflug anfragen',
  description: 'Fragen Sie Ihren Wunsch-Rundflug bei Allgäu Wings an — Ziel, Termin und Personenzahl.',
  alternates: { canonical: '/kontakt/anfrage/' },
};

export default function AnfragePage() {
  return (
    <>
      <PageHeader
        title="Rundflug anfragen"
        lead="Nennen Sie uns Wunschziel, Termin und Personenzahl — wir melden uns mit einem Angebot."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <AnfrageForm />
        <p className="mt-8 text-sm text-muted-foreground">
          Lieber telefonisch? Rufen Sie an unter{' '}
          <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="font-medium text-accent hover:underline">
            {business.phone}
          </a>
          .
        </p>
      </section>
    </>
  );
}
