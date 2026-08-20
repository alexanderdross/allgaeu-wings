import type { Metadata } from 'next';
import { StubPage } from '@/components/stub-page';

export const metadata: Metadata = {
  title: 'Widerrufsbelehrung',
  alternates: { canonical: '/rechtliches/widerruf/' },
};

export default function WiderrufPage() {
  return (
    <StubPage
      title="Widerrufsbelehrung"
      note="Widerrufsbelehrung und Muster-Formular werden in Phase 2 erstellt. Das Widerrufsrecht bei terminierten Flügen vs. undatierten Gutscheinen ist rechtlich zu klären (docs/08-recht-compliance.md §2.2)."
    />
  );
}
