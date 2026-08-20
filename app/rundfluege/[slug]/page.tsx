import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, MapPin, Plane, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  rundfluege,
  getRundflug,
  getStandort,
  formatPreis,
  formatDauer,
  flugzeug,
} from '@/data/flights';

export function generateStaticParams() {
  return rundfluege.map((flug) => ({ slug: flug.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const flug = getRundflug(slug);
  if (!flug) return { title: 'Rundflug nicht gefunden', robots: 'noindex' };
  return {
    title: `${flug.name} — ${formatDauer(flug.flugzeitMin)} ab ${formatPreis(flug.preis)}`,
    description: flug.kurzbeschreibung,
    alternates: { canonical: `/rundfluege/${flug.slug}/` },
    openGraph: { title: flug.name, description: flug.kurzbeschreibung, type: 'website', locale: 'de_DE' },
  };
}

export default async function RundflugDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const flug = getRundflug(slug);
  if (!flug) notFound();

  const standort = getStandort(flug.standortId);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: flug.name,
    description: flug.kurzbeschreibung,
    brand: { '@type': 'Brand', name: 'Allgäu Wings' },
    offers: {
      '@type': 'Offer',
      price: flug.preis,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://www.allgaeu-wings.de/rundfluege/${flug.slug}/`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[#0d2a4a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <nav className="mb-4 text-sm text-white/60" aria-label="Brotkrumen">
            <Link href="/rundfluege/" className="hover:text-white">Rundflüge</Link>
            <span className="mx-2">/</span>
            <span>{flug.name}</span>
          </nav>
          <h1 className="max-w-3xl font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">{flug.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{flug.kurzbeschreibung}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-white/80">
            <span className="inline-flex items-center gap-2"><Clock className="h-5 w-5 text-accent" aria-hidden /> {formatDauer(flug.flugzeitMin)}</span>
            {standort && <span className="inline-flex items-center gap-2"><MapPin className="h-5 w-5 text-accent" aria-hidden /> ab {standort.name}</span>}
            <span className="inline-flex items-center gap-2"><Plane className="h-5 w-5 text-accent" aria-hidden /> {flugzeug.name}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-2xl font-bold">Highlights dieser Route</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {flug.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {standort && (
            <div className="mt-10 rounded-lg border border-border bg-secondary/40 p-6">
              <h3 className="font-heading text-lg font-semibold">Abflug ab {standort.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {standort.airport} ({standort.icao}). {standort.beschreibung}
              </p>
              <Link href={`/standorte/${standort.id}/`} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Zum Standort <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          )}
        </div>

        {/* Buchungs-Panel */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Preis ganze Buchung</p>
            <p className="font-heading text-4xl font-bold text-primary">{formatPreis(flug.preis)}</p>
            <p className="mt-1 text-sm text-muted-foreground">{formatDauer(flug.flugzeitMin)} Flugzeit</p>
            <Button asChild variant="accent" className="mt-6 w-full" size="lg">
              {/* Phase 3: nativer Stripe-Checkout. Bis dahin Anfrage/Gutschein. */}
              <Link href="/kontakt/anfrage/">Jetzt anfragen</Link>
            </Button>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link href="/gutscheine/">Als Gutschein verschenken</Link>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              Rundflüge sind wetterabhängig. Der Termin wird nach der Buchung gemeinsam abgestimmt.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
