"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Screen = { src: string; alt: string; label: string };

/** How far off-centre a card still renders. Beyond this it is culled. */
const VISIBLE = 3;

/**
 * A coverflow of app screens.
 *
 * Phone screens are tall and narrow, so a flat row of eight wastes the page
 * and shrinks each one past reading. Rotating them into perspective keeps the
 * active screen at full size while the rest stay visible as context, which is
 * the one arrangement where a carousel genuinely beats a grid.
 *
 * It does not advance on its own. Motion that a reader did not ask for is
 * exactly what WCAG 2.2.2 is about, and an eight item loop would be the worst
 * kind. prefers-reduced-motion drops the 3D entirely and cross-fades instead.
 */
export function ScreenCarousel({ screens }: { screens: Screen[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  /* Stepping has to be relative inside the updater. Computing the target from
     `active` reads a value that is one render behind, so two quick presses
     advance a single screen. */
  const step = useCallback(
    (delta: number) => {
      setActive((current) => {
        const total = screens.length;
        return (current + delta + total) % total;
      });
    },
    [screens.length],
  );

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % screens.length) + screens.length) % screens.length);
    },
    [screens.length],
  );

  /* Arrow keys, but only while the carousel holds focus. */
  useEffect(() => {
    const node = trackRef.current;
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
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Final Roomin screens"
        className="relative h-[30rem] rounded-card outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-[34rem]"
        style={{ perspective: reduceMotion ? undefined : "1600px" }}
      >
        {screens.map((screen, index) => {
          let offset = index - active;
          const half = screens.length / 2;
          if (offset > half) offset -= screens.length;
          if (offset < -half) offset += screens.length;

          const distance = Math.abs(offset);
          if (distance > VISIBLE) return null;

          const isActive = offset === 0;

          return (
            <motion.div
              key={screen.src}
              className="absolute left-1/2 top-1/2"
              style={{ zIndex: 20 - distance }}
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: isActive ? 1 : 0, x: "-50%", y: "-50%" }
                  : {
                      x: `calc(-50% + ${offset * 8.5}rem)`,
                      y: "-50%",
                      rotateY: offset * -32,
                      scale: 1 - distance * 0.12,
                      opacity: distance > 2 ? 0 : 1 - distance * 0.22,
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0.15 }
                  : { type: "spring", stiffness: 190, damping: 26, mass: 0.9 }
              }
            >
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={
                  isActive ? `${screen.label}, current screen` : screen.label
                }
                aria-current={isActive ? "true" : undefined}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "block overflow-hidden rounded-[1.75rem]",
                  isActive ? "cursor-default" : "cursor-pointer",
                )}
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={248}
                  height={537}
                  sizes="(min-width: 640px) 15rem, 12rem"
                  className="block h-auto w-48 sm:w-60"
                  priority={index < 2}
                />
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous screen"
          className="rounded-full border border-rule p-3 text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path
              d="M15 5l-7 7 7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p aria-live="polite" className="eyebrow min-w-40 text-center text-ink">
          {screens[active].label}
        </p>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next screen"
          className="rounded-full border border-rule p-3 text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path
              d="M9 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <p className="mt-3 text-center text-sm text-muted">
        {active + 1} of {screens.length}
      </p>
    </figure>
  );
}
