import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'A320 Flugsimulator, selbst einen Airbus fliegen',
  description:
    'Steuern Sie selbst einen Airbus A320 in unserem Flugsimulator. Ein Instruktor weist Sie ein ' +
    'und begleitet Sie durch alle Flugphasen.',
  alternates: { canonical: '/flugerlebnisse/a320-flugsimulator/' },
};

export default function A320Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Start', path: '/' },
            { name: 'Flugerlebnisse', path: '/flugerlebnisse/' },
            { name: 'A320 Flugsimulator', path: '/flugerlebnisse/a320-flugsimulator/' },
          ]),
        )}
      />

      <PageHeader
        title="A320 Flugsimulator"
        lead="Selbst am Steuer eines Airbus A320, mit persönlicher Einweisung durch einen Instruktor."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-heading text-2xl font-bold">Ablauf</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Mit Ihrem Ticket rufen Sie bei uns an und vereinbaren einen Termin. Wir organisieren
            dann einen Instruktor für Sie, der Sie an unserem Simulator in Empfang nimmt.
          </p>
          <p>
            Von ihm bekommen Sie eine kurze Einweisung in die Funktionen des Simulators. Dort wird
            auch mit Ihnen besprochen, ob Sie besondere Wünsche für Ihren Flug haben.
          </p>
        </div>

        <div className="mt-10 rounded-lg border border-border bg-card p-6">
          <p className="text-muted-foreground">
            Verschenken Sie das Erlebnis oder buchen Sie Ihren Termin, sprechen Sie uns an.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="accent">
              <Link href="/kontakt/anfrage/">Termin anfragen</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/gutscheine/">Als Gutschein</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
