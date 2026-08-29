"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Target number to count to */
  target: number;
  /** Suffix string (e.g. "+", "%", "k") */
  suffix?: string;
  /** Duration of the animation in ms */
  duration?: number;
  /** Label shown below the number */
  label?: string;
  className?: string;
}

/**
 * Counter that animates from 0 to the target number when it enters the viewport.
 */
export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  label,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <span className="text-4xl md:text-5xl font-bold gradient-text">
        {count}
        {suffix}
      </span>
      {label && (
        <p className="text-gray-400 text-sm mt-2">{label}</p>
      )}
    </div>
  );
}
