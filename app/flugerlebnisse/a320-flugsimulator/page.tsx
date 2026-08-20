import type { Metadata } from 'next';
import { StubPage } from '@/components/stub-page';

export const metadata: Metadata = {
  title: 'A320 Flugsimulator',
  description: 'Steuern Sie selbst einen Airbus A320 im Full-Flight-Simulator.',
  alternates: { canonical: '/flugerlebnisse/a320-flugsimulator/' },
};

export default function A320Page() {
  return (
    <StubPage
      title="A320 Flugsimulator"
      lead="Selbst am Steuer eines Airbus A320 — mit Instruktor."
      note="Inhalte und Buchung folgen in Phase 5 (Quelle: extract/html/a320-flugsimulator.html)."
    />
  );
}
