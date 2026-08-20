import Link from 'next/link';
import { Plane, Users, Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RundflugCard } from '@/components/rundflug-card';
import { rundfluege, standorte } from '@/data/flights';

// Organization/WebSite-JSON-LD wird sitewide über SiteJsonLd (app/layout.tsx) gesetzt.

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[#0d2a4a] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
            Ab Memmingen &amp; Friedrichshafen
          </span>
          <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Die Alpen aus der Luft erleben
          </h1>
          <p className="max-w-2xl text-lg text-white/80">
            Rundflüge zur Zugspitze, zum Matterhorn und Mont Blanc, über Bodensee, Dolomiten und
            Gardasee — an Bord der Cessna P210N mit Druckkabine.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href="/rundfluege/">
                Rundflug buchen <ChevronRight className="h-5 w-5" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href="/kontakt/">Beraten lassen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust-Zeile */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: Plane, title: 'Cessna P210N', text: 'Druckkabine für hochalpine Flüge' },
            { icon: Users, title: 'Bis zu 3 Gäste', text: 'Ab 4 Personen das Flugzeug für sich' },
            { icon: Award, title: '2 Standorte', text: 'Memmingen & Friedrichshafen' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon className="h-8 w-8 shrink-0 text-accent" aria-hidden />
              <div>
                <p className="font-heading font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ziele */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="ziele-heading">
        <div className="mb-10 max-w-2xl">
          <h2 id="ziele-heading" className="font-heading text-3xl font-bold">Unsere Rundflüge</h2>
          <p className="mt-3 text-muted-foreground">
            Von der Zugspitze bis zum Mont Blanc — wählen Sie Ihr Ziel und buchen Sie online.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rundfluege.map((flug) => (
            <RundflugCard key={flug.slug} flug={flug} />
          ))}
        </div>
      </section>

      {/* Standorte */}
      <section className="bg-secondary/40" aria-labelledby="standorte-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 id="standorte-heading" className="mb-10 font-heading text-3xl font-bold">Unsere Standorte</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {standorte.map((s) => (
              <Link
                key={s.id}
                href={`/standorte/${s.id}/`}
                className="group rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-semibold group-hover:text-accent">{s.name}</h3>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">{s.icao}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{s.airport}</p>
                <p className="mt-3 text-sm text-muted-foreground">{s.beschreibung}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold">Verschenken Sie ein Flugerlebnis</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Rundflug-Gutscheine sind das perfekte Geschenk — flexibel einlösbar und drei Jahre gültig.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="accent" size="lg">
              <Link href="/gutscheine/">Zu den Gutscheinen</Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href="/kontakt/">Kontakt aufnehmen</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
