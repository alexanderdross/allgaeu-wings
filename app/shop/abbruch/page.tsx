import type { Metadata } from 'next';
import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Buchung abgebrochen',
  robots: 'noindex',
};

export default function AbbruchPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <XCircle className="h-16 w-16 text-muted-foreground" aria-hidden />
      <h1 className="mt-6 font-heading text-3xl font-bold">Buchung abgebrochen</h1>
      <p className="mt-4 text-muted-foreground">
        Es wurde nichts berechnet. Sie können den Rundflug jederzeit erneut buchen oder uns eine
        Anfrage senden.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="accent">
          <Link href="/rundfluege/">Zurück zu den Rundflügen</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/kontakt/anfrage/">Anfrage senden</Link>
        </Button>
      </div>
    </section>
  );
}
