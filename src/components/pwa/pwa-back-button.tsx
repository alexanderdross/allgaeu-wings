'use client';

// Zurueck-Button fuer den Header, nur sichtbar, wenn die Seite als installierte /
// standalone PWA laeuft (die hat kein Browser-Chrome, ein Nutzer, der in eine
// Unterseite navigiert, kaeme sonst nicht zurueck). Er sitzt links vom Logo, ist
// versteckt, wenn es nichts zum Zurueckgehen gibt, und ruft nur history.back().
// Im normalen Browser rendert er null, das Header-HTML bleibt also unveraendert
// (dieselbe selbst-gatende null-Logik wie in drossnet).
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { isStandalone } from './standalone';
import { navBackLabel } from './nav-back-label';

export function PwaBackButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Bei jeder Navigation neu bewerten: nur in der Standalone-PWA und nur, wenn es
  // eine Vorgeschichte gibt, zu der man zurueckkehren kann.
  useEffect(() => {
    setVisible(isStandalone() && window.history.length > 1);
  }, [pathname]);

  if (!visible) return null;

  const label = navBackLabel(pathname || '/');

  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      aria-label={label}
      title={label}
      className="-ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-primary-foreground/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
