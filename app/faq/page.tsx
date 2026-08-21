import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from '@/lib/schema';

const crumbs = [
  { name: 'Start', path: '/' },
  { name: 'FAQ', path: '/faq/' },
];

export const metadata: Metadata = {
  title: 'Häufige Fragen zu Rundflügen',
  description:
    'Antworten auf häufige Fragen zu Rundflügen bei Allgäu Wings: Abflugorte, Personenzahl, Wetter, ' +
    'Dauer, Buchung und Gutscheine.',
  alternates: { canonical: '/faq/' },
};

const faqs = [
  {
    frage: 'Von wo starten die Rundflüge?',
    antwort:
      'Unsere Rundflüge starten ab dem Allgäu Airport Memmingen (EDJA) und ab dem Bodensee-Airport Friedrichshafen (EDNY). Welcher Standort für welche Route gilt, sehen Sie auf der jeweiligen Rundflug-Seite.',
  },
  {
    frage: 'Wie viele Personen können mitfliegen?',
    antwort:
      'An Bord der Cessna P210N können bis zu fünf Gäste mitfliegen, dazu kommt der Pilot. Für größere Gruppen sprechen Sie uns gern an, wir finden eine Lösung.',
  },
  {
    frage: 'Was passiert bei schlechtem Wetter?',
    antwort:
      'Rundflüge sind wetterabhängig. Lässt das Wetter einen sicheren und schönen Flug nicht zu, verschieben wir den Termin. Den genauen Termin stimmen wir nach der Buchung gemeinsam mit Ihnen ab.',
  },
  {
    frage: 'Wie lange dauert ein Rundflug?',
    antwort:
      'Je nach Route dauert ein Rundflug etwa 60 bis 150 Minuten reine Flugzeit. Die Dauer finden Sie bei jedem Rundflug angegeben.',
  },
  {
    frage: 'Wie buche ich einen Rundflug?',
    antwort:
      'Sie wählen Ihre Wunschroute auf der jeweiligen Rundflug-Seite und buchen online, oder Sie senden uns eine Anfrage mit Wunschziel und Termin. Alternativ erreichen Sie uns telefonisch.',
  },
  {
    frage: 'Wie lange ist ein Gutschein gültig?',
    antwort:
      'Rundflug-Gutscheine sind flexibel einlösbar und drei Jahre gültig, ein passendes Geschenk für viele Anlässe.',
  },
];

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(crumbs))}
      />

      <PageHeader title="Häufige Fragen" lead="Antworten rund um Ihren Rundflug bei Allgäu Wings." />
      <Breadcrumbs items={crumbs} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <dl className="space-y-8">
          {faqs.map((f) => (
            <div key={f.frage}>
              <dt className="font-heading text-lg font-semibold">{f.frage}</dt>
              <dd className="mt-2 leading-relaxed text-muted-foreground">{f.antwort}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 rounded-lg border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
          Ihre Frage ist nicht dabei? Schreiben Sie uns über das{' '}
          <Link href="/kontakt/" className="font-medium text-accent hover:underline">Kontaktformular</Link>{' '}
          oder rufen Sie uns an.
        </p>
      </section>
    </>
  );
}
