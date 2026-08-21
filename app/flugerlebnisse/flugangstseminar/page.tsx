import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from '@/lib/schema';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'Flugangstseminar, Flugangst verstehen und überwinden',
  description:
    'Flugangst ist weit verbreitet und lässt sich verlernen. Unser Seminar mit ausgebildeten ' +
    'Psychologen, Piloten und Ingenieuren hilft Ihnen dabei, inklusive Flug zum Abschluss.',
  alternates: { canonical: '/flugerlebnisse/flugangstseminar/' },
};

const themen = [
  'Subjektives vs. objektives Risiko: Wie sicher ist Fliegen wirklich?',
  'Mehr Verständnis zum Thema Technik',
  'Mehr Verständnis zum Thema Flugbetrieb',
  'Verständnis für Gefahren beim Fliegen, und deren Sicherheitsmechanismen',
  'Angst ist gelernt, und kann verlernt werden',
];

const faqs = [
  {
    frage: 'Ist Flugangst normal?',
    antwort:
      'Ja. Studien belegen, dass Flugangst in verschiedenen Ausprägungen weit verbreitet ist, nur eine Minderheit der Passagiere fühlt sich auf Flügen absolut wohl. Angst ist eine natürliche Fähigkeit, die uns vor Gefahren schützt.',
  },
  {
    frage: 'Kann man Flugangst überwinden?',
    antwort:
      'Angst ist gelernt und kann daher verlernt, abtrainiert und vergessen werden. Hat man erst verstanden, was die Ursachen der eigenen Flugangst sind, kann man ihnen durch mentales Training und mehr Verständnis begegnen. Eine Erfolgsgarantie gibt es nicht, aber die Erfolgsstatistik und -aussicht sind sehr gut.',
  },
  {
    frage: 'Wer begleitet das Seminar?',
    antwort:
      'Ein Team aus Piloten, Ingenieuren, Psychologen und sogar Piloten, die selbst mit Flugangst konfrontiert waren. Die psychologische Begleitung übernehmen dafür ausgebildete Psychologen.',
  },
  {
    frage: 'Gibt es einen Flug nach dem Seminar?',
    antwort:
      'Ja. In der letzten Phase des Seminars vermitteln wir, warum der Flug direkt im Anschluss so wichtig ist. Jeder Teilnehmer hat die Möglichkeit, ihn zu absolvieren, und erhält Einblick in Checks, Vorbereitung und alle Flugphasen.',
  },
];

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Flugangstseminar',
  serviceType: 'Flugangstseminar',
  description:
    'Seminar zum Verstehen und Überwinden von Flugangst mit Psychologen, Piloten und Ingenieuren, ' +
    'inklusive Flug zum Abschluss.',
  provider: { '@type': 'Organization', name: business.name, url: business.siteUrl },
  areaServed: 'DE',
  url: `${business.siteUrl}/flugerlebnisse/flugangstseminar/`,
};

export default function FlugangstseminarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Start', path: '/' },
            { name: 'Flugerlebnisse', path: '/flugerlebnisse/' },
            { name: 'Flugangstseminar', path: '/flugerlebnisse/flugangstseminar/' },
          ]),
        )}
      />

      <PageHeader
        title="Flugangstseminar"
        lead="Flugangst verstehen und überwinden, in professioneller, ruhiger Begleitung."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Flugangst wird schnell zum Hindernis, nämlich dann, wenn Sie fliegen möchten oder Ihre
            Lebensumstände es erfordern. Wir möchten Ihnen helfen, dieses Hindernis zu überwinden,
            und werden dabei von ausgebildeten Psychologen unterstützt.
          </p>
          <p>
            Jede Angst hat eine ihr zugrunde liegende Ursache. Diese muss für jeden Menschen
            individuell verstanden werden, genau dabei helfen wir Ihnen.
          </p>
        </div>

        <h2 className="mt-12 font-heading text-2xl font-bold">Das vermitteln wir im Seminar</h2>
        <ul className="mt-6 space-y-3">
          {themen.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <blockquote className="mt-12 border-l-4 border-accent bg-secondary/40 p-6 text-lg italic">
          „Die Schönheit des Fliegens ist nur dem zugänglich, der keine Angst dabei empfinden muss.“
        </blockquote>

        <h2 className="mt-12 font-heading text-2xl font-bold">Häufige Fragen</h2>
        <dl className="mt-6 divide-y divide-border">
          {faqs.map((f) => (
            <div key={f.frage} className="py-5">
              <dt className="font-heading font-semibold">{f.frage}</dt>
              <dd className="mt-2 text-muted-foreground">{f.antwort}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-lg border border-border bg-card p-6">
          <p className="text-muted-foreground">
            Ihre Erfolgsaussichten sind erstaunlich hoch. Rufen Sie an unter{' '}
            <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="font-medium text-accent hover:underline">
              {business.phone}
            </a>{' '}
            oder senden Sie uns eine Anfrage.
          </p>
          <Button asChild variant="accent" className="mt-4">
            <Link href="/kontakt/anfrage/">Seminar anfragen</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
