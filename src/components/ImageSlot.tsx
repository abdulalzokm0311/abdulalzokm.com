import Image from "next/image";

import { mustSkipOptimizer } from "@/lib/case-study-lock";
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
  /**
   * "cover" fills the slot and crops the overflow, which suits art-directed
   * covers. "contain" guarantees the whole image is visible, which is what a
   * screenshot needs: a UI shot with a corner sliced off is just wrong.
   */
  fit?: "cover" | "contain";
  /**
   * Pass false inside a draggable wrapper. The browser's own image drag
   * otherwise starts a ghost preview and swallows the pointer.
   */
  draggable?: boolean;
  /** Drop the descriptive text in the placeholder. For slots too small to fit it. */
  compact?: boolean;
  /**
   * Paint a panel behind the image, so the slot reads as a photograph that has
   * not arrived rather than one that is missing. Every image here is lazy, and
   * an empty box on a slow connection is indistinguishable from a broken one.
   *
   * Opt-in, and only safe where `aspect` matches the file's real ratio: with
   * object-contain a wrong ratio letterboxes, and the panel would show through
   * as coloured bars down the sides. That is the reason there is no panel by
   * default.
   */
  backdrop?: boolean;
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
  compact = false,
  backdrop = false,
  fit = "cover",
  draggable,
  className,
}: ImageSlotProps) {
  if (!src) {
    return (
      <div
        style={{ aspectRatio: aspect }}
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden rounded-card border border-dashed border-rule bg-surface-deep p-3 sm:p-6",
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
          <span className="eyebrow block text-accent">Image slot</span>
          {compact ? null : (
            <span className="mt-2 block text-xs leading-relaxed text-ink-soft">
              {alt}
            </span>
          )}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ aspectRatio: aspect }}
      className={cn(
        // No fill by default. With object-contain the letterbox would otherwise
        // show a themed panel behind every screenshot that is not exactly the
        // slot's ratio, which reads as a coloured border nobody asked for.
        // `backdrop` opts in where the ratio is known to be exact.
        "relative w-full overflow-hidden rounded-card",
        backdrop && "bg-surface-deep",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={draggable}
        // Password-gated artwork cannot go through the optimiser. See
        // mustSkipOptimizer for why.
        unoptimized={mustSkipOptimizer(src)}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}
