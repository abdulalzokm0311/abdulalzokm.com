"use client";

import { motion, useReducedMotion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { ImageSlot } from "@/components/ImageSlot";
import { about } from "@/content/about";
import { cn } from "@/lib/utils";

/** Deterministic per-particle values, so server and browser render alike. */
const PARTICLES = [
  { left: 14, delay: 0, duration: 6.5, size: 5 },
  { left: 33, delay: 1.4, duration: 7.8, size: 3 },
  { left: 52, delay: 2.6, duration: 6.9, size: 4 },
  { left: 71, delay: 0.8, duration: 8.4, size: 3 },
  { left: 88, delay: 3.4, duration: 7.2, size: 5 },
];

/** Milliseconds between motes while dragging. Below this it turns to soup. */
const DUST_INTERVAL = 45;
const DUST_LIFE = 900;

type Mote = { id: number; x: number; y: number; drift: number; size: number };

/**
 * Whether the scatter is live.
 *
 * Below lg the photos are a plain two-column grid, so there is no coordinate
 * space to drag around in. It also matters for scrolling: dragging needs
 * touch-action: none, and on a phone that turns every photo into a dead spot
 * the page will not scroll from.
 */
function useScatterEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return enabled;
}

/**
 * The photographs, scattered and draggable.
 *
 * From lg up the list is a coordinate space: every photo carries its own left,
 * top and width, so the set overlaps and drifts rather than settling into
 * rows. Widths are chosen per photo so that wildly different source ratios all
 * land in roughly the same rendered height band, which is what makes the
 * spacing read as even.
 *
 * Each photo can be picked up and moved. Dragging scatters dust behind it,
 * throttled to one mote every 45ms so a fast drag does not spawn hundreds.
 * Motes clean themselves up after 900ms.
 *
 * All of the motion is decoration and says so: aria-hidden throughout, and
 * prefers-reduced-motion stops the bob, the ambient particles and the dust.
 * Dragging still works, because that is the reader's own doing. Below lg
 * there is no dragging at all: the photos are a straight two-column grid
 * there, and holding touch events would only block the page from scrolling.
 */
export function PhotoScatter() {
  const reduceMotion = useReducedMotion();
  const scatter = useScatterEnabled();
  const containerRef = useRef<HTMLUListElement>(null);
  const [dust, setDust] = useState<Mote[]>([]);
  const lastSpawn = useRef(0);
  const nextId = useRef(0);

  const spawnDust = useCallback(
    (info: PanInfo) => {
      if (reduceMotion) return;

      const now = performance.now();
      if (now - lastSpawn.current < DUST_INTERVAL) return;
      lastSpawn.current = now;

      const box = containerRef.current?.getBoundingClientRect();
      if (!box) return;

      const id = nextId.current++;
      const mote: Mote = {
        id,
        x: info.point.x - box.left,
        y: info.point.y - box.top,
        // Deterministic spread from the id, so no Math.random in render.
        drift: ((id % 7) - 3) * 9,
        size: 3 + (id % 4),
      };

      setDust((current) => [...current, mote]);
      window.setTimeout(
        () => setDust((current) => current.filter((m) => m.id !== id)),
        DUST_LIFE,
      );
    },
    [reduceMotion],
  );

  return (
    <ul
      ref={containerRef}
      className="relative mt-14 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-20 lg:block lg:h-[960px] lg:gap-0"
    >
      {about.life.map((photo, index) => (
        <li
          key={photo.caption}
          /* The coordinates are the lg canvas's, so they are handed over as
             custom properties and only read from lg up. Set as plain inline
             styles they applied at every width, squeezing each photo to a
             fraction of its grid cell on a phone: 13% of a half-width column
             is about 20px, which is what they were rendering at. */
          className="lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:w-[var(--w)]"
          style={
            {
              "--x": `${photo.left}%`,
              "--y": `${photo.top}%`,
              "--w": `${photo.w}%`,
            } as CSSProperties
          }
        >
          {/* Drag sets transform on this wrapper, the bob sets it on the one
              inside, and the tilt uses the separate rotate property. Three
              layers so none of them overwrite each other. */}
          <motion.div
            drag={scatter}
            dragConstraints={containerRef}
            dragElastic={0.12}
            dragMomentum={false}
            onDrag={(_, info) => spawnDust(info)}
            whileDrag={{ scale: 1.06, zIndex: 40 }}
            style={{ rotate: `${photo.tilt}deg` }}
            className={cn("relative", scatter && "touch-none")}
          >
            <div
              className="relative"
              style={
                reduceMotion
                  ? undefined
                  : {
                      animation: `photo-float ${7 + (index % 3)}s ease-in-out ${index * 0.6}s infinite`,
                    }
              }
            >
              <ImageSlot
                src={photo.src}
                alt={photo.alt}
                aspect={photo.aspect}
                sizes="(min-width: 1024px) 22vw, 44vw"
                fit="contain"
                compact
                backdrop
                draggable={false}
                className="rounded-card"
              />

              {!reduceMotion && photo.src ? (
                <span aria-hidden className="pointer-events-none absolute inset-0">
                  {PARTICLES.map((particle, n) => (
                    <span
                      key={n}
                      className="absolute bottom-2 block rounded-full bg-accent"
                      style={{
                        left: `${particle.left}%`,
                        height: particle.size,
                        width: particle.size,
                        animation: `particle-rise ${particle.duration}s linear ${particle.delay + index * 0.3}s infinite`,
                      }}
                    />
                  ))}
                </span>
              ) : null}
            </div>

            <p className="mt-3 text-xs leading-snug text-ink-soft">
              {photo.caption}
            </p>
          </motion.div>
        </li>
      ))}

      {/* Dust kicked up by a drag. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 z-30">
        {dust.map((mote) => (
          <span
            key={mote.id}
            className="absolute block rounded-full bg-muted"
            style={{
              left: mote.x,
              top: mote.y,
              height: mote.size,
              width: mote.size,
              animation: `dust-settle ${DUST_LIFE}ms ease-out forwards`,
              ["--dust-drift" as string]: `${mote.drift}px`,
            }}
          />
        ))}
      </span>
    </ul>
  );
}
