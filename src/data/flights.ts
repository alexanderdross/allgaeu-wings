// Datenmodell für Rundflüge, Standorte und Flugzeug.
// Single Source of Truth (siehe docs/03-informationsarchitektur.md, docs/07-shop-stripe.md).
//
// Preise/Dauern belegt aus extract/shop/produkte.md (Regiondo, Vendor 11122, Stand 20.08.2026).
// Personenzahl je Flug und die Preis-Diskrepanz (Regiondo 489 € vs. WP „444 € p. P.")
// sind mit dem Betrieb zu klären, siehe docs/07-shop-stripe.md §2.1.

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
  /** Flughafen-Koordinaten (öffentlich, für LocalBusiness-geo). */
  geo: { lat: number; lng: number };
}

export interface Rundflug {
  slug: string;
  name: string;
  region: string;
  standortId: string;
  kurzbeschreibung: string;
  /** Ausführliche Beschreibung (Absätze) für die Detailseite. */
  beschreibung: string[];
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
    geo: { lat: 47.9888, lng: 10.2395 },
  },
  {
    id: 'friedrichshafen',
    name: 'Friedrichshafen',
    airport: 'Bodensee-Airport Friedrichshafen',
    icao: 'EDNY',
    region: 'Bodensee',
    beschreibung:
      'Abflug direkt am Bodensee, ideal für Bodensee-Rundflüge und den Einstieg in die Alpen von Westen.',
    geo: { lat: 47.6713, lng: 9.5115 },
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
      'Durch die Allgäuer Bergwelt zur Zugspitze, Deutschlands höchstem Gipfel, mit Blick auf Neuschwanstein.',
    beschreibung: [
      'Steigen Sie ein und fliegen Sie mit uns durch die Allgäuer Bergwelt hin zum höchsten Berg Deutschlands, der Zugspitze. Je nach Jahreszeit entdecken Sie Wanderer beim Aufstieg oder Skifahrer bei der Abfahrt, dazu Alpenseen und den Fernpass als Kulisse für Ihren ganz besonderen Tag an Bord.',
      'Ein Höhepunkt der Route ist das Schloss Neuschwanstein aus der Vogelperspektive. Erst aus der Luft offenbart sich, wie traumhaft die Lage des Märchenschlosses von König Ludwig II. wirklich ist, ein Anblick, der aus keiner anderen Perspektive so wirkt.',
    ],
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
    beschreibung: [
      'Fliegen Sie vorbei an den Allgäuer Alpen und entlang der Küste einmal um den Bodensee. Sie erkunden die Facetten aller drei Bodenseeländer und genießen den Blick auf das dahinterliegende Alpenpanorama mit markanten Bergen wie dem Säntis, rundum, 360 Grad.',
      'Der Bodensee besticht durch seine berühmten Inseln, sein Alpenpanorama und seine Geschichte: Als Heimat des Zeppelins und der Firma Dornier hält die Region besondere Attraktionen bereit. Mit etwas Glück begegnen Sie dem Zeppelin sogar auf Augenhöhe.',
    ],
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
    beschreibung: [
      'Von Memmingen aus geht es über Neuschwanstein, Reutte und den Fernpass ins Inntal und weiter an der Nordkante der Ötztaler Alpen entlang. Der Rückflug führt Sie durch den Bregenzer Wald.',
      'Die einmalige Landschaft der Alpengletscher bildet die Kulisse für Ihren besonderen Tag. Egal zu welcher Jahreszeit, der Ötztal Rundflug ist immer ein faszinierendes Erlebnis.',
    ],
    name: 'Ötztal Rundflug',
    region: 'Tiroler Alpen',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Über den Alpenhauptkamm ins Ötztal, hochalpine Gletscherwelt und Tiroler Dreitausender.',
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
    beschreibung: [
      'Von Memmingen aus geht es über den Forggensee und Schloss Neuschwanstein durch das Inntal zum Großglockner. Auf diesem Flug warten gleich mehrere Highlights der deutschen und österreichischen Alpenwelt auf Sie.',
      'Nach dem Schloss Neuschwanstein aus der Luft führt die Route weiter zur Zugspitze und durch das Inntal zum höchsten Berg Österreichs, dem Großglockner, wo der Pilot einige Kreise zieht. Ein großartiger Ausblick auf Innsbruck ist inklusive.',
    ],
    name: 'Großglockner Rundflug',
    region: 'Hohe Tauern',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Zum höchsten Berg Österreichs, der Großglockner und die vergletscherte Welt der Hohen Tauern.',
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
    beschreibung: [
      'Fliegen Sie entlang der Berge zwischen Bodensee und Rheintal dem Sinnbild der Schweizer Alpen entgegen. Die Kulisse besteht aus schroffen Gebirgsformationen, ewigen Gletschern und Seen, beim Matterhorn Rundflug erleben Sie alles, was die Alpen zu bieten haben.',
      'Rund um den einzigartigen Gipfel zu kreisen begeistert unsere Gäste immer wieder, ein einmaliges Erlebnis über der Alpenlandschaft der Schweiz.',
    ],
    name: 'Matterhorn Rundflug',
    region: 'Walliser Alpen',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Über die Alpen zum berühmtesten Berg der Welt, das Matterhorn und die Viertausender des Wallis.',
    highlights: ['Matterhorn', 'Walliser Viertausender', 'Alpenüberquerung', 'Schweizer Hochgebirge'],
    flugzeitMin: 140,
    preis: 489,
    regiondoId: 21508,
    kategorie: 'alpen',
  },
  {
    slug: 'mont-blanc',
    bild: bildMontBlanc,
    beschreibung: [
      'Fliegen Sie entlang der Berge zwischen Bodensee und Rheintal dem Dach Europas entgegen. Beim Mont Blanc Rundflug erwartet Sie eine Kulisse aus schroffen Gebirgsformationen, Gletschern und Seen.',
      'Dieser Rundflug zeigt Ihnen die eindrucksvollen und verschiedensten Gesichter der Alpen mehrerer Länder. Nach dem Start in Memmingen erkunden Sie schon kurz nach dem Abheben die Schönheit der Allgäuer Bergwelt, auf dem Weg zum höchsten Berg der Alpen.',
    ],
    name: 'Mont Blanc Rundflug',
    region: 'Savoyer Alpen',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Zum höchsten Berg der Alpen, knapp dreistündiger Flug ab Memmingen zum Mont Blanc.',
    highlights: ['Mont Blanc 4.808 m', 'Savoyer Alpen', 'Alpenüberquerung', 'Gletscherpanorama'],
    flugzeitMin: 150,
    preis: 489,
    regiondoId: 21489,
    kategorie: 'alpen',
  },
  {
    slug: 'dolomiten-gardasee',
    bild: bildDolomitenGardasee,
    beschreibung: [
      'Bei unserem Dolomiten Gardasee Rundflug überqueren Sie den Alpenhauptkamm und gelangen auf die südländische Seite der Alpen. Die Dolomiten bilden ein ganz besonderes Bergpanorama, nicht umsonst UNESCO-Weltnaturerbe.',
      'Und wenn man schon auf der Südseite ist, darf der Gardasee nicht fehlen: Hier begegnen sich Alpen und mediterrane Kultur. Der Flug durchs Tal mit Blick auf die italienischen Städte und Dörfer ist ein unvergessliches Erlebnis.',
    ],
    name: 'Dolomiten & Gardasee Rundflug',
    region: 'Südtirol & Gardasee',
    standortId: 'memmingen',
    kurzbeschreibung:
      'Über den Alpenhauptkamm auf die Südseite der Alpen, Dolomiten-Gipfel und der Gardasee.',
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
    'Die Cessna P210N Pressurized Centurion ist ein Hochleistungs-Reiseflugzeug mit Druckkabine, ' +
    'ideal für hochalpine Rundflüge, weil sie komfortabel über die Alpengipfel steigt.',
  specs: [
    { label: 'Typ', value: 'Hochdecker mit Druckkabine' },
    { label: 'Passagiere', value: 'bis zu 3' },
    { label: 'Reisegeschwindigkeit', value: 'rund 330 bis 355 km/h (179 bis 191 kn)' },
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
