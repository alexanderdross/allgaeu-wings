import type { Metadata } from 'next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { KontaktForm } from '@/components/kontakt-form';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: `Kontaktieren Sie ${business.name}, Rundflüge ab Memmingen und Friedrichshafen.`,
  alternates: { canonical: '/kontakt/' },
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader title="Kontakt" lead="Wir beraten Sie gern zu Rundflügen, Terminen und Gutscheinen." />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <dl className="space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden />
            <div>
              <dt className="font-heading font-semibold">Telefon</dt>
              <dd>
                <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="text-accent hover:underline">
                  {business.phone}
                </a>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden />
            <div>
              <dt className="font-heading font-semibold">E-Mail</dt>
              <dd>
                <a href={`mailto:${business.email}`} className="text-accent hover:underline">{business.email}</a>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden />
            <div>
              <dt className="font-heading font-semibold">Anschrift</dt>
              <dd className="text-muted-foreground">
                {business.name}<br />
                {business.street}<br />
                {business.zip} {business.city}
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-12 border-t border-border pt-10">
          <h2 className="font-heading text-2xl font-bold">Schreiben Sie uns</h2>
          <p className="mt-2 text-muted-foreground">
            Wir antworten in der Regel innerhalb eines Werktags. Für konkrete Rundflug-Anfragen mit
            Wunschziel und Termin nutzen Sie am besten das{' '}
            <a href="/kontakt/anfrage/" className="font-medium text-accent hover:underline">Anfrageformular</a>.
          </p>
          <div className="mt-6">
            <KontaktForm />
          </div>
        </div>
      </section>
    </>
  );
}
