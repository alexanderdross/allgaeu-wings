import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  alternates: { canonical: '/rechtliches/datenschutz/' },
  robots: 'index,follow',
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung" stand="Entwurf 2026">
      <h2 id="verantwortlicher">1. Verantwortlicher</h2>
      <p>
        Verantwortlich im Sinne der DSGVO ist die {business.name}, {business.street},{' '}
        {business.zip} {business.city}, vertreten durch {business.managingDirectors.join(' und ')}.
        Kontakt: <a href={`mailto:${business.email}`}>{business.email}</a>,{' '}
        Telefon {business.phone}.
      </p>

      <h2 id="hosting">2. Hosting (Cloudflare)</h2>
      <p>
        Diese Website wird bei Cloudflare (Cloudflare, Inc.) auf der Cloudflare-Workers-Plattform
        gehostet. Beim Aufruf verarbeitet Cloudflare technisch notwendige Server-Logdaten
        (u. a. IP-Adresse, Zeitpunkt, angeforderte Ressource, Referrer, User-Agent) zur
        Auslieferung, Sicherheit und Stabilität. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an sicherem Betrieb). Mit Cloudflare besteht ein
        Auftragsverarbeitungsvertrag.
      </p>

      <h2 id="analytics">3. Reichweitenmessung (Cloudflare Web Analytics)</h2>
      <p>
        Zur Reichweitenmessung setzen wir Cloudflare Web Analytics ein. Das Verfahren ist
        <strong> cookielos</strong> und erstellt keine geräteübergreifenden Profile; es werden keine
        personenbezogenen Identifier gespeichert. Ein Einwilligungsbanner ist hierfür nicht
        erforderlich. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2 id="zahlung">4. Zahlungsabwicklung (Stripe)</h2>
      <p>
        Für Buchungen und Gutscheine nutzen wir den Zahlungsdienstleister Stripe. Bei einem Kauf
        werden die für die Zahlung erforderlichen Daten (u. a. Name, E-Mail, Rechnungs-/ggf.
        Lieferanschrift, Zahlungsdaten) an Stripe übermittelt und dort verarbeitet.
        Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Es besteht ein
        Auftragsverarbeitungsvertrag; Details siehe Datenschutzhinweise von Stripe.
      </p>

      <h2 id="formulare">5. Kontakt- und Anfrageformular</h2>
      <p>
        Wenn Sie uns über das Anfrageformular oder per E-Mail kontaktieren, verarbeiten wir Ihre
        Angaben (Name, E-Mail, Telefon, Anliegen) zur Bearbeitung der Anfrage. Rechtsgrundlage:
        Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Zum Schutz vor Missbrauch ist der Einsatz von
        Cloudflare Turnstile vorgesehen; hierbei werden technische Merkmale zur Bot-Erkennung
        ausgewertet.
      </p>

      <h2 id="rechte">6. Ihre Rechte</h2>
      <p>Sie haben nach der DSGVO das Recht auf:</p>
      <ul>
        <li>Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17)</li>
        <li>Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20)</li>
        <li>Widerspruch gegen Verarbeitungen auf Basis berechtigter Interessen (Art. 21)</li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3)</li>
      </ul>
      <p>
        Zudem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren
        (Art. 77 DSGVO i. V. m. § 19 BDSG).
      </p>
    </LegalLayout>
  );
}
