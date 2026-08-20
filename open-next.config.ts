import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// OpenNext-Cloudflare-Adapter.
//
// Die Seite ist aktuell praktisch vollständig statisch (SSG). Es ist daher KEIN
// R2-Incremental-Cache nötig — der Standard-Cache reicht, und das erste Deploy
// braucht keinen R2-Bucket. Sobald spürbar ISR/revalidate eingesetzt wird,
// hier den R2-Cache reaktivieren:
//
//   import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
//   import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
//   export default defineCloudflareConfig({
//     incrementalCache: withRegionalCache(r2IncrementalCache, { mode: 'long-lived', shouldLazilyUpdateOnCacheHit: true }),
//     enableCacheInterception: true,
//   });
//
// und das r2_buckets-Binding in wrangler.jsonc wieder aktivieren.
export default defineCloudflareConfig({
  // Cache-Interception bedient statische Routen direkt aus der Routing-Ebene
  // (schnellere Cold-Starts). Ohne PPR unbedenklich.
  enableCacheInterception: true,
});
