"use client";

import { motion } from "framer-motion";
import { Bot, BrainCircuit, Cloud, MessageCircle, ShoppingCart, Smartphone } from "lucide-react";
import { ScaleOnScroll, Float, ClickScrollAnimation } from "@/components/effects/ScrollEffects";

const services = [
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description: "Desarrollamos apps nativas e híbridas para iOS y Android con las últimas tecnologías.",
    color: "cyan" as const,
    features: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    icon: Bot,
    title: "IA Generativa",
    description: "Soluciones de inteligencia artificial avanzadas para automatizar y potenciar tu negocio.",
    color: "purple" as const,
    features: ["GPT Integration", "LLMs", "Generación de contenido", "Análisis de datos"],
  },
  {
    icon: BrainCircuit,
    title: "Agentes Inteligentes",
    description: "Agentes autonomousos que realizan tareas complejas automáticamente.",
    color: "pink" as const,
    features: ["Automación", "Tomas de decisiones", "Integración APIs", "Machine Learning"],
  },
  {
    icon: MessageCircle,
    title: "Chatbots",
    description: "Asistentes virtuales personalizados para atención al cliente 24/7.",
    color: "yellow" as const,
    features: ["NLP", "Integración multi-canal", "Base de conocimientos", "Analytics"],
  },
  {
    icon: ShoppingCart,
    title: "Tiendas Virtuales",
    description: "E-commerce modernos, seguros y optimizados para maximizar conversiones.",
    color: "cyan" as const,
    features: ["Next.js", "Pasarelas de pago", "Inventario", "SEO optimizado"],
  },
  {
    icon: Cloud,
    title: "Soluciones Cloud",
    description: "Infraestructura escalable y segura en la nube para tu empresa.",
    color: "purple" as const,
    features: ["AWS", "Azure", "Google Cloud", "DevOps"],
  },
];

export function ServicesSection() {
  return (
    <section id="servicios" className="relative">
      <ClickScrollAnimation
        height={80}
        fixedContent={
          <div className="py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Nuestros <span className="gradient-text">Servicios</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Ofrecemos soluciones tecnológicas integrales para transformar tu negocio
              </p>
            </motion.div>
          </div>
        }
        scrollingItems={[
          {
            id: "mobile",
            stayOnTop: false,
            content: (
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl p-8 border-t-4 border-accent-cyan max-w-2xl mx-auto"
                >
                  <Smartphone aria-hidden="true" className="mb-6 h-14 w-14 text-accent-cyan" strokeWidth={1.5} />
                  <h3 className="text-3xl font-bold mb-4 text-white">Aplicaciones Móviles</h3>
                  <p className="text-gray-400 text-lg mb-6">Desarrollamos apps nativas e híbridas para iOS y Android</p>
                  <div className="flex flex-wrap gap-2">
                    {["React Native", "Flutter", "Swift", "Kotlin"].map((f) => (
                      <span key={f} className="text-xs px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan">
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ),
          },
          {
            id: "ia",
            stayOnTop: false,
            content: (
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl p-8 border-t-4 border-accent-purple max-w-2xl mx-auto"
                >
                  <Bot aria-hidden="true" className="mb-6 h-14 w-14 text-accent-purple" strokeWidth={1.5} />
                  <h3 className="text-3xl font-bold mb-4 text-white">IA Generativa</h3>
                  <p className="text-gray-400 text-lg mb-6">Soluciones de inteligencia artificial avanzadas</p>
                  <div className="flex flex-wrap gap-2">
                    {["GPT Integration", "LLMs", "Generación de contenido"].map((f) => (
                      <span key={f} className="text-xs px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple">
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ),
          },
          {
            id: "agents",
            stayOnTop: false,
            content: (
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl p-8 border-t-4 border-accent-pink max-w-2xl mx-auto"
                >
                  <BrainCircuit aria-hidden="true" className="mb-6 h-14 w-14 text-accent-pink" strokeWidth={1.5} />
                  <h3 className="text-3xl font-bold mb-4 text-white">Agentes Inteligentes</h3>
                  <p className="text-gray-400 text-lg mb-6">Agentes autonomousos que realizan tareas complejas</p>
                  <div className="flex flex-wrap gap-2">
                    {["Automación", "Machine Learning", "Integración APIs"].map((f) => (
                      <span key={f} className="text-xs px-3 py-1 rounded-full bg-accent-pink/20 text-accent-pink">
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ),
          },
          {
            id: "chatbots",
            stayOnTop: false,
            content: (
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl p-8 border-t-4 border-accent-yellow max-w-2xl mx-auto"
                >
                  <MessageCircle aria-hidden="true" className="mb-6 h-14 w-14 text-accent-yellow" strokeWidth={1.5} />
                  <h3 className="text-3xl font-bold mb-4 text-white">Chatbots</h3>
                  <p className="text-gray-400 text-lg mb-6">Asistentes virtuales personalizados para atención al cliente 24/7</p>
                  <div className="flex flex-wrap gap-2">
                    {["NLP", "Integración multi-canal", "Base de conocimientos"].map((f) => (
                      <span key={f} className="text-xs px-3 py-1 rounded-full bg-accent-yellow/20 text-accent-yellow">
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ),
          },
          {
            id: "ecommerce",
            stayOnTop: false,
            content: (
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl p-8 border-t-4 border-accent-cyan max-w-2xl mx-auto"
                >
                  <ShoppingCart aria-hidden="true" className="mb-6 h-14 w-14 text-accent-cyan" strokeWidth={1.5} />
                  <h3 className="text-3xl font-bold mb-4 text-white">Tiendas Virtuales</h3>
                  <p className="text-gray-400 text-lg mb-6">E-commerce modernos, seguros y optimizados para maximizar conversiones</p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "Pasarelas de pago", "Inventario"].map((f) => (
                      <span key={f} className="text-xs px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan">
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ),
          },
        ]}
      />

      <Float className="absolute top-20 right-10 w-32 h-32 bg-accent-cyan/10 rounded-full blur-3xl" amplitude={30} />
      <Float className="absolute bottom-20 left-10 w-48 h-48 bg-accent-purple/10 rounded-full blur-3xl" amplitude={40} duration={8} />
    </section>
  );
}
