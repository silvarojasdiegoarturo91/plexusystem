"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Split strategy: "line" treats each newline as a unit; "word" reveals word by word */
  splitBy?: "line" | "word";
  /** Stagger delay between each unit (seconds) */
  staggerDelay?: number;
  /** Initial y offset in pixels */
  yOffset?: number;
  /** Whether to use gradient text on the revealed content */
  gradient?: boolean;
  /** HTML tag for the rendered element */
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  splitBy = "line",
  staggerDelay = 0.1,
  yOffset = 30,
  gradient = false,
  as: Tag = "h2",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const units = useMemo(() => {
    if (splitBy === "word") {
      return text.split(/\s+/).filter(Boolean);
    }
    return text.split("\n").filter(Boolean);
  }, [text, splitBy]);

  return (
    <Tag className={`${className} ${gradient ? "gradient-text" : ""}`}>
      <span ref={ref} className="inline-block">
        {units.map((unit, i) => (
          <motion.span
            key={`${unit}-${i}`}
            className="inline-block"
            style={{ marginRight: splitBy === "word" ? "0.3em" : undefined }}
            initial={{ y: yOffset, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: yOffset, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: i * staggerDelay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {unit}
            {splitBy === "line" && i < units.length - 1 && <br />}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
