import Image from "next/image";

/**
 * The About portrait.
 *
 * At rest it is simply the photograph. Hovering the card it sits in steps it
 * up and to the left off a plate in the accent, which steps the other way, so
 * a coloured edge opens along two sides. It is the offset you get when a plate
 * has moved between passes, which is the right register for a page set like
 * this one.
 *
 * It answers to the card rather than to itself, so the whole panel moves as
 * one thing under the cursor instead of the photograph waiting its turn. That
 * means it has to sit inside a hover group, which is what TracedCard is.
 */
export function Portrait({
  src,
  alt,
  aspect,
}: {
  src: string;
  alt: string;
  aspect: string;
}) {
  if (!src) return null;

  const shift = "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <div style={{ aspectRatio: aspect }} className="relative w-full">
      <div
        aria-hidden
        className={`absolute inset-0 rounded-card bg-accent ${shift} group-hover:translate-x-2.5 group-hover:translate-y-2.5`}
      />

      <div
        className={`absolute inset-0 overflow-hidden rounded-card ${shift} group-hover:-translate-x-2.5 group-hover:-translate-y-2.5`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 38vw, 92vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
