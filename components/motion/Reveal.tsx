"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Stagger offset in seconds. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Render as a list item so it can sit directly inside <ul>/<ol>. */
  as?: "div" | "li";
};

/** Scroll-triggered fade + rise. Reveals once, respects reduced motion. */
export function Reveal({ children, delay = 0, y = 22, as = "div", ...props }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = (as === "li" ? motion.li : motion.div) as typeof motion.div;

  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </Comp>
  );
}
