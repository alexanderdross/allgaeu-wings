import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteJsonLd } from '@/components/site-jsonld';
import { business } from '@/data/business';

// next/font lädt die Schriften zur Build-Zeit und hostet sie selbst, keine
// Laufzeit-Anfrage an Google (DSGVO-konform). Siehe docs/02-design-system.md.
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: 'Allgäu Wings, Alpen-Rundflüge ab Memmingen & Friedrichshafen',
    template: '%s | Allgäu Wings',
  },
  description:
    'Erleben Sie die Alpen aus der Luft: Rundflüge zur Zugspitze, zum Matterhorn, Mont Blanc, ' +
    'über Bodensee, Dolomiten und Gardasee mit der Cessna P210N ab Memmingen und Friedrichshafen.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Allgäu Wings',
    url: business.siteUrl,
    images: [{ url: '/og-default.jpg', width: 1200, height: 675, alt: 'Allgäu Wings' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-default.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon-180x180.png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${outfit.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteJsonLd />
        <a
          href="#main"
          className="sr-only rounded-md bg-accent px-4 py-2 text-accent-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
