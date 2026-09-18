// iOS-Launch-Screens: <link rel="apple-touch-startup-image"> pro Geraet/Orientierung.
// Server-Komponente ohne Client-JS. React hebt die <link>-Tags in den <head>.
// Nur iOS wertet sie aus; andere Browser ignorieren sie. Bilder erzeugt
// `pnpm gen:ios-splash` nach public/splash/.
import { iosSplashLinks } from '@/lib/ios-splash';

export function IosSplashLinks() {
  return (
    <>
      {iosSplashLinks().map((link) => (
        <link
          key={link.media}
          rel="apple-touch-startup-image"
          media={link.media}
          href={link.href}
        />
      ))}
    </>
  );
}
