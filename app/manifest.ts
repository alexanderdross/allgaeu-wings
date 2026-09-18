import type { MetadataRoute } from 'next';

// Web App Manifest (Next generiert daraus /manifest.webmanifest und verlinkt es
// automatisch im <head>). Erst mit dem Manifest ist die Seite installierbar und
// laeuft im display-mode "standalone", worauf PWA-Zurueck-Button und Ladescreen
// aufsetzen. Farben aus dem Design-System (docs/02-design-system.md):
// Marineblau #173f68 (Header/CI) als theme_color und Splash-Hintergrund.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Allgäu Wings, Alpen-Rundflüge',
    short_name: 'Allgäu Wings',
    description:
      'Alpen-Rundflüge mit der Cessna P210N ab Memmingen und Friedrichshafen, ' +
      'A320-Flugsimulator und Flugangstseminare.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    lang: 'de',
    dir: 'ltr',
    background_color: '#173f68',
    theme_color: '#173f68',
    categories: ['travel', 'sports', 'lifestyle'],
    icons: [
      // TODO: 512x512-Icon ergaenzen (aktuell hoechste Aufloesung 192px).
      {
        src: '/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
