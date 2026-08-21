import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'AGB',
  alternates: { canonical: '/rechtliches/agb/' },
  robots: 'index,follow',
};

export default function AgbPage() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen" stand="Entwurf 2026">
      <h2 id="geltung">1. Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle über diese Website geschlossenen
        Verträge über Rundflüge, Flugerlebnisse und Gutscheine der {business.name}
        („Anbieter“).
      </p>

      <h2 id="vertrag">2. Vertragsschluss</h2>
      <p>
        Die Darstellung der Rundflüge stellt ein verbindliches Angebot des Anbieters dar. Mit dem
        Anklicken des Buttons „Zahlungspflichtig bestellen“ nehmen Sie das Angebot an. Über den
        Eingang Ihrer Bestellung erhalten Sie eine Bestätigung per E-Mail.
      </p>

      <h2 id="preise">3. Preise und Umsatzsteuer</h2>
      <p>
        Alle Preise verstehen sich als Endpreise in Euro inklusive der gesetzlichen Umsatzsteuer.
        Der konkret anwendbare Umsatzsteuersatz, insbesondere bei grenzüberschreitenden Strecken, 
        ist noch abschließend zu bestimmen (siehe Entwurfshinweis).
      </p>

      <h2 id="durchfuehrung">4. Durchführung und Wetterabhängigkeit</h2>
      <p>
        Rundflüge sind witterungsabhängig. Der Flugtermin wird nach der Buchung individuell
        vereinbart. Kann ein vereinbarter Termin aus Witterungs- oder Sicherheitsgründen nicht
        durchgeführt werden, wird ein Ersatztermin angeboten. Die Entscheidung über die
        Durchführbarkeit trifft der verantwortliche Pilot; die Flugsicherheit hat stets Vorrang.
      </p>

      <h2 id="gutscheine">5. Gutscheine</h2>
      <ul>
        <li>Gutscheine sind ab Ausstellung <strong>drei Jahre gültig</strong> (Verjährung zum Schluss des dritten Jahres, §§ 195, 199 BGB).</li>
        <li>Die Einlösung erfolgt durch Terminvereinbarung unter Angabe des Gutscheincodes.</li>
        <li>Eine Barauszahlung des Gutscheinwerts ist ausgeschlossen.</li>
        <li>Bestehende Regiondo-Gutscheine bleiben im Rahmen ihrer ursprünglichen Bedingungen einlösbar.</li>
      </ul>

      <h2 id="storno">6. Stornierung und Umbuchung</h2>
      <p>
        Witterungsbedingte Verschiebungen sind kostenfrei. Für vom Kunden veranlasste Stornierungen
        oder Umbuchungen gelten die zum Zeitpunkt der Buchung mitgeteilten Bedingungen. Das
        gesetzliche Widerrufsrecht bleibt unberührt (siehe <a href="/rechtliches/widerruf/">Widerrufsbelehrung</a>).
      </p>

      <h2 id="haftung">7. Haftung</h2>
      <p>
        Es gelten die gesetzlichen Haftungsregelungen. Für die Teilnahme können aus Sicherheits- und
        luftrechtlichen Gründen Voraussetzungen bestehen (u. a. zulässige Personenzahl und
        Gewichtsgrenzen je Flug); diese werden bei der Terminvereinbarung mitgeteilt.
      </p>

      <h2 id="recht">8. Anwendbares Recht</h2>
      <p>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.</p>
    </LegalLayout>
  );
}
