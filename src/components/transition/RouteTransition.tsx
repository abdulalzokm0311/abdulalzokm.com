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

/** How long the panel has to fill the screen before the route is pushed. */
const COVER_MS = 460;
const REVEAL_MS = 420;

type Panel = { href: string; background: string };
type Phase = "covering" | "revealing";

type TransitionContext = {
  /**
   * Zoom a panel in the study's gradient up to fill the screen, navigate
   * under it, then fade through to the page. Falls back to a plain push when
   * the visitor prefers reduced motion.
   */
  zoomTo: (href: string, background: string) => void;
};

const Ctx = createContext<TransitionContext>({ zoomTo: () => {} });

export const useRouteTransition = () => useContext(Ctx);

/**
 * The case study transition: a zoom in.
 *
 * A panel in the study's own title gradient scales up from the middle of the
 * screen until it fills it, the route commits while it is covered, and it
 * fades through to the page. Because the panel is the same gradient the case
 * study's title block is painted in, the two join up.
 *
 * It lives in the root layout rather than in the card, because it has to
 * outlive the route change. Anything rendered inside the page tree is
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

  const zoomTo = useCallback(
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

  /* Once the new route has committed, fade through to it. */
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

  const covering = phase === "covering";

  return (
    <Ctx.Provider value={{ zoomTo }}>
      {children}

      <AnimatePresence>
        {panel ? (
          <motion.div
            aria-hidden
            initial={{ scale: 0.45, opacity: 0, borderRadius: 48 }}
            animate={{
              scale: 1,
              opacity: covering ? 1 : 0,
              borderRadius: 0,
            }}
            transition={{
              scale: { duration: COVER_MS / 1000, ease: EASE },
              borderRadius: { duration: COVER_MS / 1000, ease: EASE },
              opacity: {
                duration: (covering ? COVER_MS * 0.4 : REVEAL_MS) / 1000,
                ease: "linear",
              },
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              backgroundImage: panel.background,
              pointerEvents: "none",
              willChange: "transform",
            }}
          />
        ) : null}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
