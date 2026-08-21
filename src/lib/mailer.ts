// E-Mail-Versand über worker-mailer (SMTP).
//
// Läuft NUR auf dem Cloudflare-Workers-Runtime, weil worker-mailer intern
// `cloudflare:sockets` nutzt. Der Import erfolgt daher dynamisch erst zur
// Laufzeit, damit `next build` unter Node nicht an `cloudflare:sockets`
// scheitert (Herleitung: CLAUDE.md „Harte Regeln", docs/01-architektur.md).
// Verifikation über `pnpm build:cf` und `pnpm preview`, nicht über `next build`.
//
// Secrets (SMTP_*) werden im Cloudflare-Dashboard gesetzt (keep_vars) bzw. lokal
// in `.dev.vars`; Vorlage in `.dev.vars.example`. Auf dem Workers-Runtime füllt
// der OpenNext-Adapter `process.env` aus den Worker-Bindings (wie bei Stripe).

interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
}

/** Liest die SMTP-Konfiguration aus der Umgebung, oder null wenn unvollständig. */
export function getMailConfig(): MailConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SHOP_EMAIL_TO;
  if (!host || !user || !pass || !to) return null;
  return { host, port: Number(process.env.SMTP_PORT || '587'), user, pass, to };
}

/** True, wenn der Mailversand konfiguriert ist (alle SMTP_*-Werte gesetzt). */
export function isMailConfigured(): boolean {
  return getMailConfig() !== null;
}

export interface OutgoingMail {
  subject: string;
  text: string;
  /** Reply-To, damit eine Antwort direkt an den Absender des Formulars geht. */
  replyTo?: { name?: string; email: string };
}

/**
 * Versendet eine E-Mail an SHOP_EMAIL_TO. Gibt true bei Erfolg zurück, false
 * wenn nicht konfiguriert oder der Versand fehlschlägt. Der Aufrufer quittiert
 * dem Nutzer trotzdem freundlich: die Eingabe wird zusätzlich serverseitig
 * protokolliert und geht so nicht verloren.
 */
export async function sendMail(mail: OutgoingMail): Promise<boolean> {
  const cfg = getMailConfig();
  if (!cfg) return false;

  try {
    // Dynamischer Import: zieht `cloudflare:sockets` erst zur Laufzeit auf dem
    // Workers-Runtime, nie in den Node-Build.
    const { WorkerMailer } = await import('worker-mailer');
    const mailer = await WorkerMailer.connect({
      host: cfg.host,
      port: cfg.port,
      // Port 465 = implizites TLS; sonst STARTTLS (587).
      secure: cfg.port === 465,
      startTls: cfg.port !== 465,
      authType: 'plain',
      credentials: { username: cfg.user, password: cfg.pass },
    });

    try {
      await mailer.send({
        from: { name: 'Allgäu Wings Website', email: cfg.user },
        to: { email: cfg.to },
        ...(mail.replyTo ? { reply: mail.replyTo } : {}),
        subject: mail.subject,
        text: mail.text,
      });
    } finally {
      await mailer.close();
    }
    return true;
  } catch (error) {
    console.error('[mailer] Versand fehlgeschlagen:', error instanceof Error ? error.message : error);
    return false;
  }
}
