"use client";

import { useEffect, useCallback } from "react";

/**
 * Hook for programmatic smooth scrolling.
 * Uses native `scrollIntoView` with `behavior: "smooth"` and falls back
 * to `window.scrollTo` with smooth behavior.
 */
export function useSmoothScroll() {
  const scrollTo = useCallback(
    (target: string | number, options?: ScrollIntoViewOptions) => {
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start", ...options });
        }
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    },
    []
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { scrollTo, scrollToTop };
}

interface SmoothScrollProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper that applies momentum-style smooth scrolling via CSS and
 * provides inertial scroll feel on touch/trackpad devices.
 */
export function SmoothScroll({ children, className = "" }: SmoothScrollProps) {
  useEffect(() => {
    const html = document.documentElement;

    // Enable CSS smooth scrolling
    html.style.scrollBehavior = "smooth";

    return () => {
      html.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className={`scroll-smooth ${className}`} style={{ scrollBehavior: "smooth" }}>
      {children}
    </div>
  );
}
