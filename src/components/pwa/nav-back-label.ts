// Eigenstaendiges Label-Glossar fuer den PWA-Zurueck-Button. Die Sprache kommt
// aus der URL (DE als Root, /en/ vorbereitet, siehe CLAUDE.md "SEO-Konventionen"),
// nicht aus React-Context. Fuegt bewusst keine Schluessel zu Content-Daten hinzu
// (Doktrin aus drossnet/src/components/pwa/nav-back-label.ts).

const NAV_BACK_LABEL = {
  de: 'Zurück',
  en: 'Back',
} as const;

/** Label passend zur URL: /en/... liefert Englisch, sonst Deutsch (Root). */
export function navBackLabel(pathname: string): string {
  return pathname === '/en' || pathname.startsWith('/en/')
    ? NAV_BACK_LABEL.en
    : NAV_BACK_LABEL.de;
}
