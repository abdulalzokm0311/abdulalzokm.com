"use client";

import { useReducedMotion } from "motion/react";

import { ImageSlot } from "@/components/ImageSlot";
import { about } from "@/content/about";

/** Deterministic per-particle values, so server and browser render alike. */
const PARTICLES = [
  { left: 14, delay: 0, duration: 6.5, size: 5 },
  { left: 33, delay: 1.4, duration: 7.8, size: 3 },
  { left: 52, delay: 2.6, duration: 6.9, size: 4 },
  { left: 71, delay: 0.8, duration: 8.4, size: 3 },
  { left: 88, delay: 3.4, duration: 7.2, size: 5 },
];

/**
 * The photographs, scattered rather than tiled.
 *
 * Each one carries its own scale, tilt and drop from the content file, so the
 * set reads as a handful of prints laid down rather than a grid. Every photo
 * keeps its true ratio and is contained, so nothing is cropped by the tilt.
 *
 * The bob and the motes are decoration, and they say so: both are pure CSS
 * with no JavaScript loop, they sit behind aria-hidden, and the reduced-motion
 * rule in globals.css stops them outright. Nothing here carries meaning a
 * reader would lose by never seeing it move.
 */
export function PhotoScatter() {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
      {about.life.map((photo, index) => (
        <li
          key={photo.caption}
          className="flex flex-col"
          style={{
            marginTop: `${photo.drop}px`,
            alignItems: index % 2 === 0 ? "flex-start" : "flex-end",
          }}
        >
          {/* Tilt on the outside, bob on the inside, so the two transforms
              do not overwrite each other. */}
          <div style={{ width: `${photo.scale * 100}%`, rotate: `${photo.tilt}deg` }}>
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
                sizes="(min-width: 1024px) 20vw, 44vw"
                fit="contain"
                compact
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

            <p className="mt-4 text-xs leading-snug text-ink-soft">
              {photo.caption}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
