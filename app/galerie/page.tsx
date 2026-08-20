import type { Metadata } from 'next';
import { StubPage } from '@/components/stub-page';

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Impressionen und Videos von Rundflügen mit Allgäu Wings.',
  alternates: { canonical: '/galerie/' },
};

export default function GaleriePage() {
  return (
    <StubPage
      title="Galerie"
      lead="Impressionen und Videos aus dem Cockpit."
      note="Foto- und Videogalerie mit VideoObject-Schema folgt in Phase 5 (Quelle: extract/html/video.html)."
    />
  );
}
