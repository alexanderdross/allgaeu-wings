import type { Metadata } from 'next';
import { StubPage } from '@/components/stub-page';

export const metadata: Metadata = {
  title: 'Rundflug anfragen',
  description: 'Fragen Sie Ihren Wunsch-Rundflug bei Allgäu Wings an.',
  alternates: { canonical: '/kontakt/anfrage/' },
};

export default function AnfragePage() {
  return (
    <StubPage
      title="Rundflug anfragen"
      lead="Wunschziel, Termin und Personenzahl — wir melden uns mit einem Angebot."
      note="Das Anfrageformular mit Turnstile-Spam-Schutz und E-Mail-Versand (worker-mailer) folgt in Phase 3 (docs/07-shop-stripe.md, docs/01-architektur.md). Bis dahin: Kontakt per Telefon oder E-Mail."
    />
  );
}
