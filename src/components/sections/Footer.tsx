"use client";

import { motion } from "framer-motion";

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
  { name: "LinkedIn", icon: "💼" },
  { name: "Twitter", icon: "🐦" },
  { name: "GitHub", icon: "💻" },
  { name: "Instagram", icon: "📸" },
];

export function Footer() {
  return (
    <footer className="bg-dark/50 border-t border-white/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <motion.a
              href="#inicio"
              className="text-3xl font-bold gradient-text mb-6 block"
              whileHover={{ scale: 1.02 }}
            >
              PlexuSystem
            </motion.a>
            <p className="text-gray-400 mb-6 max-w-sm">
              Construimos soluciones tecnológicas de vanguardia para transformar tu negocio. 
              Innovación, calidad y compromiso en cada proyecto.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-xl hover:bg-accent-cyan/20 transition-colors"
                  whileHover={{ y: -3 }}
                >
                  {social.icon}
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
            Hecho con ❤️ y código ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
