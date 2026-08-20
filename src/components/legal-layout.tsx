import { PageHeader } from '@/components/page-header';

/** Rahmen für Rechtstexte: Header, Entwurfs-Hinweis und lesbarer Prosa-Container. */
export function LegalLayout({
  title,
  stand,
  children,
}: {
  title: string;
  stand: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="mb-8 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Entwurf – rechtlich zu prüfen.</strong> Dieser Text
          ist ein fachlich noch nicht freigegebener Entwurf für den Neubau und ersetzt keine
          Rechtsberatung. Vor dem Livegang durch eine fachkundige Stelle prüfen lassen
          (siehe <code>docs/08-recht-compliance.md</code>). Stand: {stand}.
        </p>
        <div className="space-y-6 text-sm leading-relaxed [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_a]:text-accent [&_a]:underline">
          {children}
        </div>
      </section>
    </>
  );
}
