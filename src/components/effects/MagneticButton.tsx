"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum displacement in pixels */
  strength?: number;
  /** Spring stiffness (higher = snappier) */
  stiffness?: number;
  /** Spring damping (lower = bouncier) */
  damping?: number;
  onClick?: () => void;
}

/**
 * Button that follows the cursor slightly when hovered,
 * creating a "magnetic" pull effect toward the pointer.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  stiffness = 200,
  damping = 20,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;
      x.set(dx);
      y.set(dy);
    },
    [strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
