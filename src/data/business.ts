// Firmenidentität — belegt aus Impressum + Extraktion (extract/html/impressum.html).
// Siehe docs/00-konzept.md.

export const business = {
  name: 'Allgäu Wings GmbH',
  shortName: 'Allgäu Wings',
  street: 'Am Postwäldle 8',
  zip: '88171',
  city: 'Weiler-Simmerberg',
  country: 'DE',
  vatId: 'DE299519907',
  managingDirectors: ['Heiko Böhmer', 'Thomas Daubner'],
  // Buchungstelefon (extract: /rundfluege/). Zentrale laut Impressum: 08387 391-0.
  phone: '+49 8387 3924328',
  phoneCentral: '+49 8387 391-0',
  email: 'info@allgaeu-wings.de', // TODO: aus Impressum bestätigen
  siteUrl: 'https://www.allgaeu-wings.de',
  social: {
    instagram: 'https://www.instagram.com/allgaeuwings/',
    facebook: 'https://www.facebook.com/AllgaeuWings/',
  },
} as const;
