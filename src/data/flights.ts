// Datenmodell für Rundflüge, Standorte und Flugzeug.
// Single Source of Truth (siehe docs/03-informationsarchitektur.md, docs/07-shop-stripe.md).
//
// Preise/Dauern belegt aus extract/shop/produkte.md (Regiondo, Vendor 11122, Stand 20.08.2026).
// Personenzahl je Flug und die Preis-Diskrepanz (Regiondo 489 € vs. WP „444 € p. P.")
// sind mit dem Betrieb zu klären — siehe docs/07-shop-stripe.md §2.1.

import type { StaticImageData } from 'next/image';

// Statische Bild-Importe: Next.js liefert Breite/Höhe + Blur-Placeholder automatisch
// (siehe https://nextjs.org/docs/app/getting-started/images). Motive: Original-Fotos
// der Alt-Seite bzw. Regiondo-Produktbilder (Vendor 11122), 600×400.
import bildZugspitze from '../../public/img/rundfluege/zugspitze.jpg';
import bildBodensee from '../../public/img/rundfluege/bodensee.jpg';
import bildOetztal from '../../public/img/rundfluege/oetztal.jpg';
import bildGrossglockner from '../../public/img/rundfluege/grossglockner.jpg';
import bildMatterhorn from '../../public/img/rundfluege/matterhorn.jpg';
import bildMontBlanc from '../../public/img/rundfluege/mont-blanc.jpg';
import bildDolomitenGardasee from '../../public/img/rundfluege/dolomiten-gardasee.jpg';

export type Kategorie = 'alpen' | 'see' | 'berg' | 'wunsch';

export interface Standort {
  id: string;
  name: string;
  airport: string;
  icao: string;
  region: string;
  beschreibung: string;
}

export interface Rundflug {
  slug: string;
  name: string;
  region: string;
  standortId: string;
  kurzbeschreibung: string;
  highlights: string[];
  flugzeitMin: number;
  /** Preis in Euro (ganze Buchung, Regiondo). */
  preis: number;
  /** Regiondo-Produkt-ID (Migration/Referenz). */
  regiondoId?: number;
  kategorie: Kategorie;
  popular?: boolean;
  /** Noch ohne belegte GSC-Nachfrage, aber als Regiondo-Produkt vorhanden. */
  neu?: boolean;
  /** Kartenmotiv (600×400), statisch importiert für automatische Größen + Blur-Placeholder. */
  bild: StaticImageData;
}

export interface Flugzeug {
  slug: string;
  name: string;
  typ: string;
  maxPassagiere: number;
  specs: { label: string; value: string }[];
  beschreibung: string;
}

export const standorte: Standort[] = [
  {
    id: 'memmingen',
    name: 'Memmingen',
    airport: 'Allgäu Airport Memmingen',
    icao: 'EDJA',
    region: 'Allgäu',
    beschreibung:
      'Unser Hauptabflugort im Allgäu. Von hier starten die Alpen-Rundflüge Richtung Zugspitze, Alpenhauptkamm und Süden.',
  },
  {
    id: 'friedrichshafen',
    name: 'Friedrichshafen',
    airport: 'Bodensee-Airport Friedrichshafen',
    icao: 'EDNY',
    region: 'Bodensee',
    beschreibung:
      'Abflug direkt am Bodensee — ideal für Bodensee-Rundflüge und den Einstieg in die Alpen von Westen.',
  },
];

