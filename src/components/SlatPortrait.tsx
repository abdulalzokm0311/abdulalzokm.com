import Image from "next/image";

/** More slats read as a finer blind, but each one costs a paint. */
const SLATS = 9;

/**
 * A portrait that ripples like a venetian blind on hover.
 *
 * At rest it is simply the photograph, whole and unbroken, because the resting
 * state has to be finished on its own. Hovering staggers alternate slats up
 * and down so the image reads as slatted for a moment, then settles.
 *
 * Each slat holds its own copy of the image, offset so the pieces line up into
 * one picture. That looks wasteful and is not: the browser fetches a single
 * optimised file and paints it nine times from cache, which is what keeps
 * next/image in play rather than falling back to a raw background-image.
 */
export function SlatPortrait({
  src,
  alt,
  aspect,
}: {
  src: string;
  alt: string;
  aspect: string;
}) {
  if (!src) return null;

  return (
    <div
      role="img"
      aria-label={alt}
      style={{ aspectRatio: aspect }}
      className="group relative w-full overflow-hidden rounded-card"
    >
      {Array.from({ length: SLATS }).map((_, index) => (
        <div
          key={index}
          aria-hidden
          className="absolute inset-y-0 overflow-hidden transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:translateY(var(--slat-shift))]"
          style={{
            left: `${(index * 100) / SLATS}%`,
            width: `${100 / SLATS}%`,
            transitionDelay: `${index * 45}ms`,
            // Alternating direction is what makes it read as a blind rather
            // than the whole picture sliding.
            ["--slat-shift" as string]: index % 2 === 0 ? "-14px" : "14px",
          }}
        >
          <div
            className="absolute inset-y-0"
            style={{
              width: `${SLATS * 100}%`,
              left: `-${index * 100}%`,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 768px) 38vw, 92vw"
              className="object-cover"
              // Every slat points at the same URL, so this is one fetch reused
              // nine times. Lazy-loading them saves nothing and risks eight
              // blank slats if the observer never fires.
              priority={index === 0}
              loading={index === 0 ? undefined : "eager"}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
