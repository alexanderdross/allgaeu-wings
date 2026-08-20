import type { Metadata } from 'next';
import { StubPage } from '@/components/stub-page';

export const metadata: Metadata = {
  title: 'Flugangstseminar',
  description: 'Flugangst überwinden — Seminar mit Simulator und geschulter Begleitung.',
  alternates: { canonical: '/flugerlebnisse/flugangstseminar/' },
};

export default function FlugangstseminarPage() {
  return (
    <StubPage
      title="Flugangstseminar"
      lead="Flugangst verstehen und überwinden — in ruhiger, professioneller Begleitung."
      note="Inhalte und FAQPage-Schema folgen in Phase 5 (Quelle: extract/html/flugangstseminar.html; hohe Suchnachfrage laut docs/05-gsc-analyse.md)."
    />
  );
}
