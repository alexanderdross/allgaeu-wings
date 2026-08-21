'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

// Cloudflare Turnstile Widget (explizites Rendering, App-Router-tauglich).
// Der Token wird von Turnstile automatisch als verstecktes Feld
// `cf-turnstile-response` in das umgebende <form> injiziert und serverseitig
// unter /api/kontakt geprueft.
//
// Ohne gesetzten NEXT_PUBLIC_TURNSTILE_SITE_KEY wird der offizielle
// Cloudflare-Testschluessel verwendet (besteht immer), damit Vorschau und CI
// funktionieren. In Produktion den echten Sitekey im Cloudflare-Dashboard setzen.
const TEST_SITE_KEY = '1x00000000000000000000AA';
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function Turnstile({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Auf das Laden von window.turnstile warten (das Script wird asynchron
    // geladen), dann genau einmal rendern.
    function tryRender() {
      if (cancelled || widgetId.current) return;
      if (window.turnstile && ref.current) {
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          theme: 'auto',
        });
      } else {
        timer = setTimeout(tryRender, 200);
      }
    }
    tryRender();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div ref={ref} className={className} />
    </>
  );
}
