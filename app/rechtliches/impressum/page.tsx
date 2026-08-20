import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'Impressum',
  description: `Impressum der ${business.name}.`,
  alternates: { canonical: '/rechtliches/impressum/' },
  robots: 'index,follow',
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader title="Impressum" />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="font-heading text-lg font-semibold">Angaben gemäß § 5 DDG</h2>
            <p className="mt-2 text-muted-foreground">
              {business.name}<br />
              {business.street}<br />
              {business.zip} {business.city}
            </p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold">Vertreten durch</h2>
            <p className="mt-2 text-muted-foreground">{business.managingDirectors.join(', ')}</p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold">Kontakt</h2>
            <p className="mt-2 text-muted-foreground">
              Telefon: {business.phone}<br />
              E-Mail: {business.email}
            </p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold">Umsatzsteuer-ID</h2>
            <p className="mt-2 text-muted-foreground">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {business.vatId}
            </p>
          </div>
          <p className="rounded-lg border border-border bg-secondary/40 p-4 text-xs text-muted-foreground">
            Hinweis: Inhalte übernommen aus dem bestehenden Impressum (extract/html/impressum.html).
            Vor Go-live rechtlich zu prüfen (siehe docs/08-recht-compliance.md).
          </p>
        </div>
      </section>
    </>
  );
}
