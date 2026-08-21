import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Sichtbare Brotkrumen fuer tiefe Seiten (Index-Hygiene und Orientierung,
// docs/11-verbesserungsplan.md A8). Nimmt dieselbe [Name, Pfad]-Liste wie
// breadcrumbJsonLd, damit sichtbare und strukturierte Navigation deckungsgleich
// bleiben. Das letzte Element ist die aktuelle Seite (kein Link).
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Brotkrumen" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
              {last ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-accent">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
