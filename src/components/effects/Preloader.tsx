"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PreloaderProps {
  /** How long before the preloader fades out (ms) */
  duration?: number;
  /** Logo or text to display */
  label?: string;
}

/**
 * Full-screen preloader that shows on page load with an animated
 * logo/text and progress bar. Fades out after `duration` ms or
 * when the page has loaded.
 */
export function Preloader({ duration = 2500, label = "PlexuSystem" }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate as we approach 100
        const increment = prev < 60 ? 8 : prev < 90 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, duration / 30);

    const timeout = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated logo / text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold gradient-text"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {label}
            </motion.h1>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #00f5d4, #9b5de5, #f15bb5)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-4 text-sm text-gray-500 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
