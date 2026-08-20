import type { Metadata } from 'next';
import { Instagram, Facebook } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'Aktuelles',
  description: 'Neuigkeiten, Aktionen und Termine von Allgäu Wings.',
  alternates: { canonical: '/news/' },
};

export default function NewsPage() {
  return (
    <>
      <PageHeader title="Aktuelles" lead="Neuigkeiten, Aktionen und Termine rund um Allgäu Wings." />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-lg text-muted-foreground">
          Aktuelle Aktionen und Termine geben wir laufend über unsere Social-Media-Kanäle bekannt.
          Folgen Sie uns, um keine Aktion zu verpassen:
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={business.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-medium transition-shadow hover:shadow-md"
          >
            <Instagram className="h-5 w-5 text-accent" aria-hidden /> Instagram
          </a>
          <a
            href={business.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-medium transition-shadow hover:shadow-md"
          >
            <Facebook className="h-5 w-5 text-accent" aria-hidden /> Facebook
          </a>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Redaktionell gepflegte Beiträge folgen in einer späteren Ausbaustufe (siehe
          <code> docs/10-roadmap.md</code>).
        </p>
      </section>
    </>
  );
}
