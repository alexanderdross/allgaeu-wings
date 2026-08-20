// Custom next/image loader für Cloudflare Workers.
//
// Cloudflare Image Transformations (das /cdn-cgi/image/... -Schema) müssen auf
// der Zone aktiviert sein. Bis dahin liefert der Loader das Original-Asset aus,
// damit Bilder auf jedem Host laden. Mit NEXT_PUBLIC_CF_IMAGE_TRANSFORMATIONS=true
// werden die transformierenden URLs erzeugt.
// Docs: https://developers.cloudflare.com/images/transform-images/

interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

const CF_TRANSFORMATIONS_ENABLED =
  process.env.NEXT_PUBLIC_CF_IMAGE_TRANSFORMATIONS === 'true';

export default function cloudflareImageLoader({ src, width, quality }: LoaderParams): string {
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  if (!CF_TRANSFORMATIONS_ENABLED) {
    return src;
  }

  const options = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'].join(',');

  if (/^https?:\/\//.test(src)) {
    return `/cdn-cgi/image/${options}/${src}`;
  }

  const normalized = src.startsWith('/') ? src : `/${src}`;
  return `/cdn-cgi/image/${options}${normalized}`;
}