export const rundfluege: Rundflug[] = [
  {
    slug: 'zugspitze',
    bild: bildZugspitze,
    name: 'Zugspitze Rundflug',
    region: 'Allgäu & Zugspitze',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Durch die Allgäuer Bergwelt zur Zugspitze, Deutschlands höchstem Gipfel — mit Blick auf Neuschwanstein.',
    highlights: ['Zugspitze aus der Luft', 'Allgäuer Alpen', 'Schloss Neuschwanstein', 'Bergkämme bei Oberstdorf'],
    flugzeitMin: 60,
    preis: 249,
    regiondoId: 21507,
    kategorie: 'berg',
    popular: true,
  },
  {
    slug: 'bodensee',
    bild: bildBodensee,
    name: 'Bodensee Rundflug',
    region: 'Bodensee & Alpenvorland',
    standortId: 'friedrichshafen',
    kurzbeschreibung:
      'Über den Bodensee mit Blick auf drei Länder, die Inseln Mainau und Lindau und die Alpenkette im Süden.',
    highlights: ['Bodensee-Panorama', 'Insel Mainau & Lindau', 'Dreiländerblick', 'Alpenkette'],
    flugzeitMin: 60,
    preis: 249,
    regiondoId: 21506,
    kategorie: 'see',
    popular: true,
  },
  {
    slug: 'oetztal',
    bild: bildOetztal,
    name: 'Ötztal Rundflug',
    region: 'Tiroler Alpen',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Über den Alpenhauptkamm ins Ötztal — hochalpine Gletscherwelt und Tiroler Dreitausender.',
    highlights: ['Ötztaler Alpen', 'Gletscher', 'Alpenhauptkamm', 'Tiroler Bergwelt'],
    flugzeitMin: 80,
    preis: 329,
    regiondoId: 163942,
    kategorie: 'alpen',
    neu: true,
  },
  {
    slug: 'grossglockner',
    bild: bildGrossglockner,
    name: 'Großglockner Rundflug',
    region: 'Hohe Tauern',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Zum höchsten Berg Österreichs — der Großglockner und die vergletscherte Welt der Hohen Tauern.',
    highlights: ['Großglockner 3.798 m', 'Pasterze-Gletscher', 'Hohe Tauern', 'Hochalpines Panorama'],
    flugzeitMin: 100,
    preis: 399,
    regiondoId: 21540,
    kategorie: 'alpen',
    neu: true,
  },
  {
    slug: 'matterhorn',
    bild: bildMatterhorn,
    name: 'Matterhorn Rundflug',
    region: 'Walliser Alpen',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Über die Alpen zum berühmtesten Berg der Welt — das Matterhorn und die Viertausender des Wallis.',
    highlights: ['Matterhorn', 'Walliser Viertausender', 'Alpenüberquerung', 'Schweizer Hochgebirge'],
    flugzeitMin: 140,
    preis: 489,
    regiondoId: 21508,
    kategorie: 'alpen',
  },
  {
    slug: 'mont-blanc',
    bild: bildMontBlanc,
    name: 'Mont Blanc Rundflug',
    region: 'Savoyer Alpen',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Zum höchsten Berg der Alpen — knapp dreistündiger Flug ab Memmingen zum Mont Blanc.',
    highlights: ['Mont Blanc 4.808 m', 'Savoyer Alpen', 'Alpenüberquerung', 'Gletscherpanorama'],
    flugzeitMin: 150,
    preis: 489,
    regiondoId: 21489,
    kategorie: 'alpen',
  },
  {
    slug: 'dolomiten-gardasee',
    bild: bildDolomitenGardasee,
    name: 'Dolomiten & Gardasee Rundflug',
    region: 'Südtirol & Gardasee',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Über den Alpenhauptkamm auf die Südseite der Alpen — Dolomiten-Gipfel und der Gardasee.',
    highlights: ['Dolomiten', 'Gardasee', 'Südseite der Alpen', 'Panorama-Mix Berg & See'],
    flugzeitMin: 150,
    preis: 489,
    regiondoId: 21505,
    kategorie: 'see',
  },
];

export const flugzeug: Flugzeug = {
  slug: 'cessna-p210n',
  name: 'Cessna P210N',
  typ: 'Einmotoriges Reiseflugzeug mit Druckkabine',
  maxPassagiere: 3, // TODO: mit Betrieb bestätigen
  beschreibung:
    'Die Cessna P210N Pressurized Centurion ist ein Hochleistungs-Reiseflugzeug mit Druckkabine — ' +
    'ideal für hochalpine Rundflüge, weil sie komfortabel über die Alpengipfel steigt.',
  specs: [
    { label: 'Typ', value: 'Hochdecker mit Druckkabine' },
    { label: 'Passagiere', value: 'bis zu 3' },
    { label: 'Einsatz', value: 'Alpen-Rundflüge, Charter, IFR' },
  ],
};

export function getRundflug(slug: string): Rundflug | undefined {
  return rundfluege.find((r) => r.slug === slug);
}

export function getStandort(id: string): Standort | undefined {
  return standorte.find((s) => s.id === id);
}

export function formatPreis(preis: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(preis);
}

export function formatDauer(min: number): string {
  return `ca. ${min} min`;
}

export const kategorieLabels: Record<Kategorie, string> = {
  alpen: 'Über die Alpen',
  berg: 'Berge & Gipfel',
  see: 'Seen & Süden',
  wunsch: 'Wunschrundflug',
};

/** Rundflüge nach Kategorie gruppiert, in fester Reihenfolge. */
export function rundfluegeNachKategorie(): { kategorie: Kategorie; label: string; fluege: Rundflug[] }[] {
  const order: Kategorie[] = ['berg', 'alpen', 'see', 'wunsch'];
  return order
    .map((kategorie) => ({
      kategorie,
      label: kategorieLabels[kategorie],
      fluege: rundfluege.filter((f) => f.kategorie === kategorie),
    }))
    .filter((group) => group.fluege.length > 0);
}
