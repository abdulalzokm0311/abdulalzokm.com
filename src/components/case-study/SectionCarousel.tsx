"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { mustSkipOptimizer } from "@/lib/case-study-lock";
import { cn } from "@/lib/utils";

type Section = {
  src: string;
  alt: string;
  label: string;
  /** The file's true ratio, e.g. "1920/828". Nothing is ever squashed to fit. */
  aspect: string;
};

/**
 * A carousel for page sections, as opposed to app screens.
 *
 * Sections are wide, they are all different heights, and their whole point is
 * that they are readable. So there is no perspective and no rotation here:
 * one section at a time, full width, at its own ratio, sliding horizontally.
 * The frame's own ratio follows the active section, so a short partner strip
 * is not padded out to match a tall illustration block, and nothing is ever
 * stretched to fill a fixed box.
 *
 * Named tabs rather than dots. With eight sections, "Insurance" tells the
 * reader where they are going and a dot does not.
 */
export function SectionCarousel({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const step = useCallback(
    (delta: number) => {
      setActive((current) => {
        const total = sections.length;
        return (current + delta + total) % total;
      });
    },
    [sections.length],
  );

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
    };

    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <figure className="my-12">
      {/* Tabs. Horizontally scrollable rather than wrapping, so the row stays
          one line and the reader can see it is a sequence. */}
      <div
        role="tablist"
        aria-label="Product page sections"
        className="-mx-1 flex gap-1 overflow-x-auto pb-3"
      >
        {sections.map((section, index) => (
          <button
            key={section.src}
            role="tab"
            type="button"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={cn(
              "eyebrow shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 transition-colors",
              index === active
                ? "bg-accent text-paper"
                : "text-ink-soft hover:bg-surface-deep hover:text-ink",
            )}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div
        ref={frameRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Redesigned product page sections"
        className="overflow-hidden rounded-card outline-none transition-[aspect-ratio] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-accent"
        style={{ aspectRatio: sections[active].aspect }}
      >
        <motion.div
          className="flex h-full w-full"
          animate={{ x: `-${active * 100}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 210, damping: 30, mass: 0.8 }
          }
        >
          {sections.map((section, index) => (
            <div
              key={section.src}
              aria-hidden={index !== active}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={section.src}
                alt={section.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority={index === 0}
                unoptimized={mustSkipOptimizer(section.src)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-5">
        <p className="text-sm text-muted">
          {active + 1} of {sections.length}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous section"
            className="rounded-full border border-rule p-3 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next section"
            className="rounded-full border border-rule p-3 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </figure>
  );
}
