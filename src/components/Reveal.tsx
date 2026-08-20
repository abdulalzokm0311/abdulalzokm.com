"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before this element animates. Use to stagger siblings. */
  delay?: number;
  /** Distance in px the element rises from. */
  y?: number;
  /**
   * Animate on mount instead of on scroll. For above-the-fold content that is
   * already in view when the page loads.
   */
  immediate?: boolean;
  className?: string;
};

/**
 * Fade and rise into view, once.
 * If the visitor prefers reduced motion, it renders plainly with no animation.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  immediate = false,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const transition = {
    duration: 0.7,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
