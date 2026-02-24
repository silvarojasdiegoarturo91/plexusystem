"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "purple" | "pink" | "none";
}

export function Card({ children, className = "", hover = true, glow = "none" }: CardProps) {
  const glowClasses = {
    cyan: "hover:shadow-[0_0_30px_rgba(0,245,212,0.4)]",
    purple: "hover:shadow-[0_0_30px_rgba(155,93,229,0.4)]",
    pink: "hover:shadow-[0_0_30px_rgba(241,91,181,0.4)]",
    none: "",
  };

  return (
    <motion.div
      className={`glass rounded-2xl p-6 ${hover ? "transition-all duration-300 hover:scale-105" : ""} ${glowClasses[glow]} ${className}`}
      whileHover={{ y: -5 }}
    >
      {children}
    </motion.div>
  );
}

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "",
  onClick
}: ButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-accent-cyan to-primary-500 text-dark font-bold",
    secondary: "bg-gradient-to-r from-accent-purple to-accent-pink text-white font-bold",
    outline: "border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-dark",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={`rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

interface BadgeProps {
  children: ReactNode;
  color?: "cyan" | "purple" | "pink" | "yellow";
  className?: string;
}

export function Badge({ children, color = "cyan", className = "" }: BadgeProps) {
  const colors = {
    cyan: "bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30",
    purple: "bg-accent-purple/20 text-accent-purple border-accent-purple/30",
    pink: "bg-accent-pink/20 text-accent-pink border-accent-pink/30",
    yellow: "bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  gradient?: boolean;
}

export function Heading({ children, level = 1, className = "", gradient = false }: HeadingProps) {
  const sizes = {
    1: "text-5xl md:text-7xl",
    2: "text-4xl md:text-5xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={`font-bold ${sizes[level]} ${gradient ? "gradient-text" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

interface ParagraphProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Paragraph({ children, className = "", size = "md" }: ParagraphProps) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg md:text-xl",
  };

  return (
    <p className={`text-gray-400 ${sizes[size]} ${className}`}>
      {children}
    </p>
  );
}
