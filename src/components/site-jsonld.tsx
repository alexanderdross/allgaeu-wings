import { business } from '@/data/business';
import { jsonLdScript } from '@/lib/schema';

// Sitewide Organization + WebSite. Kein SearchAction, es gibt (noch) keine
// Seitensuche, und Schema soll nur echte Funktionen abbilden.
export function SiteJsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${business.siteUrl}/#organization`,
    name: business.name,
    url: business.siteUrl,
    logo: `${business.siteUrl}/logo.png`,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      postalCode: business.zip,
      addressLocality: business.city,
      addressCountry: business.country,
    },
    sameAs: [business.social.instagram, business.social.facebook],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${business.siteUrl}/#website`,
    url: business.siteUrl,
    name: business.shortName,
    inLanguage: 'de-DE',
    publisher: { '@id': `${business.siteUrl}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(organization)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(website)} />
    </>
  );
}
