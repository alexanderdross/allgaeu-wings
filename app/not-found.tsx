import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="font-heading text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold">Seite nicht gefunden</h1>
      <p className="mt-3 text-muted-foreground">
        Diese Seite gibt es nicht (mehr). Vielleicht finden Sie Ihren Rundflug hier:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="accent">
          <Link href="/rundfluege/">Zu den Rundflügen</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Zur Startseite</Link>
        </Button>
      </div>
    </section>
  );
}
