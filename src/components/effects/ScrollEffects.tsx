"use client";

import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  const directionVariants = {
    up: { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    down: { hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left: { hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease: "easeOut" }}
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
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: useTransform(
          useMotionValue(0),
          (value) => value * speed * 100
        ),
      }}
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
  return (
    <motion.div
      className={className}
      initial={{ scale: scaleRange[0], rotate: rotationRange[0] }}
      whileInView={{ scale: scaleRange[1], rotate: rotationRange[1] }}
      viewport={{ amount: threshold }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
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
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #00f5d4, #9b5de5, #f15bb5, #fee440)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
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
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      
      if (containerTop <= 0 && !isPinned) {
        setIsPinned(true);
      }
      
      if (isPinned) {
        const scrollDistance = Math.abs(containerTop);
        const itemHeight = window.innerHeight * 0.35;
        const newIndex = Math.min(
          Math.floor(scrollDistance / itemHeight),
          scrollingItems.length - 1
        );
        
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPinned, currentIndex, scrollingItems.length]);

  const containerHeight = height + scrollingItems.length * 40;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${containerHeight}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-y-auto">
        <div className="min-h-screen flex flex-col">
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
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute left-0 right-0 px-8 w-full max-w-4xl mx-auto"
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
