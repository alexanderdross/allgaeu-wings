import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Vielen Dank für Ihre Buchung',
  robots: 'noindex',
};

export default function DankePage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <CheckCircle2 className="h-16 w-16 text-accent" aria-hidden />
      <h1 className="mt-6 font-heading text-3xl font-bold">Vielen Dank für Ihre Buchung!</h1>
      <p className="mt-4 text-muted-foreground">
        Ihre Zahlung war erfolgreich. Sie erhalten in Kürze eine Bestätigung per E-Mail. Wir stimmen
        den Flugtermin anschließend gemeinsam mit Ihnen ab, Rundflüge sind wetterabhängig.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="accent">
          <Link href="/">Zur Startseite</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/rundfluege/">Weitere Rundflüge</Link>
        </Button>
      </div>
    </section>
  );
}
