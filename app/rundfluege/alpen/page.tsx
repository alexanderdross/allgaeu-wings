import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RundflugCard } from '@/components/rundflug-card';
import { rundfluege } from '@/data/flights';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/schema';

const crumbs = [
  { name: 'Start', path: '/' },
  { name: 'Rundflüge', path: '/rundfluege/' },
  { name: 'Alpenrundflüge', path: '/rundfluege/alpen/' },
];

// Regionale Ziele mit belegter GSC-Nachfrage, aber ohne eigene Seite
// (docs/11-verbesserungsplan.md A9). Ehrliche Zuordnung zu real geflogenen
// Routen bzw. zum Wunschrundflug, keine erfundenen Streckenversprechen.
const regionen = [
  {
    titel: 'Schloss Neuschwanstein',
    text: 'Das Märchenschloss von König Ludwig II. liegt aus der Luft besonders eindrucksvoll. Es ist ein fester Höhepunkt auf der Route zur Zugspitze und zum Großglockner.',
    href: '/rundfluege/zugspitze/',
    linkText: 'Zum Zugspitze Rundflug',
  },
  {
    titel: 'Bayern und Raum München',
    text: 'Wir starten in Memmingen mitten im bayerischen Allgäu und fliegen über die bayerischen Alpen mit Zugspitze, Allgäuer Gipfeln und den Voralpenseen.',
    href: '/standorte/memmingen/',
    linkText: 'Abflug ab Memmingen',
  },
  {
    titel: 'Chiemsee und Tegernsee',
    text: 'Die bayerischen Voralpenseen fliegen wir als individuellen Wunschrundflug auf Anfrage. Nennen Sie uns Ihr Wunschziel, wir stimmen die Route mit Ihnen ab.',
    href: '/kontakt/anfrage/',
    linkText: 'Wunschrundflug anfragen',
  },
];

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
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(crumbs))}
      />

      <PageHeader
        title="Alpenrundflüge"
        lead="Über die Alpen zu den bekanntesten Gipfeln und Seen, ab Memmingen und Friedrichshafen."
      />
      <Breadcrumbs items={crumbs} />

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

      <section
        className="border-t border-border bg-secondary/30"
        aria-labelledby="alpen-regionen"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <h2 id="alpen-regionen" className="font-heading text-2xl font-bold">
            Beliebte Regionen und Ziele
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Viele Gäste suchen gezielt nach einer Region. Hier sehen Sie, welche Ziele auf welcher
            Route liegen und was wir auf Anfrage individuell fliegen.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {regionen.map((r) => (
              <div key={r.titel} className="flex flex-col rounded-lg border border-border bg-card p-6">
                <h3 className="font-heading text-lg font-semibold">{r.titel}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.text}</p>
                <Link
                  href={r.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  {r.linkText} <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
