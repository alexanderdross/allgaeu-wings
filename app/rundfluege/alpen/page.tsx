import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { RundflugCard } from '@/components/rundflug-card';
import { rundfluege } from '@/data/flights';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Alpenrundflug ab Memmingen & Friedrichshafen',
  description:
    'Alpenrundflüge mit Allgäu Wings: über die Alpen zur Zugspitze, zum Matterhorn und Mont Blanc, ' +
    'über Bodensee, Dolomiten und Gardasee. An Bord der Cessna P210N mit Druckkabine, ab Memmingen ' +
    'und Friedrichshafen.',
  alternates: { canonical: '/rundfluege/alpen/' },
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Alpenrundflüge von Allgäu Wings',
  numberOfItems: rundfluege.length,
  itemListElement: rundfluege.map((flug, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: flug.name,
    url: `https://www.allgaeu-wings.de/rundfluege/${flug.slug}/`,
  })),
};

export default function AlpenrundflugPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Start', path: '/' },
            { name: 'Rundflüge', path: '/rundfluege/' },
            { name: 'Alpenrundflüge', path: '/rundfluege/alpen/' },
          ]),
        )}
      />

      <PageHeader
        title="Alpenrundflüge"
        lead="Über die Alpen zu den bekanntesten Gipfeln und Seen, ab Memmingen und Friedrichshafen."
      />

      <section className="mx-auto max-w-3xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Ein Alpenrundflug zeigt Ihnen die Bergwelt aus einer Perspektive, die vom Boden aus
            unerreichbar bleibt: Gletscher, schroffe Grate und tief eingeschnittene Täler ziehen unter
            der Tragfläche vorbei. Wir fliegen ab Memmingen und Friedrichshafen an Bord der Cessna
            P210N mit Druckkabine, die komfortabel über die hochalpinen Regionen steigt.
          </p>
          <p>
            Die Bandbreite reicht von der Zugspitze und dem Allgäu über die Tiroler Alpen und die
            Hohen Tauern bis zum Matterhorn im Wallis und dem Mont Blanc, dem höchsten Berg der Alpen.
            Auf der Südseite warten die Dolomiten und der Gardasee, im Westen der Bodensee mit Blick
            auf drei Länder. Jede Route hat ihren eigenen Charakter, die Auswahl finden Sie unten.
          </p>
          <p>
            An Bord genießen Sie geräuschreduzierte Headsets und die Ruhe der Druckkabine. Sie buchen
            Ihre Wunschroute direkt online oder senden uns eine Anfrage, den Termin stimmen wir
            wetterabhängig gemeinsam ab.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="alpen-ziele">
        <h2 id="alpen-ziele" className="mb-8 font-heading text-2xl font-bold">Alle Alpenrundflüge</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rundfluege.map((flug) => (
            <RundflugCard key={flug.slug} flug={flug} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
            <Link href="/kontakt/anfrage/">Rundflug anfragen</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/standorte/">Unsere Standorte</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
