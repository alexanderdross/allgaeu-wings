import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';

// OpenNext-Cloudflare-Adapter. SSG/ISR-Seiten liegen in R2
// (NEXT_INC_CACHE_R2_BUCKET), gewrappt in einen Per-Colo-Regional-Cache, damit
// Treffer ohne R2-Roundtrip aus dem lokalen Colo bedient werden.
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: 'long-lived',
    shouldLazilyUpdateOnCacheHit: true,
  }),
  enableCacheInterception: true,
});
