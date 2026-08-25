"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { heroTabs } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The switchable hero statement.
 *
 * A row of labels swaps the statement below and the handwritten word behind
 * it. It replaces the old timed rotation, which changed on its own schedule
 * and gave a reader no way to go back to a line they were still reading.
 * This puts the same content under their control instead.
 *
 * The script word is decorative and marked aria-hidden: the tab label already
 * says the same thing, so reading it twice would only be noise.
 */
export function HeroStatement() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const tab = heroTabs[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="About Abdul"
        className="-mx-1 flex flex-wrap justify-center gap-x-5 gap-y-3 px-1 sm:gap-x-8"
      >
        {heroTabs.map((item, index) => (
          <button
            key={item.label}
            role="tab"
            type="button"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.04em] transition-colors sm:text-sm",
              index === active
                ? "text-accent"
                : "text-muted hover:text-ink-soft",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative mt-12 sm:mt-16">
        {/* Keyed enter animation rather than AnimatePresence with mode="wait".
            That mode holds the incoming statement until the outgoing one has
            finished animating out, so a stalled animation loop leaves the
            reader looking at the wrong tab's text. This swaps immediately and
            fades in over the top. */}
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
              than sitting politely beneath it.

              Sized off the reference by ratio rather than absolute px: there
              the script runs about three times the statement's own size, so
              15.5vw against the statement's 5.2vw holds that relationship at
              every width. The negative margin pulls it up into the last line,
              and the rotation is what stops it reading as a caption. */}
          <p
            aria-hidden
            className="pointer-events-none -mt-4 select-none whitespace-nowrap text-center font-script text-[clamp(3.25rem,12.5vw,10.5rem)] leading-[0.85] text-accent sm:-mt-10 sm:translate-x-[3%]"
            style={{ rotate: "-10deg" }}
          >
            {tab.script}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
