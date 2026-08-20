'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CheckoutButton({ slug, label = 'Jetzt buchen' }: { slug: string; label?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, quantity: 1 }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? 'Der Kauf ist derzeit nicht möglich.');
    } catch {
      setError('Netzwerkfehler. Bitte später erneut versuchen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button variant="accent" size="lg" className="w-full" onClick={handleClick} disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : label}
      </Button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
