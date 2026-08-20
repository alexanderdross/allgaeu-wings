import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { standorte } from '@/data/flights';

export const metadata: Metadata = {
  title: 'Unsere Standorte — Memmingen & Friedrichshafen',
  description: 'Rundflüge ab Allgäu Airport Memmingen (EDJA) und Bodensee-Airport Friedrichshafen (EDNY).',
  alternates: { canonical: '/standorte/' },
};

export default function StandortePage() {
  return (
    <>
      <PageHeader title="Unsere Standorte" lead="Starten Sie Ihren Rundflug ab Memmingen oder Friedrichshafen." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {standorte.map((s) => (
            <Link
              key={s.id}
              href={`/standorte/${s.id}/`}
              className="group rounded-lg border border-border bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl font-semibold group-hover:text-accent">{s.name}</h2>
                <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">{s.icao}</span>
              </div>
              <p className="mt-1 font-medium text-muted-foreground">{s.airport}</p>
              <p className="mt-4 text-muted-foreground">{s.beschreibung}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
