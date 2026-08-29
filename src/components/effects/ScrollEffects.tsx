"use client";

import { motion, useTransform, useScroll, useMotionValueEvent, useReducedMotion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const directionVariants = {
    up: { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    down: { hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left: { hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  };

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, x: 0, y: 0 } : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
      variants={directionVariants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
}

export function ParallaxScroll({
  children,
  speed = 0.5,
  direction = "vertical",
  className = "",
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = useTransform(scrollYProgress, [0, 1], [-speed * 100, speed * 100]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={direction === "horizontal" ? { x: distance } : { y: distance }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleOnScrollProps {
  children: React.ReactNode;
  scaleRange?: [number, number];
  rotationRange?: [number, number];
  threshold?: number;
  className?: string;
}

export function ScaleOnScroll({
  children,
  scaleRange = [1, 1.3],
  rotationRange = [0, 10],
  threshold = 0.5,
  className = "",
}: ScaleOnScrollProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ scale: scaleRange[0], rotate: rotationRange[0] }}
      whileInView={{
        scale: reduceMotion ? scaleRange[0] : scaleRange[1],
        rotate: reduceMotion ? rotationRange[0] : rotationRange[1],
      }}
      viewport={{ amount: threshold }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

interface FloatProps {
  children?: React.ReactNode;
  amplitude?: number;
  duration?: number;
  className?: string;
}

export function Float({
  children,
  amplitude = 20,
  duration = 6,
  className = "",
}: FloatProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={{ y: reduceMotion ? 0 : [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        repeat: reduceMotion ? 0 : Infinity,
        ease: "easeInOut",
      }}
    >
      {children || <div />}
    </motion.div>
  );
}

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className = "" }: AnimatedGradientProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #00f5d4, #9b5de5, #f15bb5, #fee440)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: reduceMotion
            ? "50% 50%"
            : ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: reduceMotion ? 0 : 8,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

interface ClickScrollAnimationProps {
  fixedContent: React.ReactNode;
  scrollingItems: { id: string; content: React.ReactNode; stayOnTop?: boolean }[];
  height?: number;
  className?: string;
}

export function ClickScrollAnimation({
  fixedContent,
  scrollingItems,
  height = 300,
  className = "",
}: ClickScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(
      scrollingItems.length - 1,
      Math.floor(progress * scrollingItems.length)
    );

    setCurrentIndex((previousIndex) =>
      previousIndex === nextIndex ? previousIndex : nextIndex
    );
  });

  const containerHeight = Math.max(height, scrollingItems.length * 55);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${containerHeight}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="min-h-screen flex flex-col">
          <div aria-hidden="true" className="absolute bottom-10 left-8 top-1/2 z-20 hidden w-px -translate-y-1/2 bg-white/10 md:block">
            <motion.div
              className="w-full origin-top bg-accent-cyan"
              style={{ height: "100%", scaleY: progressScale }}
            />
            <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_14px_rgba(0,245,212,0.9)]" />
            <div className="absolute -left-1 bottom-0 h-2 w-2 rounded-full bg-white/30" />
          </div>

          <div className="absolute right-8 top-8 z-20 hidden font-mono text-xs text-white/40 md:block">
            <span className="text-accent-cyan">{String(currentIndex + 1).padStart(2, "0")}</span>
            <span> / {String(scrollingItems.length).padStart(2, "0")}</span>
          </div>

          <div className="flex-shrink-0">
            {fixedContent}
          </div>

          <div className="flex-grow relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {scrollingItems.map((item, index) => {
                const isActive = index === currentIndex;
                
                if (!isActive) return null;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                    className="absolute left-0 right-0 mx-auto w-full max-w-4xl px-8 md:px-12"
                  >
                    {item.content}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
