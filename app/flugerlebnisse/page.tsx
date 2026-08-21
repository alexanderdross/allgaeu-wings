import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Flugerlebnisse',
  description: 'Taxiflug, A320 Flugsimulator und Flugangstseminar bei Allgäu Wings.',
  alternates: { canonical: '/flugerlebnisse/' },
};

const erlebnisse = [
  { title: 'Taxiflug', href: '/flugerlebnisse/taxiflug/', text: 'Schnell und direkt ans Ziel, individuell auf Anfrage.' },
  { title: 'A320 Flugsimulator', href: '/flugerlebnisse/a320-flugsimulator/', text: 'Selbst am Steuer eines Airbus A320, mit Instruktor.' },
  { title: 'Flugangstseminar', href: '/flugerlebnisse/flugangstseminar/', text: 'Flugangst verstehen und überwinden.' },
];

export default function FlugerlebnissePage() {
  return (
    <>
      <PageHeader title="Flugerlebnisse" lead="Mehr als Rundflüge, Simulator und Flugangstseminar." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {erlebnisse.map((e) => (
            <Link key={e.href} href={e.href} className="group rounded-lg border border-border bg-card p-8 transition-shadow hover:shadow-lg">
              <h2 className="font-heading text-xl font-semibold group-hover:text-accent">{e.title}</h2>
              <p className="mt-3 text-muted-foreground">{e.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
