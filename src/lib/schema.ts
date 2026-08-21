import { business } from '@/data/business';

const BASE = business.siteUrl;

/** BreadcrumbList-JSON-LD aus einer Liste von [Name, Pfad]-Paaren. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}

/** FAQPage-JSON-LD aus Frage/Antwort-Paaren. */
export function faqJsonLd(faqs: { frage: string; antwort: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.frage,
      acceptedAnswer: { '@type': 'Answer', text: f.antwort },
    })),
  };
}

/** Stabile, absolute URL des Kartenmotivs eines Rundflugs (fuer Schema/OG). */
export function flugBildUrl(slug: string): string {
  return `${BASE}/img/rundfluege/${slug}.jpg`;
}

/** TouristAttraction-JSON-LD fuer eine Rundflug-Route. */
export function touristAttractionJsonLd(flug: {
  slug: string;
  name: string;
  region: string;
  kurzbeschreibung: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: flug.name,
    description: flug.kurzbeschreibung,
    image: flugBildUrl(flug.slug),
    url: `${BASE}/rundfluege/${flug.slug}/`,
    touristType: 'Rundflug-Gaeste',
    isAccessibleForFree: false,
    provider: { '@type': 'Organization', name: business.name, url: BASE },
  };
}

/** Kleiner Helfer, um JSON-LD als <script> einzubetten. */
export function jsonLdScript(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data) };
}
