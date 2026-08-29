"use client";

import { useEffect, useRef, useCallback } from "react";

interface ParticleFieldProps {
  /** Number of particles */
  count?: number;
  /** CSS color for particles */
  color?: string;
  /** Maximum particle size in px */
  maxSize?: number;
  /** Maximum speed (px per frame) */
  speed?: number;
  /** Optional className for the container */
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

/**
 * Canvas-based floating particle / star field.
 * Subtle ambient movement — not distracting.
 */
export function ParticleField({
  count = 60,
  color = "#00f5d4",
  maxSize = 3,
  speed = 0.3,
  className = "",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * maxSize + 0.5,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    },
    [count, maxSize, speed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [color, initParticles]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
