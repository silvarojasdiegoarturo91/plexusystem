"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type SceneTone = "origin" | "intelligence" | "velocity" | "signal" | "contact";

interface SceneFrameProps {
  children: React.ReactNode;
  index: string;
  eyebrow: string;
  tone: SceneTone;
}

const toneStyles: Record<SceneTone, { wash: string; glow: string }> = {
  origin: {
    wash: "from-accent-cyan/[0.12] via-transparent to-transparent",
    glow: "bg-accent-cyan/20",
  },
  intelligence: {
    wash: "from-accent-purple/[0.14] via-transparent to-transparent",
    glow: "bg-accent-purple/20",
  },
  velocity: {
    wash: "from-accent-pink/[0.12] via-transparent to-transparent",
    glow: "bg-accent-pink/20",
  },
  signal: {
    wash: "from-accent-yellow/[0.1] via-transparent to-transparent",
    glow: "bg-accent-yellow/20",
  },
  contact: {
    wash: "from-accent-cyan/[0.1] via-transparent to-accent-purple/[0.1]",
    glow: "bg-accent-purple/20",
  },
};

export function SceneFrame({ children, index, eyebrow, tone }: SceneFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const styles = toneStyles[tone];
  const glowY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, -24]);

  return (
    <div ref={ref} className="scene-frame relative overflow-clip">
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.wash}`}
        style={reduceMotion ? undefined : { y: glowY, scale: glowScale }}
      >
        <div className={`absolute -right-24 top-1/4 h-72 w-72 rounded-full ${styles.glow} blur-[110px]`} />
        <div className="scene-grid absolute inset-0 opacity-30" />
      </motion.div>

      <div className="absolute left-4 top-8 z-20 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:left-8">
        <span className="text-white/80">{index}</span>
        <span className="h-px w-8 bg-white/20" />
        <span>{eyebrow}</span>
      </div>

      <motion.div className="relative z-10" style={reduceMotion ? undefined : { y: contentY }}>
        {children}
      </motion.div>
    </div>
  );
}
