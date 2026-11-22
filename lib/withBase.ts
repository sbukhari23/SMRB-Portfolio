const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a raw public/ asset path (image, video src, poster, download
 * link) with the GitHub Pages basePath. next/link already does this on its
 * own. next/image does NOT: with `images.unoptimized: true` (required for
 * static export) it renders `src` unprefixed, so every next/image usage in
 * this repo must also wrap its `src` in withBase() -- confirmed by
 * inspecting the static export's HTML, where an unwrapped next/image src
 * came out as "/images/muneeb.jpeg" instead of "/SMRB-Portfolio/images/muneeb.jpeg".
 */
export function withBase(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
