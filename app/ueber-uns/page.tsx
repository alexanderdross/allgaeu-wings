import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/schema';
import { team } from '@/data/team';

export const metadata: Metadata = {
  title: 'Über uns — das Team von Allgäu Wings',
  description:
    'Allgäu Wings wurde von Fliegerkameraden gegründet. Lernen Sie Geschäftsführung und Team kennen — ' +
    'Piloten, Ingenieure und Fluglehrer mit einem Ziel: Fliegen zum unvergesslichen Erlebnis machen.',
  alternates: { canonical: '/ueber-uns/' },
};

export default function UeberUnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Start', path: '/' },
            { name: 'Über uns', path: '/ueber-uns/' },
          ]),
        )}
      />
      <PageHeader title="Wer wir sind" lead="Piloten, Ingenieure und Fluglehrer mit einem gemeinsamen Ziel." />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Die <strong className="text-foreground">Allgäu Wings GmbH</strong> wurde von fünf
            Arbeitskollegen und Fliegerkameraden gegründet, die schon lange zuvor durch viele
            fantastische Aspekte des Fliegens miteinander verbunden waren. Fest entschlossen, dies
            weiter auszubauen und mit anderen Menschen zu teilen, packen wir das nun an – mit Ihnen!
          </p>
          <p>
            Zusammen mit sieben weiteren Piloten, Gesellschaftern, Ingenieuren, Fluglehrern und
            kreativen Köpfen ist es unser Ziel, das Fliegen für Sie zum unvergesslichen Erlebnis zu
            machen. Egal ob Rundflüge, Schulung oder Flugzeugvermietung: Allgäu Wings gestaltet das
            Fliegen gemeinsam mit Ihnen.
          </p>
        </div>
      </section>

      <section className="bg-secondary/40" aria-labelledby="team-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 id="team-heading" className="mb-10 font-heading text-2xl font-bold">Unser Team</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {team.map((m) => (
              <div key={m.email} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-heading text-lg font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{m.rolle}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.qualifikation}</p>
                <a
                  href={`mailto:${m.email}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  <Mail className="h-4 w-4" aria-hidden /> E-Mail
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
