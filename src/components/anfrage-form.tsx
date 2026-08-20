'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { rundfluege } from '@/data/flights';

const inputClass =
  'w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function AnfrageForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus('done');
        form.reset();
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Es ist ein Fehler aufgetreten.');
      }
    } catch {
      setStatus('error');
      setMessage('Netzwerkfehler. Bitte später erneut versuchen.');
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" aria-hidden />
        <h2 className="mt-4 font-heading text-xl font-semibold">Vielen Dank für Ihre Anfrage!</h2>
        <p className="mt-2 text-muted-foreground">Wir melden uns zeitnah bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Name *</span>
          <input name="name" required maxLength={200} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">E-Mail *</span>
          <input name="email" type="email" required maxLength={320} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Telefon</span>
          <input name="phone" type="tel" maxLength={50} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Personen</span>
          <input name="personen" type="number" min={1} max={6} defaultValue={2} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Wunsch-Rundflug</span>
          <select name="ziel" className={inputClass} defaultValue="">
            <option value="">Bitte wählen…</option>
            {rundfluege.map((f) => (
              <option key={f.slug} value={f.name}>
                {f.name}
              </option>
            ))}
            <option value="Wunschrundflug">Individueller Wunschrundflug</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Wunschtermin</span>
          <input name="termin" maxLength={200} placeholder="z. B. Juni 2026, flexibel" className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Nachricht</span>
        <textarea name="nachricht" rows={4} maxLength={5000} className={inputClass} />
      </label>

      {status === 'error' && (
        <p role="alert" className="text-sm text-destructive">{message}</p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" variant="accent" size="lg" disabled={status === 'loading'}>
          {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : 'Anfrage senden'}
        </Button>
        <p className="text-xs text-muted-foreground">* Pflichtfelder</p>
      </div>
    </form>
  );
}
