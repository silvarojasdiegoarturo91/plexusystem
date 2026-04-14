"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Float } from "@/components/effects/ScrollEffects";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.9)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      style={{ background }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#inicio"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="PlexuSystem"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              PlexuSystem
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <motion.a
            href="#contacto"
            className="hidden md:block px-5 py-2.5 bg-gradient-to-r from-accent-cyan to-accent-purple text-dark font-semibold rounded-full text-sm shadow-lg shadow-accent-cyan/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cotizar
          </motion.a>

          <button className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
