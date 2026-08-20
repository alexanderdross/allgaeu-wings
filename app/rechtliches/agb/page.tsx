import type { Metadata } from 'next';
import { StubPage } from '@/components/stub-page';

export const metadata: Metadata = {
  title: 'AGB',
  alternates: { canonical: '/rechtliches/agb/' },
};

export default function AgbPage() {
  return (
    <StubPage
      title="Allgemeine Geschäftsbedingungen"
      note="AGB (Rundflug-/Gutschein-Bedingungen, Wetter-/Stornoregeln, Gutschein-Gültigkeit 3 Jahre) werden in Phase 2 erstellt und sind rechtlich zu prüfen (docs/08-recht-compliance.md)."
    />
  );
}
