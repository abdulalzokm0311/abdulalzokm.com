"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const COVER_MS = 450;
const REVEAL_MS = 500;

type Panel = { href: string; background: string };
type Phase = "covering" | "revealing";

type TransitionContext = {
  /**
   * Sweep a panel across the screen, navigate under it, then sweep it off.
   * Falls back to a plain push when the visitor prefers reduced motion.
   */
  swipeTo: (href: string, background: string) => void;
};

const Ctx = createContext<TransitionContext>({ swipeTo: () => {} });

export const useRouteTransition = () => useContext(Ctx);

/**
 * A full-screen panel that swipes in from the left, holds while the next route
 * renders underneath, then swipes off to the right.
 *
 * It lives in the root layout rather than in the card, because the panel has
 * to outlive the route change. Anything rendered inside the page tree is
 * unmounted the moment the navigation commits, which would cut the animation
 * in half.
 */
export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [panel, setPanel] = useState<Panel | null>(null);
  const [phase, setPhase] = useState<Phase>("covering");
  const startedAt = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const swipeTo = useCallback(
    (href: string, background: string) => {
      if (reduceMotion) {
        router.push(href);
        return;
      }

      startedAt.current = pathname;
      setPhase("covering");
      setPanel({ href, background });
      router.prefetch(href);

      // Navigation runs on a timer, not on the animation finishing. Motion
      // animates on requestAnimationFrame, which a background or throttled tab
      // can stall indefinitely; gating the route change on it would strand the
      // visitor under a panel that never lifts.
      clearTimers();
      timers.current.push(
        window.setTimeout(() => router.push(href), COVER_MS),
      );
    },
    [clearTimers, pathname, reduceMotion, router],
  );

  /* Once the new route has committed, uncover it. */
  useEffect(() => {
    if (!panel) return;
    if (pathname === startedAt.current) return;

    setPhase("revealing");
    clearTimers();
    timers.current.push(
      window.setTimeout(() => {
        setPanel(null);
        startedAt.current = null;
      }, REVEAL_MS),
    );
  }, [clearTimers, panel, pathname]);

  return (
    <Ctx.Provider value={{ swipeTo }}>
      {children}

      <AnimatePresence>
        {panel ? (
          <motion.div
            aria-hidden
            initial={{ x: "-100%" }}
            animate={{ x: phase === "covering" ? "0%" : "100%" }}
            transition={{
              duration: (phase === "covering" ? COVER_MS : REVEAL_MS) / 1000,
              ease: EASE,
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              backgroundImage: panel.background,
              pointerEvents: "none",
            }}
          />
        ) : null}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
