import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';
import { PageHeader } from '@/components/page-header';

import heroAlpen from '../../public/img/hero-alpen.jpg';
import cessna from '../../public/img/flugzeug/cessna-p210n.jpg';
import taxiflug from '../../public/img/taxiflug.jpg';
import zugspitze from '../../public/img/rundfluege/zugspitze.jpg';
import bodensee from '../../public/img/rundfluege/bodensee.jpg';
import oetztal from '../../public/img/rundfluege/oetztal.jpg';
import grossglockner from '../../public/img/rundfluege/grossglockner.jpg';
import matterhorn from '../../public/img/rundfluege/matterhorn.jpg';
import montBlanc from '../../public/img/rundfluege/mont-blanc.jpg';
import dolomitenGardasee from '../../public/img/rundfluege/dolomiten-gardasee.jpg';

export const metadata: Metadata = {
  title: 'Galerie, Impressionen aus dem Cockpit',
  description:
    'Impressionen von Rundflügen mit Allgäu Wings: die Cessna P210N über den Alpen, Zugspitze, ' +
    'Matterhorn, Mont Blanc, Bodensee, Dolomiten und Gardasee.',
  alternates: { canonical: '/galerie/' },
};

const bilder: { src: StaticImageData; alt: string }[] = [
  { src: heroAlpen, alt: 'Cessna P210N im Flug über den Dolomiten' },
  { src: cessna, alt: 'Cessna P210N über verschneiten Alpengipfeln im Abendlicht' },
  { src: zugspitze, alt: 'Rundflug über der Zugspitze und den Allgäuer Alpen' },
  { src: matterhorn, alt: 'Das Matterhorn aus der Luft' },
  { src: montBlanc, alt: 'Gletscherwelt am Mont Blanc' },
  { src: grossglockner, alt: 'Aussicht über die Hohen Tauern zum Großglockner' },
  { src: oetztal, alt: 'Sonnenuntergang über den Ötztaler Alpen' },
  { src: dolomitenGardasee, alt: 'Schroffe Gipfel der Dolomiten' },
  { src: bodensee, alt: 'Cessna P210N über dem Bodensee' },
  { src: taxiflug, alt: 'Blick in die Kabine der Cessna P210N während des Flugs' },
];

export default function GaleriePage() {
  return (
    <>
      <PageHeader title="Galerie" lead="Impressionen unserer Alpen-Rundflüge und der Cessna P210N." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bilder.map((bild, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
              <Image
                src={bild.src}
                alt={bild.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
