// Baut die <link rel="apple-touch-startup-image">-Deskriptoren fuer iOS-Launch-
// Screens. Geraeteliste = Single Source of Truth in scripts/ios-splash-devices.json
// (dieselbe Datei nutzt der Generator scripts/generate-ios-splash.mjs). Format der
// media-Query wie bei pwa-asset-generator: device-width/-height bleiben die
// Portraet-CSS-Punkte, unterschieden wird nur ueber (orientation: ...).
import devicesData from '../../scripts/ios-splash-devices.json';

interface Device {
  label: string;
  cssW: number;
  cssH: number;
  dpr: number;
}

const devices = devicesData.devices as Device[];

/** Dateiname exakt wie in scripts/generate-ios-splash.mjs (Konvention: Pixelmasse). */
function fileName(w: number, h: number): string {
  return `apple-splash-${w}-${h}.png`;
}

export interface IosSplashLink {
  media: string;
  href: string;
}

export function iosSplashLinks(): IosSplashLink[] {
  const links: IosSplashLink[] = [];
  const seen = new Set<string>();

  for (const d of devices) {
    const base =
      `(device-width: ${d.cssW}px) and (device-height: ${d.cssH}px) ` +
      `and (-webkit-device-pixel-ratio: ${d.dpr})`;
    const pw = d.cssW * d.dpr;
    const ph = d.cssH * d.dpr;

    const portrait = `${base} and (orientation: portrait)`;
    const landscape = `${base} and (orientation: landscape)`;

    if (!seen.has(portrait)) {
      links.push({ media: portrait, href: `/splash/${fileName(pw, ph)}` });
      seen.add(portrait);
    }
    if (!seen.has(landscape)) {
      links.push({ media: landscape, href: `/splash/${fileName(ph, pw)}` });
      seen.add(landscape);
    }
  }

  return links;
}
