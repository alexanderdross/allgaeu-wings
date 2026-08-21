import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { RundflugCard } from '@/components/rundflug-card';
import { standorte, getStandort, rundfluege } from '@/data/flights';
import { business } from '@/data/business';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/schema';

export function generateStaticParams() {
  return standorte.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStandort(slug);
  if (!s) return { title: 'Standort nicht gefunden', robots: 'noindex' };
  return {
    title: `Rundflüge ab ${s.name} (${s.icao}), ${s.airport}`,
    description: `Alpen-Rundflüge ab ${s.airport}. ${s.beschreibung}`,
    alternates: { canonical: `/standorte/${s.id}/` },
  };
}

export default async function StandortDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStandort(slug);
  if (!s) notFound();

  const flugeAbHier = rundfluege.filter((f) => f.standortId === s.id);

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${business.name}, ${s.name}`,
    telephone: business.phone,
    url: `https://www.allgaeu-wings.de/standorte/${s.id}/`,
    address: { '@type': 'PostalAddress', addressLocality: s.name, addressCountry: 'DE' },
    geo: { '@type': 'GeoCoordinates', latitude: s.geo.lat, longitude: s.geo.lng },
    areaServed: s.region,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Start', path: '/' },
            { name: 'Standorte', path: '/standorte/' },
            { name: s.name, path: `/standorte/${s.id}/` },
          ]),
        )}
      />
      <PageHeader title={`Rundflüge ab ${s.name}`} lead={`${s.airport} (${s.icao}). ${s.beschreibung}`} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="mb-8 font-heading text-2xl font-bold">Rundflüge ab {s.name}</h2>
        {flugeAbHier.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {flugeAbHier.map((flug) => (
              <RundflugCard key={flug.slug} flug={flug} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Aktuell keine Rundflüge ab diesem Standort hinterlegt.</p>
        )}
      </section>
    </>
  );
}
