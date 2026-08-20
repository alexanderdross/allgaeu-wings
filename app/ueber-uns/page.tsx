import type { Metadata } from 'next';
import { StubPage } from '@/components/stub-page';

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Allgäu Wings — Alpen-Rundflüge mit der Cessna P210N ab Memmingen und Friedrichshafen.',
  alternates: { canonical: '/ueber-uns/' },
};

export default function UeberUnsPage() {
  return (
    <StubPage
      title="Über uns"
      lead="Allgäu Wings — Ihre Piloten für die Alpen aus der Luft."
      note="Team, Geschichte und Philosophie folgen in Phase 2 (Inhalte aus extract/html/wer-wir-sind.html)."
    />
  );
}
