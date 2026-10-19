"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/** Dev-only: expose the Lenis instance so tooling can drive programmatic scroll. */
function LenisDevBridge() {
  const lenis = useLenis();
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && lenis) {
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    }
  }, [lenis]);
  return null;
}

/**
 * App-wide buttery smooth scrolling (Lenis). Disabled automatically when the
 * user prefers reduced motion, so accessibility is never traded for polish.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.1, smoothWheel: true, wheelMultiplier: 1 }}
    >
      <LenisDevBridge />
      {children}
    </ReactLenis>
  );
}
