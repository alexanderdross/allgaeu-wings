'use client';

// Ladescreen fuer die installierte / standalone PWA. Eine Standalone-App zeigt
// beim Kaltstart sonst kurz eine weisse Flaeche (besonders auf iOS, das keinen
// Manifest-Splash rendert). Dieser Overlay wird serverseitig mit ausgeliefert,
// per CSS aber nur im Standalone-Modus sichtbar geschaltet (siehe globals.css,
// `.pwa-splash`), sodass das Browser-Erlebnis unveraendert bleibt. Sobald die
// Seite interaktiv ist, blendet er sich aus und entfernt sich aus dem DOM.
import { useEffect, useState } from 'react';

// Mindestanzeige, damit der Screen bei schnellem Laden nicht kurz aufblitzt.
const MIN_VISIBLE_MS = 350;
// Fade-Dauer, deckungsgleich mit der CSS-Transition in globals.css.
const FADE_MS = 400;
// Sicherheitsnetz: nie laenger als das haengen bleiben, falls `load` ausbleibt.
const MAX_VISIBLE_MS = 8000;

export function PwaSplash() {
  const [state, setState] = useState<'visible' | 'hiding' | 'gone'>('visible');

  useEffect(() => {
    const mounted = Date.now();
    let hideTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    const beginHide = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - mounted));
      hideTimer = setTimeout(() => {
        setState('hiding');
        removeTimer = setTimeout(() => setState('gone'), FADE_MS);
      }, wait);
    };

    const onReady = () => beginHide();

    if (document.readyState === 'complete') {
      beginHide();
    } else {
      window.addEventListener('load', onReady, { once: true });
    }

    const safety = setTimeout(beginHide, MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener('load', onReady);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
      clearTimeout(safety);
    };
  }, []);

  if (state === 'gone') return null;

  return (
    <div
      className={`pwa-splash${state === 'hiding' ? ' pwa-splash--hiding' : ''}`}
      role="status"
      aria-live="polite"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- statischer Splash,
          bewusst ohne next/image, damit er ohne Hydration sofort erscheint. */}
      <img
        src="/logo.png"
        alt=""
        width={133}
        height={77}
        className="pwa-splash__logo"
        aria-hidden="true"
      />
      <span className="pwa-splash__spinner" aria-hidden="true" />
      <span className="sr-only">Allgäu Wings wird geladen</span>
    </div>
  );
}
