import Link from 'next/link';
import { footerNav } from '@/lib/nav';
import { business } from '@/data/business';

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-bold tracking-wide">ALLGÄU WINGS</p>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Alpen-Rundflüge mit der Cessna P210N ab Memmingen und Friedrichshafen.
            </p>
            <p className="mt-4 text-sm text-primary-foreground/70">
              {business.street}
              <br />
              {business.zip} {business.city}
              <br />
              <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="hover:text-white">
                {business.phone}
              </a>
            </p>
          </div>

          {Object.values(footerNav).map((col) => (
            <div key={col.title}>
              <p className="font-heading text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1e1f26]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-primary-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {business.name}</p>
          <nav className="flex gap-4" aria-label="Rechtliches">
            <Link href="/rechtliches/impressum/" className="hover:text-white">Impressum</Link>
            <Link href="/rechtliches/datenschutz/" className="hover:text-white">Datenschutz</Link>
            <Link href="/rechtliches/agb/" className="hover:text-white">AGB</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
