"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type SceneTone = "origin" | "intelligence" | "velocity" | "signal" | "contact";

interface SceneFrameProps {
  children: React.ReactNode;
  id: string;
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

export function SceneFrame({ children, id, index, eyebrow, tone }: SceneFrameProps) {
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
  const portalScale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.72, 1.08, 0.86, 1.18]);
  const portalRotate = useTransform(scrollYProgress, [0, 1], [-14, 18]);
  const portalOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 0.42, 0.24, 0]);

  return (
    <div id={id} data-scene={tone} ref={ref} className={`scene-frame scene-${tone} relative min-h-[100svh] overflow-clip`}>
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.wash}`}
        style={reduceMotion ? undefined : { y: glowY, scale: glowScale }}
      >
        <div className={`absolute -right-24 top-1/4 h-72 w-72 rounded-full ${styles.glow} blur-[110px]`} />
        <div className="scene-grid absolute inset-0 opacity-30" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[min(72vw,720px)] w-[min(72vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]"
        style={reduceMotion ? undefined : { scale: portalScale, rotate: portalRotate, opacity: portalOpacity }}
      >
        <div className="absolute inset-[9%] rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[22%] rounded-full border border-white/[0.08] shadow-[0_0_100px_rgba(0,245,212,0.08)]" />
        <div className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom -translate-x-1/2 bg-gradient-to-t from-white/20 to-transparent" />
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-dark/70 to-transparent" />

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
