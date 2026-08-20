import { NextRequest, NextResponse } from 'next/server';

// Edge-Middleware (nicht Next 16 proxy.ts/Node — der Cloudflare-Adapter lehnt
// Node-Middleware ab). Nur Web-Standard-APIs.
//
// Aufgaben:
//  1. Kanonischer Host (Apex → www) + https.
//  2. Verwaiste WordPress-Attachment-URLs (44 Stück, siehe docs/06-redirect-map.md)
//     → 410 Gone, damit sie kein Crawl-Budget verbrennen.

const CANONICAL_HOST = 'www.allgaeu-wings.de';

// Muster der Attachment-/Medien-URLs aus attachment-sitemap.xml.
const ATTACHMENT_PATTERNS: RegExp[] = [
  /^\/allgau-wings\/[^/]+\/?$/,
  /^\/cessna-p210n-2\/[^/]+\/?$/,
  /^\/news-und-aktionen\/[^/]+\/?$/,
  /^\/news-und-aktionen\/attachment\/[^/]+\/?$/,
  /^\/rundfluege\/img_[^/]+\/?$/,
  /^\/rundflug-shop\/mont-blanc-rundflug\/[^/]+\/?$/,
  /^\/rundfluege\/wunschrundfluege\/oesterreich_rundflug\/austria\/?$/,
  /^\/rundfluege\/rundflug-buchen\/rundflug\/?$/,
  /^\/rundfluege\/rundflugbox\/rundfluggeschenk\/?$/,
  /^\/wer-wir-sind\/(heiko|olympus-digital-camera-4)\/?$/,
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get('host') || '').split(':')[0];

  // Skip Next-Interna und statische Dateien.
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/cdn-cgi/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Verwaiste Attachment-URLs → 410 Gone.
  if (ATTACHMENT_PATTERNS.some((re) => re.test(pathname))) {
    return new NextResponse('Gone', { status: 410 });
  }

  // Kanonischer Host (Apex → www).
  if (host && host !== CANONICAL_HOST && host === 'allgaeu-wings.de') {
    return NextResponse.redirect(`https://${CANONICAL_HOST}${pathname}${search}`, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
