"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * A short fade when a new route mounts.
 *
 * Deliberately does nothing on first paint: fading the page in on load is
 * animation for its own sake and delays the content. This only runs on an
 * actual navigation, where it communicates that the page changed.
 *
 * Enter only. Exit animations in the App Router mean holding the old tree
 * while the new one renders, which fights scroll restoration.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={isFirstRender.current ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
