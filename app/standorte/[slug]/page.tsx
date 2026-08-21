import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Breadcrumbs } from '@/components/breadcrumbs';
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

  const crumbs = [
    { name: 'Start', path: '/' },
    { name: 'Standorte', path: '/standorte/' },
    { name: s.name, path: `/standorte/${s.id}/` },
  ];

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
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(crumbs))}
      />
      <PageHeader title={`Rundflüge ab ${s.name}`} lead={`${s.airport} (${s.icao}). ${s.beschreibung}`} />
      <Breadcrumbs items={crumbs} />
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

        <div className="mt-10 rounded-lg border border-border bg-secondary/40 p-6">
          <h3 className="font-heading text-lg font-semibold">Alle Alpenrundflüge im Überblick</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Was einen Alpenrundflug ausmacht und welche Ziele wir ab Memmingen und Friedrichshafen
            anfliegen.
          </p>
          <Link
            href="/rundfluege/alpen/"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            Zu den Alpenrundflügen <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
