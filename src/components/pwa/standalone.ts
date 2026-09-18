// Gemeinsame PWA-Anzeigemodus-Helfer. Quelle der Wahrheit fuer die Frage
// "laeuft die Seite als installierte PWA?", genutzt vom PWA-Zurueck-Button und
// vom Ladescreen.

/** True auf iOS Safari (iPad/iPhone/iPod), ohne IE-Mobile. SSR-sicher. */
export function isIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
}

/**
 * True, wenn die App als installierte / standalone PWA laeuft (ohne
 * Browser-Chrome). SSR-sicher: auf dem Server immer false, daher rendert der
 * Zurueck-Button serverseitig nichts (Browser-HTML bleibt unveraendert).
 */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Home-Screen-Apps melden sich ueber navigator.standalone.
    ('standalone' in navigator &&
      (navigator as unknown as { standalone: boolean }).standalone === true)
  );
}
