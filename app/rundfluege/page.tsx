import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { RundflugCard } from '@/components/rundflug-card';
import { rundfluege, rundfluegeNachKategorie } from '@/data/flights';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Alpen-Rundflüge, Zugspitze, Matterhorn, Bodensee & mehr',
  description:
    'Alle Rundflüge von Allgäu Wings im Überblick: Zugspitze, Bodensee, Ötztal, Großglockner, ' +
    'Matterhorn, Mont Blanc sowie Dolomiten & Gardasee. Ab Memmingen und Friedrichshafen.',
  alternates: { canonical: '/rundfluege/' },
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Rundflüge von Allgäu Wings',
  numberOfItems: rundfluege.length,
  itemListElement: rundfluege.map((flug, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: flug.name,
    url: `https://www.allgaeu-wings.de/rundfluege/${flug.slug}/`,
  })),
};

export default function RundfluegePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Start', path: '/' },
            { name: 'Rundflüge', path: '/rundfluege/' },
          ]),
        )}
      />
      <PageHeader
        title="Unsere Rundflüge"
        lead="Von der Zugspitze bis zum Mont Blanc, wählen Sie Ihr Ziel und buchen Sie online."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Link
          href="/rundfluege/alpen/"
          className="mb-10 flex items-center justify-between gap-4 rounded-lg border border-border bg-secondary/40 p-5 transition-colors hover:border-accent/60"
        >
          <span>
            <span className="font-heading font-semibold">Alpenrundflüge im Überblick</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              Was einen Alpenrundflug ausmacht und welche Ziele wir anfliegen.
            </span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-accent" aria-hidden />
        </Link>
        {rundfluegeNachKategorie().map((group) => (
          <section key={group.kategorie} className="mb-14 last:mb-0" aria-labelledby={`kat-${group.kategorie}`}>
            <h2 id={`kat-${group.kategorie}`} className="mb-6 font-heading text-2xl font-bold">
              {group.label}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.fluege.map((flug) => (
                <RundflugCard key={flug.slug} flug={flug} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
