import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A panel that rules an accent line around itself on hover, and lifts a little.
 *
 * Chosen over the obvious cursor-follow spotlight because a radial glow is
 * exactly the decoration this site is trying not to reach for. A line drawn
 * around a perimeter is the same vocabulary as the hairlines already dividing
 * the page, and it reads as a drafting gesture rather than a lighting effect.
 *
 * It also leaves the content completely alone. Nothing dims, tints or moves
 * behind the copy, so the card is exactly as readable hovered as at rest.
 *
 * pathLength normalises the perimeter to 1 regardless of the card's size, so
 * one dash offset animates the whole outline whatever the breakpoint.
 */
export function TracedCard({
  children,
  className,
  /** Match the container's own corner radius, in px. */
  radius = 40,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
}) {
  return (
    <div
      className={cn(
        "group relative transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5",
        className,
      )}
    >
      {children}

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          ry={radius}
          fill="none"
          strokeWidth="1.5"
          pathLength={1}
          className="stroke-accent [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[stroke-dashoffset:0]"
        />
      </svg>
    </div>
  );
}
