"use client";

import { useEffect, useRef } from "react";

/** How much of the remaining distance to close each frame. 1 would be instant. */
const FOLLOW = 0.22;
const BASE = 26;

/**
 * A drawn arrow cursor that inverts against whatever it sits on.
 *
 * The inversion is mix-blend-mode: difference over a white fill, which
 * computes 1 - backdrop. Black on the cream page, white on a case study's
 * dark gradient, correct on a photograph, all without knowing anything about
 * what is underneath.
 *
 * Only mounts for a fine pointer, so touch devices are untouched. The native
 * cursor is hidden by a class this component adds to <html>, so a visitor
 * without JavaScript keeps their normal pointer.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    const root = document.documentElement;
    const node = dotRef.current;
    if (!node) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;
    let lastFrame = 0;
    let armed = false;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /** Write the transform now, without waiting for a frame. */
    const paint = () => {
      node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) scale(${scale})`;
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      // If frames have stopped arriving, track the pointer straight from the
      // event. Without this the cursor freezes in place while the native one
      // is already hidden, leaving nothing on screen to point with.
      if (armed && performance.now() - lastFrame > 200) {
        current.x = target.x;
        current.y = target.y;
        paint();
      }

      if (!visible) {
        visible = true;
        current.x = target.x;
        current.y = target.y;
        node.style.opacity = "1";
      }

      // Grow over anything clickable, so the cursor reads as a state.
      const el = event.target as Element | null;
      targetScale = el?.closest?.("a, button, [role='button'], label, summary")
        ? 1.8
        : 1;
    };

    const onLeave = () => {
      visible = false;
      node.style.opacity = "0";
    };

    const tick = () => {
      lastFrame = performance.now();

      // The native cursor is only hidden once a frame has actually rendered,
      // so a stalled or throttled tab can never leave the page with no cursor
      // at all.
      if (!armed) {
        armed = true;
        root.classList.add("cursor-custom");
      }

      const ease = reduce ? 1 : FOLLOW;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      scale += (targetScale - scale) * (reduce ? 1 : 0.18);

      paint();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      root.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] opacity-0 mix-blend-difference"
      style={{ width: BASE, height: BASE, willChange: "transform" }}
    >
      <svg viewBox="0 0 26 26" width={BASE} height={BASE} fill="none">
        {/* Three separate strokes rather than one closed outline: a shaft and
            two barbs, each bowed a little and neither quite mirroring the
            other, so it reads as drawn in a pass rather than constructed.
            Round caps are what sell it as a pen rather than a vector. */}
        <g
          stroke="white"
          strokeWidth={2.1}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3 C7.2 8.6 11.6 13.4 18.4 18.8" />
          <path d="M3 3 C2.6 6.4 3.1 9.3 3.8 12.2" />
          <path d="M3 3 C6.3 2.6 9.1 3.2 12.1 3.9" />
        </g>
      </svg>
    </div>
  );
}
