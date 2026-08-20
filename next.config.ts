import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Deckungsgleich mit den WordPress-Alt-URLs; hält die 301-Redirects sauber.
  trailingSlash: true,

  images: {
    // Auf Cloudflare Workers gibt es keinen Vercel-Bildoptimierer. Ein eigener
    // Loader steuert die Bild-URLs: standardmäßig das Original, mit
    // NEXT_PUBLIC_CF_IMAGE_TRANSFORMATIONS=true die /cdn-cgi/image/... -URLs.
    loader: 'custom',
    loaderFile: './image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
  },

  // 301-Redirects der rankenden Alt-URLs → siehe docs/06-redirect-map.md.
  // Alle destination-Werte mit abschließendem Slash (trailingSlash: true), um
  // Redirect-Ketten (301 → 308-Slash-Normalisierung) zu vermeiden.
  async redirects() {
    return [
      // Shop-Seiten → Ziel = Produkt
      { source: '/rundflug-shop/zugspitze-rundflug', destination: '/rundfluege/zugspitze/', permanent: true },
      { source: '/rundflug-shop/dolomiti-gardasee-rundflug', destination: '/rundfluege/dolomiten-gardasee/', permanent: true },
      { source: '/rundflug-shop/matterhorn-rundflug', destination: '/rundfluege/matterhorn/', permanent: true },
      { source: '/rundflug-shop/mont-blanc-rundflug', destination: '/rundfluege/mont-blanc/', permanent: true },
      { source: '/rundflug-shop/bodensee-rundflug', destination: '/rundfluege/bodensee/', permanent: true },
      { source: '/rundflug-shop', destination: '/rundfluege/', permanent: true },
      // Wunschrundflüge → auf reale Seiten (die Ziele oesterreich/schweiz/wunschflug
      // existieren noch nicht als eigene Produktseiten): Österreich → Ötztal
      // (Tiroler Alpen), Schweiz → Matterhorn (Walliser Alpen), Wunsch → Anfrage.
      { source: '/rundfluege/wunschrundfluege/oesterreich_rundflug', destination: '/rundfluege/oetztal/', permanent: true },
      { source: '/rundfluege/wunschrundfluege/rundflug_schweiz', destination: '/rundfluege/matterhorn/', permanent: true },
      { source: '/rundfluege/wunschrundfluege', destination: '/kontakt/anfrage/', permanent: true },
      // Flugzeug / Erlebnisse
      { source: '/cessna-p210n-2', destination: '/flugzeug/cessna-p210n/', permanent: true },
      { source: '/cessna-p210n', destination: '/flugzeug/cessna-p210n/', permanent: true },
      { source: '/a320-flugsimulator', destination: '/flugerlebnisse/a320-flugsimulator/', permanent: true },
      { source: '/flugangstseminar', destination: '/flugerlebnisse/flugangstseminar/', permanent: true },
      // Info-Seiten
      { source: '/wer-wir-sind', destination: '/ueber-uns/', permanent: true },
      { source: '/allgaeu-wings', destination: '/ueber-uns/', permanent: true },
      { source: '/267-2', destination: '/rundfluege/', permanent: true },
      { source: '/267-2/book-a-scenic-flight', destination: '/kontakt/anfrage/', permanent: true },
      { source: '/news-und-aktionen', destination: '/news/', permanent: true },
      { source: '/video', destination: '/galerie/', permanent: true },
      { source: '/rundfluege/rundflugbox', destination: '/gutscheine/', permanent: true },
      { source: '/rundfluege/rundflug-buchen', destination: '/kontakt/anfrage/', permanent: true },
      // Recht
      { source: '/impressum', destination: '/rechtliches/impressum/', permanent: true },
      { source: '/imprint', destination: '/rechtliches/impressum/', permanent: true },
      { source: '/datenschutz', destination: '/rechtliches/datenschutz/', permanent: true },
      { source: '/agb', destination: '/rechtliches/agb/', permanent: true },
      { source: '/downloads/agb.pdf', destination: '/rechtliches/agb/', permanent: true },
      { source: '/cookie-richtlinie-eu', destination: '/rechtliches/datenschutz/', permanent: true },
    ];
  },
};

export default nextConfig;
