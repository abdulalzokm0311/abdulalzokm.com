import Image from "next/image";

import { cn } from "@/lib/utils";

type ImageSlotProps = {
  /**
   * Path under /public, e.g. "/projects/westjet/cover.jpg".
   * Leave as "" and this renders a labelled placeholder instead, so every
   * missing asset is visible on the page rather than silently absent.
   */
  src?: string;
  alt: string;
  /** CSS aspect ratio, e.g. "16/9", "4/3", "1/1". */
  aspect?: string;
  /** next/image sizes hint. Set this to match the slot's real layout width. */
  sizes?: string;
  /** Only for the largest above-the-fold image on a page. */
  priority?: boolean;
  className?: string;
};

/**
 * Every image on the site goes through here.
 *
 * With a src it is a plain optimised next/image. Without one it draws a
 * placeholder that states exactly what belongs in the slot, so replacing
 * assets later is a matter of walking the page and filling in blanks.
 */
export function ImageSlot({
  src,
  alt,
  aspect = "16/9",
  sizes = "100vw",
  priority = false,
  className,
}: ImageSlotProps) {
  if (!src) {
    return (
      <div
        style={{ aspectRatio: aspect }}
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden rounded-sm border border-dashed border-rule bg-paper-alt p-6",
          className,
        )}
      >
        {/* Faint diagonal hatch, so an empty slot reads as intentional. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent 0 9px, var(--color-rule) 9px 10px)",
          }}
        />
        <span className="relative max-w-sm text-center">
          <span className="label block text-accent">Image slot</span>
          <span className="mt-2 block font-mono text-xs leading-relaxed text-ink-soft">
            {alt}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ aspectRatio: aspect }}
      className={cn(
        "relative w-full overflow-hidden rounded-sm bg-paper-alt",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
