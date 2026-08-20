"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cycles the hero headline.
 *
 * The phrases crossfade rather than swapping one-at-a-time, so the line is
 * never blank mid-transition. Both copies are absolutely positioned inside a
 * container whose height is reserved for the longest phrase, which also keeps
 * the page from jogging on every cycle.
 *
 * Accessibility: the full list is exposed once as static text for screen
 * readers, and the animating copy is hidden from them. A live region that
 * re-announces every few seconds would be hostile.
 *
 * With reduced motion, it holds on the first line and never cycles.
 */
export function RotatingHeadline({
  phrases,
  interval = 3200,
}: {
  phrases: readonly string[];
  interval?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((value) => (value + 1) % phrases.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [phrases.length, interval, reduceMotion]);

  return (
    <h1 className="text-hero relative mx-auto min-h-[3.6em] max-w-4xl sm:min-h-[2.4em]">
      <span className="sr-only">{phrases.join(". ")}.</span>

      {reduceMotion ? (
        <span aria-hidden className="flex h-full items-center justify-center">
          {phrases[0]}
        </span>
      ) : (
        <AnimatePresence initial={false}>
          <motion.span
            aria-hidden
            key={index}
            className="absolute inset-0 flex items-center justify-center text-balance"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      )}
    </h1>
  );
}
