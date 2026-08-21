// Navigationsstruktur, siehe docs/03-informationsarchitektur.md.

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Rundflüge',
    href: '/rundfluege/',
    children: [
      { label: 'Alle Rundflüge', href: '/rundfluege/' },
      { label: 'Zugspitze', href: '/rundfluege/zugspitze/' },
      { label: 'Bodensee', href: '/rundfluege/bodensee/' },
      { label: 'Matterhorn', href: '/rundfluege/matterhorn/' },
      { label: 'Mont Blanc', href: '/rundfluege/mont-blanc/' },
      { label: 'Dolomiten & Gardasee', href: '/rundfluege/dolomiten-gardasee/' },
    ],
  },
  {
    label: 'Standorte',
    href: '/standorte/',
    children: [
      { label: 'Alle Standorte', href: '/standorte/' },
      { label: 'Memmingen', href: '/standorte/memmingen/' },
      { label: 'Friedrichshafen', href: '/standorte/friedrichshafen/' },
    ],
  },
  { label: 'Flugzeug', href: '/flugzeug/cessna-p210n/' },
  {
    label: 'Flugerlebnisse',
    href: '/flugerlebnisse/',
    children: [
      { label: 'A320 Flugsimulator', href: '/flugerlebnisse/a320-flugsimulator/' },
      { label: 'Flugangstseminar', href: '/flugerlebnisse/flugangstseminar/' },
    ],
  },
  { label: 'Gutscheine', href: '/gutscheine/' },
  { label: 'Über uns', href: '/ueber-uns/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

export const footerNav = {
  rundfluege: {
    title: 'Rundflüge',
    links: [
      { label: 'Zugspitze', href: '/rundfluege/zugspitze/' },
      { label: 'Bodensee', href: '/rundfluege/bodensee/' },
      { label: 'Matterhorn', href: '/rundfluege/matterhorn/' },
      { label: 'Mont Blanc', href: '/rundfluege/mont-blanc/' },
      { label: 'Dolomiten & Gardasee', href: '/rundfluege/dolomiten-gardasee/' },
    ],
  },
  erlebnisse: {
    title: 'Mehr',
    links: [
      { label: 'Flugzeug Cessna P210N', href: '/flugzeug/cessna-p210n/' },
      { label: 'A320 Flugsimulator', href: '/flugerlebnisse/a320-flugsimulator/' },
      { label: 'Flugangstseminar', href: '/flugerlebnisse/flugangstseminar/' },
      { label: 'Gutscheine', href: '/gutscheine/' },
    ],
  },
  rechtliches: {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/rechtliches/impressum/' },
      { label: 'Datenschutz', href: '/rechtliches/datenschutz/' },
      { label: 'AGB', href: '/rechtliches/agb/' },
      { label: 'Widerruf', href: '/rechtliches/widerruf/' },
    ],
  },
};
