// Generiert die iOS-Launch-Screens (apple-touch-startup-image) nach
// public/splash/. iOS zeigt beim Kaltstart einer installierten PWA nur dann ein
// echtes Startbild, wenn ein per media-Query exakt passendes PNG hinterlegt ist,
// sonst bleibt der Screen kurz weiss. Bilder = Marineblau (CI) mit zentriertem
// Logo, deckungsgleich mit dem In-Page-Ladescreen (src/components/pwa/pwa-splash.tsx).
//
// Aufruf: pnpm gen:ios-splash
// Geraeteliste (Single Source of Truth) und die Link-Tags im <head> teilen sich
// scripts/ios-splash-devices.json bzw. src/lib/ios-splash.ts.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const OUT_DIR = join(root, 'public', 'splash');
const LOGO = join(root, 'public', 'logo.png');
const BG = { r: 0x17, g: 0x3f, b: 0x68, alpha: 1 }; // #173f68 Marineblau (CI)

/** Dateiname exakt wie in src/lib/ios-splash.ts (Konvention: Pixelmasse). */
function splashFileName(w, h) {
  return `apple-splash-${w}-${h}.png`;
}

async function renderOne(w, h, logoBuf) {
  // Logo auf ~40% der kurzen Kante, Seitenverhaeltnis erhalten.
  const target = Math.round(Math.min(w, h) * 0.4);
  const logo = await sharp(logoBuf)
    .resize({ width: target, withoutEnlargement: false })
    .png()
    .toBuffer();
  const meta = await sharp(logo).metadata();
  const buf = await sharp({
    create: { width: w, height: h, channels: 4, background: BG },
  })
    .composite([
      {
        input: logo,
        left: Math.round((w - (meta.width ?? target)) / 2),
        top: Math.round((h - (meta.height ?? target)) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(join(OUT_DIR, splashFileName(w, h)), buf);
}

async function main() {
  const { devices } = JSON.parse(
    await readFile(join(here, 'ios-splash-devices.json'), 'utf8'),
  );
  const logoBuf = await readFile(LOGO);
  await mkdir(OUT_DIR, { recursive: true });

  const sizes = new Map(); // dedupe portrait+landscape ueber alle Geraete
  for (const d of devices) {
    const pw = d.cssW * d.dpr;
    const ph = d.cssH * d.dpr;
    sizes.set(`${pw}x${ph}`, [pw, ph]); // Portraet
    sizes.set(`${ph}x${pw}`, [ph, pw]); // Landscape
  }

  let n = 0;
  for (const [w, h] of sizes.values()) {
    await renderOne(w, h, logoBuf);
    n += 1;
  }
  console.log(`iOS-Splash: ${n} Bilder nach public/splash/ geschrieben.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
