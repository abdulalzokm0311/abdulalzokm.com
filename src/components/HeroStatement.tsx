"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import { heroTabs } from "@/content/site";

/** How long each statement holds before the next one takes over. */
const DWELL = 4000;

/** A returning tab can hand back a delta of several seconds. Clamped so the
    rotation resumes where it left off instead of jumping a statement. */
const MAX_DELTA = 100;

/**
 * The hero statement, rotating on a timer.
 *
 * Four lines about the same person, cycling so a reader who stays still sees
 * all of them. Nothing labels them: the lines carry themselves, and a row of
 * switches under the headline was more chrome than the idea needed.
 *
 * With the labels gone the rotation still has to be stoppable, so the block
 * holds while a pointer is over it or a finger is down on it. That covers
 * reading but not keyboard, so there is also a hold control that stays out of
 * sight until it is focused. Reduced motion never starts the rotation at all.
 *
 * The script word is decorative and aria-hidden. It repeats the sense of the
 * line above it, so reading it out would only be noise.
 */
export function HeroStatement() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [held, setHeld] = useState(false);
  const reduceMotion = useReducedMotion();

  const progress = useMotionValue(0);
  const elapsed = useRef(0);

  const running = !reduceMotion && !held && !hovered;

  useAnimationFrame((_, delta) => {
    if (!running) return;
    elapsed.current += Math.min(delta, MAX_DELTA);

    if (elapsed.current >= DWELL) {
      elapsed.current = 0;
      progress.set(0);
      setActive((index) => (index + 1) % heroTabs.length);
      return;
    }

    progress.set(elapsed.current / DWELL);
  });

  const tab = heroTabs[active];

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="relative"
    >
      {/* Keyed enter animation rather than AnimatePresence with mode="wait".
          That mode holds the incoming statement until the outgoing one has
          finished animating out, so a stalled animation loop leaves the
          reader looking at the wrong line. This swaps immediately and fades
          in over the top. */}
      <motion.div
        key={tab.label}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mx-auto flex min-h-[2.9em] max-w-4xl items-center justify-center font-display text-[clamp(2rem,5.2vw,3.6rem)] font-normal leading-[0.92] tracking-[-0.03em] text-ink">
          {tab.statement}
        </p>

        {/* Sized and angled off the reference, where the word is far larger
            than the statement's own type and overlaps its last line rather
            than sitting politely beneath it. Sized by ratio rather than
            absolute px so that relationship holds at every width. The
            negative margin pulls it up into the last line, and the rotation
            is what stops it reading as a caption. */}
        <p
          aria-hidden
          className="pointer-events-none -mt-4 select-none whitespace-nowrap text-center font-script text-[clamp(3.25rem,12.5vw,10.5rem)] leading-[0.85] text-accent sm:-mt-10 sm:translate-x-[3%]"
          style={{ rotate: "-10deg" }}
        >
          {tab.script}
        </p>
      </motion.div>

      {reduceMotion ? null : (
        <button
          type="button"
          onClick={() => setHeld((value) => !value)}
          className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:top-0 focus:z-10 focus:-translate-x-1/2 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          {held ? "Resume rotating statements" : "Hold this statement"}
        </button>
      )}
    </div>
  );
}
