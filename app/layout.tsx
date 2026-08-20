import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { business } from '@/data/business';

// next/font lädt die Schriften zur Build-Zeit und hostet sie selbst — keine
// Laufzeit-Anfrage an Google (DSGVO-konform). Siehe docs/02-design-system.md.
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: 'Allgäu Wings — Alpen-Rundflüge ab Memmingen & Friedrichshafen',
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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${outfit.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
