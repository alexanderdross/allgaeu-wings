import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { flugzeug } from '@/data/flights';
import { business } from '@/data/business';
import cessnaBild from '../../../public/img/flugzeug/cessna-p210n.jpg';

export const metadata: Metadata = {
  title: 'Cessna P210N, unser Flugzeug für Alpen-Rundflüge',
  description:
    'Die Cessna P210N Pressurized Centurion mit Druckkabine: das Reiseflugzeug für komfortable, ' +
    'hochalpine Rundflüge über die Alpen.',
  alternates: { canonical: '/flugzeug/cessna-p210n/' },
};

const flugzeugJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: flugzeug.name,
  category: 'Flugzeug',
  description: flugzeug.beschreibung,
  brand: { '@type': 'Brand', name: 'Cessna' },
  image: `${business.siteUrl}/img/flugzeug/cessna-p210n.jpg`,
  url: `${business.siteUrl}/flugzeug/cessna-p210n/`,
  additionalProperty: flugzeug.specs.map((s) => ({
    '@type': 'PropertyValue',
    name: s.label,
    value: s.value,
  })),
};

export default function FlugzeugPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(flugzeugJsonLd) }} />
      <PageHeader title={flugzeug.name} lead={flugzeug.typ} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <p className="text-lg text-muted-foreground">{flugzeug.beschreibung}</p>
          <div className="mt-8 overflow-hidden rounded-lg border border-border">
            <Image
              src={cessnaBild}
              alt="Cessna P210N der Allgäu Wings im Flug über den Alpen"
              placeholder="blur"
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
        <aside>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold">Technische Daten</h2>
            <dl className="mt-4 space-y-3">
              {flugzeug.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between border-b border-border pb-2 text-sm">
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="accent" className="mt-6 w-full">
              <Link href="/rundfluege/">Rundflug wählen</Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  );
}
