"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cycles the hero headline.
 *
 * One phrase at a time: the outgoing line finishes leaving before the next
 * arrives. Crossfading them looked fine when the phrases were similar lengths
 * and turned into overlapping text once they were not. The transitions are
 * kept short so the gap between phrases is not noticeable.
 *
 * Both copies are absolutely positioned inside a container whose height is
 * reserved for the longest phrase, so the page does not jog on every cycle.
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
    <h1 className="text-hero relative mx-auto min-h-[2.7em] max-w-4xl font-normal sm:min-h-[1.4em]">
      <span className="sr-only">{phrases.join(". ")}.</span>

      {reduceMotion ? (
        <span aria-hidden className="flex h-full items-center justify-center">
          {phrases[0]}
        </span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            aria-hidden
            key={index}
            className="absolute inset-0 flex items-center justify-center text-balance"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      )}
    </h1>
  );
}
