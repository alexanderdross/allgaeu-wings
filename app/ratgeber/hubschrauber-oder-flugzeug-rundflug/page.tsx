import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from '@/lib/schema';

const crumbs = [
  { name: 'Start', path: '/' },
  { name: 'Ratgeber', path: '/ratgeber/hubschrauber-oder-flugzeug-rundflug/' },
  { name: 'Hubschrauber oder Flugzeug', path: '/ratgeber/hubschrauber-oder-flugzeug-rundflug/' },
];

export const metadata: Metadata = {
  title: 'Hubschrauber oder Flugzeug: welcher Alpen-Rundflug passt?',
  description:
    'Hubschrauber-Rundflug oder Flugzeug-Rundflug über die Alpen? Der Vergleich: Reichweite, Höhe, ' +
    'Komfort und Kosten, und warum die Cessna P210N mit Druckkabine für Alpenrundflüge ideal ist.',
  alternates: { canonical: '/ratgeber/hubschrauber-oder-flugzeug-rundflug/' },
};

const faqs = [
  {
    frage: 'Bietet Allgäu Wings Hubschrauber-Rundflüge an?',
    antwort:
      'Nein. Wir fliegen mit der Cessna P210N, einem einmotorigen Reiseflugzeug mit Druckkabine. Für Alpenrundflüge über weite Strecken und hohe Gipfel ist das Flugzeug besonders gut geeignet.',
  },
  {
    frage: 'Was ist der Unterschied zwischen Hubschrauber und Flugzeug beim Rundflug?',
    antwort:
      'Ein Hubschrauber kann schweben und langsam sehr nah an ein Motiv heranfliegen, hat aber eine geringere Reichweite und keine Druckkabine. Ein Flugzeug fliegt schneller und weiter, mit Druckkabine auch komfortabel über die hohen Gipfel der Alpen, und eignet sich damit für längere Routen wie zum Matterhorn oder Mont Blanc.',
  },
  {
    frage: 'Was ist günstiger, Hubschrauber oder Flugzeug?',
    antwort:
      'Für kurze Runden über einem einzelnen Punkt kann ein Hubschrauber passen. Für längere Alpenrouten ist das Flugzeug in der Regel wirtschaftlicher, weil es die Strecke schneller und effizienter zurücklegt.',
  },
];

const vorteileFlugzeug = [
  'Druckkabine: komfortabel über die hohen Gipfel der Alpen',
  'Große Reichweite: von Memmingen bis Matterhorn und Mont Blanc',
  'Ruhiger, schneller Reiseflug mit weitem Panoramablick',
  'Wirtschaftlich auf längeren Strecken',
];

const vorteileHubschrauber = [
  'Kann schweben und sehr nah an ein Motiv heranfliegen',
  'Start und Landung auch auf kleinen Flächen',
  'Sehr niedrige, langsame Passagen möglich',
];

export default function RatgeberHubschrauberPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(crumbs))}
      />

      <PageHeader
        title="Hubschrauber oder Flugzeug-Rundflug?"
        lead="Welche Art Rundflug passt zu einem Erlebnis über den Alpen? Der ehrliche Vergleich."
      />
      <Breadcrumbs items={crumbs} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Viele suchen nach einem Hubschrauber-Rundflug über die Alpen. Für ein weites, hochalpines
            Panorama ist jedoch oft ein Flugzeug die bessere Wahl. Wir fliegen mit der Cessna P210N,
            einem Reiseflugzeug mit Druckkabine, und erklären hier, worin sich beide unterscheiden.
          </p>
          <p>
            Der Hubschrauber punktet, wenn es darum geht, an einer Stelle zu schweben oder sehr nah
            und langsam an ein einzelnes Motiv heranzufliegen. Seine Stärke ist die Nähe, nicht die
            Distanz. Für eine kurze Runde über einem festen Punkt kann er ideal sein.
          </p>
          <p>
            Ein Alpenrundflug lebt dagegen von der Strecke und der Höhe: von der Zugspitze über die
            Tiroler Alpen bis zum Matterhorn und Mont Blanc. Hier spielt das Flugzeug seine Vorteile
            aus. Die Druckkabine ermöglicht komfortables Fliegen über die hohen Gipfel, die große
            Reichweite bringt Sie auch zu weit entfernten Zielen, und der ruhige Reiseflug bietet
            einen weiten Panoramablick.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-secondary/40 p-6">
            <h2 className="font-heading text-lg font-semibold">Flugzeug (Cessna P210N)</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {vorteileFlugzeug.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /> <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold">Hubschrauber</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {vorteileHubschrauber.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden /> <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
            <Link href="/rundfluege/alpen/">Zu den Alpenrundflügen</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/flugzeug/cessna-p210n/">Unser Flugzeug</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
