// Ambiente Typen für statische Bild-Importe (*.jpg, *.png, *.webp, *.avif …).
//
// Diese Deklarationen liefert Next.js normalerweise über das generierte
// next-env.d.ts. In der CI läuft `tsc --noEmit` (pnpm typecheck) jedoch VOR
// `next build`, sodass next-env.d.ts noch nicht existiert und statische
// Bild-Importe als TS2307 fehlschlagen. Diese committete Referenz macht die
// Modultypen build-order-unabhängig verfügbar.
/// <reference types="next/image-types/global" />
