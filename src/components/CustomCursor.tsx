"use client";

import { useEffect, useRef } from "react";

/** How much of the remaining distance to close each frame. 1 would be instant. */
const FOLLOW = 0.22;
const BASE = 24;

/**
 * An arrowhead cursor that inverts against whatever it sits on.
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
      <svg viewBox="0 0 24 24" width={BASE} height={BASE} fill="none">
        <defs>
          {/* The knocked-out dots let the backdrop through unblended, which
              reads as the stippled flint texture at this size. */}
          <mask id="cursor-stipple">
            <path
              d="M2 2 Q7 12 9.5 21 Q10.9 16.4 12.3 14.6 Q16.4 13 21 12.2 Q11 6.6 2 2 Z"
              fill="white"
            />
            <circle cx="7.4" cy="9.6" r="0.75" fill="black" />
            <circle cx="9.4" cy="14.2" r="0.7" fill="black" />
            <circle cx="6.2" cy="6.4" r="0.55" fill="black" />
            <circle cx="11.6" cy="11.4" r="0.6" fill="black" />
            <circle cx="14.8" cy="12.2" r="0.5" fill="black" />
            <circle cx="8.9" cy="18" r="0.5" fill="black" />
          </mask>
        </defs>

        <path
          d="M2 2 Q7 12 9.5 21 Q10.9 16.4 12.3 14.6 Q16.4 13 21 12.2 Q11 6.6 2 2 Z"
          fill="white"
          mask="url(#cursor-stipple)"
        />
      </svg>
    </div>
  );
}
