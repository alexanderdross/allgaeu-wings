import Stripe from 'stripe';

let _stripe: Stripe | null = null;

/** Lazy Stripe-Client. Wirft erst zur Laufzeit, wenn der Key fehlt, nie beim Build. */
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    _stripe = new Stripe(key, { typescript: true });
  }
  return _stripe;
}

/** True, wenn Stripe konfiguriert ist (Key vorhanden). */
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
