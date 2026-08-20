import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';
import { business } from '@/data/business';

export const metadata: Metadata = {
  title: 'Widerrufsbelehrung',
  alternates: { canonical: '/rechtliches/widerruf/' },
  robots: 'index,follow',
};

export default function WiderrufPage() {
  return (
    <LegalLayout title="Widerrufsbelehrung" stand="Entwurf 2026">
      <h2 id="hinweis">Wichtiger Hinweis zum Anwendungsbereich</h2>
      <p>
        Für Verträge über Freizeitbetätigungen mit einem <strong>konkret vereinbarten Termin</strong>{' '}
        besteht nach § 312g Abs. 2 Nr. 9 BGB regelmäßig <strong>kein</strong> Widerrufsrecht. Bei
        einem <strong>undatierten Wertgutschein</strong> ist nach überwiegender Auffassung dagegen
        ein Widerrufsrecht gegeben. Welche Konstellation vorliegt, hängt vom konkreten Kauf ab; die
        endgültige Ausgestaltung ist rechtlich zu prüfen.
      </p>

      <h2 id="widerrufsrecht">Widerrufsrecht (für widerrufliche Bestellungen)</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
        widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({business.name}, {business.street},{' '}
        {business.zip} {business.city}, E-Mail <a href={`mailto:${business.email}`}>{business.email}</a>)
        mittels einer eindeutigen Erklärung (z. B. per Post oder E-Mail) über Ihren Entschluss
        informieren. Zur Wahrung der Frist genügt die rechtzeitige Absendung.
      </p>

      <h2 id="folgen">Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, erstatten wir Ihnen alle Zahlungen unverzüglich und
        spätestens binnen vierzehn Tagen ab Eingang Ihrer Widerrufserklärung zurück. Für die
        Rückzahlung verwenden wir dasselbe Zahlungsmittel wie bei der ursprünglichen Transaktion.
      </p>

      <h2 id="muster">Muster-Widerrufsformular</h2>
      <p>
        (Wenn Sie den Vertrag widerrufen wollen, füllen Sie dieses Formular aus und senden es
        zurück.)
      </p>
      <ul>
        <li>An: {business.name}, {business.street}, {business.zip} {business.city}, {business.email}</li>
        <li>Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über die folgende Leistung:</li>
        <li>Bestellt am / erhalten am:</li>
        <li>Name des/der Verbraucher(s):</li>
        <li>Anschrift des/der Verbraucher(s):</li>
        <li>Datum und Unterschrift (nur bei Mitteilung auf Papier):</li>
      </ul>
    </LegalLayout>
  );
}
