import { PageHeader } from '@/components/page-header';

/** Platzhalterseite für Inhalte, die in einer späteren Phase gebaut werden. */
export function StubPage({ title, lead, note }: { title: string; lead?: string; note?: string }) {
  return (
    <>
      <PageHeader title={title} lead={lead} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="rounded-lg border border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
          {note ?? 'Diese Seite wird in einer späteren Phase mit Inhalten gefüllt (siehe docs/10-roadmap.md).'}
        </p>
      </section>
    </>
  );
}
