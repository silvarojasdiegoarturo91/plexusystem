"use client";

import { motion } from "framer-motion";
import { ScaleOnScroll, Float } from "@/components/effects/ScrollEffects";

const services = [
  {
    icon: "📱",
    title: "Aplicaciones Móviles",
    description: "Desarrollamos apps nativas e híbridas para iOS y Android con las últimas tecnologías.",
    color: "cyan" as const,
    features: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    icon: "🤖",
    title: "IA Generativa",
    description: "Soluciones de inteligencia artificial avanzadas para automatizar y potenciar tu negocio.",
    color: "purple" as const,
    features: ["GPT Integration", "LLMs", "Generación de contenido", "Análisis de datos"],
  },
  {
    icon: "🧠",
    title: "Agentes Inteligentes",
    description: "Agentes autonomousos que realizan tareas complejas automáticamente.",
    color: "pink" as const,
    features: ["Automación", "Tomas de decisiones", "Integración APIs", "Machine Learning"],
  },
  {
    icon: "💬",
    title: "Chatbots",
    description: "Asistentes virtuales personalizados para atención al cliente 24/7.",
    color: "yellow" as const,
    features: ["NLP", "Integración multi-canal", "Base de conocimientos", "Analytics"],
  },
  {
    icon: "🛒",
    title: "Tiendas Virtuales",
    description: "E-commerce modernos, seguros y optimizados para maximizar conversiones.",
    color: "cyan" as const,
    features: ["Next.js", "Pasarelas de pago", "Inventario", "SEO optimizado"],
  },
  {
    icon: "☁️",
    title: "Soluciones Cloud",
    description: "Infraestructura escalable y segura en la nube para tu empresa.",
    color: "purple" as const,
    features: ["AWS", "Azure", "Google Cloud", "DevOps"],
  },
];

export function ServicesSection() {
  return (
    <section id="servicios" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ofrecemos soluciones tecnológicas integrales para transformar tu negocio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>

      <Float className="absolute top-20 right-10 w-32 h-32 bg-accent-cyan/10 rounded-full blur-3xl" amplitude={30} />
      <Float className="absolute bottom-20 left-10 w-48 h-48 bg-accent-purple/10 rounded-full blur-3xl" amplitude={40} duration={8} />
    </section>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <ScaleOnScroll
      scaleRange={[1, 1.05]}
      threshold={0.3}
      className={`h-full`}
    >
      <div className={`glass rounded-2xl p-8 h-full border-t-4 ${
        service.color === 'cyan' ? 'border-accent-cyan' :
        service.color === 'purple' ? 'border-accent-purple' :
        service.color === 'pink' ? 'border-accent-pink' :
        'border-accent-yellow'
      }`}>
        <div className="text-5xl mb-6">{service.icon}</div>
        <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
        <p className="text-gray-400 mb-6">{service.description}</p>
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature) => (
            <span
              key={feature}
              className={`text-xs px-3 py-1 rounded-full ${
                service.color === 'cyan' ? 'bg-accent-cyan/20 text-accent-cyan' :
                service.color === 'purple' ? 'bg-accent-purple/20 text-accent-purple' :
                service.color === 'pink' ? 'bg-accent-pink/20 text-accent-pink' :
                'bg-accent-yellow/20 text-accent-yellow'
              }`}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </ScaleOnScroll>
  );
}
