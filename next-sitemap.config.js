/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://www.allgaeu-wings.de',
  generateRobotsTxt: true,
  trailingSlash: true,
  generateIndexSitemap: false,
  exclude: ['/shop/danke', '/shop/abbruch', '/api/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/shop/danke', '/shop/abbruch'] }],
  },
};

export default config;
