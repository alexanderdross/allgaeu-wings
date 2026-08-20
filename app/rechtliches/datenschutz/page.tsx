import type { Metadata } from 'next';
import { StubPage } from '@/components/stub-page';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  alternates: { canonical: '/rechtliches/datenschutz/' },
};

export default function DatenschutzPage() {
  return (
    <StubPage
      title="Datenschutzerklärung"
      note="Datenschutzerklärung (Cloudflare-Hosting, Stripe, Turnstile, worker-mailer, Web Analytics) wird in Phase 2 erstellt und ist vor Go-live rechtlich zu prüfen (docs/08-recht-compliance.md)."
    />
  );
}
