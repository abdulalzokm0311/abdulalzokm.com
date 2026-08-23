"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A silent looping clip that starts once it is fully in frame.
 *
 * This is the GIF pattern done as video: muted, looping, no chrome, plays by
 * itself. It stays sharp because it is not quantised to 256 colours, and it
 * costs a fraction of the bytes a GIF of the same clip would.
 *
 * WCAG 2.2.2 requires a way to stop anything that moves for more than five
 * seconds, and these clips run from thirteen to twenty-seven, so there is a
 * real pause control rather than an autoplaying loop with no way out.
 * prefers-reduced-motion means it never starts on its own.
 */
export function AutoVideo({
  src,
  caption,
  poster,
}: {
  src: string;
  caption?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(motionQuery.matches);
    if (motionQuery.matches) return;

    // Only once the whole clip is on screen, so a walkthrough never starts
    // half visible with the interesting part still below the fold.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.9 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  return (
    <figure className="my-12">
      <div className="relative overflow-hidden rounded-card bg-surface">
        <video
          ref={videoRef}
          className="block w-full"
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={caption}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support embedded video.
        </video>

        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-4 right-4 rounded-full bg-ink/80 px-4 py-2 text-paper transition-colors hover:bg-ink"
        >
          <span className="eyebrow text-paper">
            {playing ? "Pause" : "Play"}
          </span>
        </button>
      </div>

      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">
          {caption}
          {reduceMotion ? " Press play to watch." : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
