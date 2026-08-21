import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Gauge, Clock } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/schema';
import taxiflugBild from '../../../public/img/taxiflug.jpg';

export const metadata: Metadata = {
  title: 'Taxiflug, schnell und direkt ans Ziel',
  description:
    'Individueller Taxiflug ab Memmingen oder Friedrichshafen mit der Cessna P210N. Flexibel, ' +
    'direkt und mit rund 330 bis 355 km/h Reisegeschwindigkeit. Route und Termin auf Anfrage.',
  alternates: { canonical: '/flugerlebnisse/taxiflug/' },
};

const eckdaten = [
  { icon: MapPin, label: 'Abflug', value: 'Memmingen (EDJA) oder Friedrichshafen (EDNY)' },
  { icon: Users, label: 'Plätze', value: 'bis zu 5 Gäste' },
  { icon: Gauge, label: 'Reisegeschwindigkeit', value: 'rund 330 bis 355 km/h (179 bis 191 Knoten)' },
  { icon: Clock, label: 'Preis und Termin', value: 'auf Anfrage, individuell abgestimmt' },
];

export default function TaxiflugPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Start', path: '/' },
            { name: 'Flugerlebnisse', path: '/flugerlebnisse/' },
            { name: 'Taxiflug', path: '/flugerlebnisse/taxiflug/' },
          ]),
        )}
      />

      <PageHeader
        title="Taxiflug"
        lead="Schnell und direkt ans Ziel, flexibel ab Memmingen oder Friedrichshafen mit der Cessna P210N."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <figure className="mb-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border">
            <Image
              src={taxiflugBild}
              alt="Blick in die Kabine der Cessna P210N während des Flugs, produktives Arbeiten am Tablet über den Wolken"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground">
            Reisezeit sinnvoll nutzen: arbeiten oder entspannen über den Wolken.
          </figcaption>
        </figure>

        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Mit unserem Taxiflug bringen wir Sie flexibel zu Ihrem Wunschziel, abseits von Fahrplänen
            und Umsteigeverbindungen. Sie sagen uns Ziel und Zeitfenster, wir stimmen die Route
            individuell mit Ihnen ab.
          </p>
          <p>
            Mit einer Reisegeschwindigkeit von rund 330 bis 355 km/h (179 bis 191 Knoten) sind Sie
            spürbar schneller am Ziel als auf der Straße. Die Zeit über den Wolken nutzen Sie, wie
            Sie möchten: entspannen oder produktiv arbeiten, in der ruhigen Druckkabine der Cessna
            P210N mit geräuschreduzierten Headsets.
          </p>
          <p>
            Ob Geschäftstermin, Anschlussflug oder privater Anlass: Der Taxiflug passt sich Ihrem
            Tag an, nicht umgekehrt.
          </p>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-2">
          {eckdaten.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <div>
                <dt className="font-heading text-sm font-semibold">{label}</dt>
                <dd className="mt-0.5 text-sm text-muted-foreground">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-lg border border-border bg-secondary/40 p-6">
          <p className="text-muted-foreground">
            Sagen Sie uns Ziel, Datum und Personenzahl, wir erstellen Ihnen ein individuelles Angebot.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="accent">
              <Link href="/kontakt/anfrage/">Anfrage senden</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/kontakt/">Kontakt</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
