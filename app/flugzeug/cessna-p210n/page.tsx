import type { Metadata } from 'next';
import Link from 'next/link';
import { Plane } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { flugzeug } from '@/data/flights';

export const metadata: Metadata = {
  title: 'Cessna P210N — unser Flugzeug für Alpen-Rundflüge',
  description:
    'Die Cessna P210N Pressurized Centurion mit Druckkabine: das Reiseflugzeug für komfortable, ' +
    'hochalpine Rundflüge über die Alpen.',
  alternates: { canonical: '/flugzeug/cessna-p210n/' },
};

export default function FlugzeugPage() {
  return (
    <>
      <PageHeader title={flugzeug.name} lead={flugzeug.typ} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <p className="text-lg text-muted-foreground">{flugzeug.beschreibung}</p>
          <div className="mt-8 flex aspect-[16/9] items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[#2a5a8f]">
            <Plane className="h-16 w-16 text-white/80" aria-hidden />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Bildmaterial folgt in Phase 2 (Motive in extract/assets vorhanden).
          </p>
        </div>
        <aside>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold">Technische Daten</h2>
            <dl className="mt-4 space-y-3">
              {flugzeug.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between border-b border-border pb-2 text-sm">
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="accent" className="mt-6 w-full">
              <Link href="/rundfluege/">Rundflug wählen</Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  );
}
