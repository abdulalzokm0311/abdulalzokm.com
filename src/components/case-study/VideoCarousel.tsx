"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Clip = {
  src: string;
  poster?: string;
  label: string;
  alt: string;
};

/**
 * Named tabs over one video frame, for walking a set of long pages.
 *
 * A full marketing page does not survive being flattened into a screenshot:
 * it is metres tall and the whole point is the order you meet things in. So
 * each page is a silent screen recording, and the tabs let a reader pick which
 * one to watch rather than sitting through three.
 *
 * Only the visible clip is ever loaded or playing. The others hold at
 * preload="none" behind their poster frames, so opening the page costs one
 * image each rather than three videos. Switching tabs rewinds the clip you
 * left, because a walkthrough resumed from the middle tells you nothing.
 *
 * WCAG 2.2.2 wants a way to stop anything moving for more than five seconds
 * and these run past twenty, so there is a real pause control. Reduced motion
 * never starts one on its own.
 */
export function VideoCarousel({
  clips,
  aspect = "1440/830",
  label,
  caption,
}: {
  clips: Clip[];
  /** The recordings' true ratio. Nothing is ever squashed to fit. */
  aspect?: string;
  /** Names the tab set for screen readers. */
  label: string;
  caption?: string;
}) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* Only once most of the frame is on screen, so a walkthrough never starts
     with the interesting half still below the fold. */
  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* One place decides what is playing, so the tabs, the pause button and
     scrolling out of frame cannot leave two clips running at once. */
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index !== active) {
        video.pause();
        // Rewound, so coming back to a tab starts the walkthrough over.
        if (video.currentTime > 0) video.currentTime = 0;
        return;
      }

      if (inView && !held && !reduceMotion) void video.play().catch(() => {});
      else video.pause();
    });
  }, [active, held, inView, reduceMotion]);

  return (
    <figure className="my-12">
      <div
        role="tablist"
        aria-label={label}
        className="-mx-1 flex gap-1 overflow-x-auto pb-3"
      >
        {clips.map((clip, index) => (
          <button
            key={clip.src}
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
            {clip.label}
          </button>
        ))}
      </div>

      {/* Capped by height rather than width. At the full content measure these
          recordings stand taller than the viewport, and a clip you have to
          scroll to see the bottom of is worse than a smaller one. */}
      <div
        ref={frameRef}
        className="relative mx-auto w-full max-w-[min(100%,calc(64vh*1.735))] overflow-hidden rounded-card bg-surface"
        style={{ aspectRatio: aspect }}
      >
        {clips.map((clip, index) => (
          <video
            key={clip.src}
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            aria-hidden={index !== active}
            aria-label={clip.alt}
            loop
            muted
            playsInline
            poster={clip.poster}
            // Nothing but the open tab is allowed to pull video bytes.
            preload={index === active ? "metadata" : "none"}
            onPlay={() => index === active && setPlaying(true)}
            onPause={() => index === active && setPlaying(false)}
            className={cn(
              "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
              index === active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <source src={clip.src} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        ))}

        <button
          type="button"
          onClick={() => setHeld((value) => !value)}
          className="absolute bottom-4 right-4 rounded-full bg-ink/80 px-4 py-2 transition-colors hover:bg-ink"
        >
          <span className="eyebrow text-paper">
            {playing ? "Pause" : "Play"}
          </span>
        </button>
      </div>

      {caption ? (
        <figcaption className="mt-4 max-w-2xl text-sm text-muted">
          {caption}
          {reduceMotion ? " Press play to watch." : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
