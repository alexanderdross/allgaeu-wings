/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://www.allgaeu-wings.de',
  generateRobotsTxt: true,
  trailingSlash: true,
  generateIndexSitemap: false,
  // Dünne/technische Seiten nicht in die Sitemap.
  exclude: ['/shop/danke', '/shop/abbruch', '/kontakt/anfrage', '/api/*'],

  // Kuratierte Prioritäten (docs/04-seo-strategie.md): Startseite > Rundflug-Ziele
  // und -Hub > Standorte > Rest.
  transform: async (config, path) => {
    let priority = 0.6;
    let changefreq = 'monthly';
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path === '/rundfluege/' || path.startsWith('/rundfluege/')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/standorte/') || path.startsWith('/flugzeug/') || path.startsWith('/flugerlebnisse/')) {
      priority = 0.8;
    } else if (path.startsWith('/gutscheine')) {
      priority = 0.7;
    }
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/shop/danke', '/shop/abbruch'] }],
  },
};

export default config;
