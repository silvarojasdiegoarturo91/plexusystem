"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  servicios: [
    "Aplicaciones Móviles",
    "IA Generativa",
    "Agentes Inteligentes",
    "Chatbots",
    "Tiendas Virtuales",
  ],
  empresa: [
    "Sobre Nosotros",
    "Proyectos",
    "Carreras",
    "Blog",
  ],
  legal: [
    "Términos",
    "Privacidad",
    "Cookies",
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/" },
  { name: "GitHub", icon: Github, href: "https://github.com/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/" },
];

export function Footer() {
  return (
    <footer className="bg-dark/50 border-t border-white/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <motion.a
              href="#inicio"
              className="block mb-6 relative w-48 h-16"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/logo.png"
                alt="PlexuSystem"
                fill
                className="object-contain object-left"
              />
            </motion.a>
            <p className="text-gray-400 mb-6 max-w-sm">
              Construimos soluciones tecnológicas de vanguardia para transformar tu negocio. 
              Innovación, calidad y compromiso en cada proyecto.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visitar PlexuSystem en ${social.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full glass text-gray-300 transition-colors hover:bg-accent-cyan/20 hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                  whileHover={{ y: -3 }}
                >
                  <social.icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PlexuSystem. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm">
            Hecho con intención y código.
          </p>
        </div>
      </div>
    </footer>
  );
}
