import Link from 'next/link';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Rundflug, formatPreis, formatDauer, getStandort } from '@/data/flights';

export function RundflugCard({ flug }: { flug: Rundflug }) {
  const standort = getStandort(flug.standortId);
  return (
    <Link href={`/rundfluege/${flug.slug}/`} className="group block h-full" aria-label={`${flug.name} ansehen und buchen`}>
      <Card className="flex h-full flex-col overflow-hidden hover:border-accent/60 hover:shadow-xl">
        {/* Bildplatzhalter — Motive kommen aus extract/assets in Phase 2 */}
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-[#2a5a8f]">
          <span className="font-heading text-2xl font-bold text-white/90">{flug.region}</span>
          <div className="absolute right-3 top-3 flex gap-2">
            {flug.popular && <Badge variant="popular">Beliebt</Badge>}
            {flug.neu && <Badge variant="accent">Neu</Badge>}
          </div>
        </div>
        <CardContent className="flex flex-1 flex-col pt-6">
          <h3 className="font-heading text-xl font-semibold group-hover:text-accent">{flug.name}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{flug.kurzbeschreibung}</p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" aria-hidden /> {formatDauer(flug.flugzeitMin)}
            </span>
            {standort && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" aria-hidden /> ab {standort.name}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-heading text-2xl font-bold text-primary">{formatPreis(flug.preis)}</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
              Details <ChevronRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
