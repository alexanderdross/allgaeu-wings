// Team — belegt aus extract/html/wer-wir-sind.html.

export interface TeamMitglied {
  name: string;
  rolle: string;
  qualifikation: string;
  email: string;
}

export const team: TeamMitglied[] = [
  {
    name: 'Heiko Böhmer',
    rolle: 'Geschäftsführer',
    qualifikation: 'Pilot und Dipl. Betriebswirt (FH)',
    email: 'Heiko.Boehmer@Allgaeu-Wings.de',
  },
  {
    name: 'Thomas Daubner',
    rolle: 'Geschäftsführer & Ground Operations Manager',
    qualifikation: 'Pilot und Ingenieur Luft- und Raumfahrttechnik',
    email: 'Thomas.Daubner@Allgaeu-Wings.de',
  },
  {
    name: 'Michael Orf',
    rolle: 'Flugbetriebsleiter',
    qualifikation: 'Pilot und Dipl. Ing. Luft- und Raumfahrt',
    email: 'Michael.Orf@Allgaeu-Wings.de',
  },
];
