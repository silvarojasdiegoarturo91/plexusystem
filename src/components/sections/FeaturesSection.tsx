"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal, Float } from "@/components/effects/ScrollEffects";
import { Heading, Paragraph, Badge } from "@/components/ui/UIComponents";

const features = [
  {
    title: "Diseño UI/UX",
    description: "Interfaces modernas e intuitivas que cautivan a tus usuarios",
    icon: "🎨",
    color: "cyan",
  },
  {
    title: "Arquitectura Escalable",
    description: "Sistemas diseñados para crecer junto con tu negocio",
    icon: "📐",
    color: "purple",
  },
  {
    title: "Seguridad Avanzada",
    description: "Protección de datos con los estándares más altos",
    icon: "🔒",
    color: "pink",
  },
  {
    title: "Performance Óptima",
    description: "Aplicaciones rápidas y eficientes en cualquier dispositivo",
    icon: "⚡",
    color: "yellow",
  },
  {
    title: "Integración API",
    description: "Conexión fluida con servicios de terceros",
    icon: "🔗",
    color: "cyan",
  },
  {
    title: "Soporte 24/7",
    description: "Equipo disponible para resolver cualquier incidencia",
    icon: "🛟",
    color: "purple",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" className="text-center mb-20">
          <Badge color="purple" className="mb-4">¿Por qué nosotros?</Badge>
          <Heading level={2} className="mb-6">
            Tecnología de <span className="gradient-text">vanguardia</span>
          </Heading>
          <Paragraph size="lg" className="max-w-2xl mx-auto">
            Combinamos innovación técnica con diseño centrado en el usuario
          </Paragraph>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>

        <motion.div style={{ y }} className="mt-20 relative">
          <Float className="absolute top-0 left-1/4 w-40 h-40 bg-accent-cyan/10 rounded-full blur-3xl" amplitude={20} />
          <Float className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent-pink/10 rounded-full blur-3xl" amplitude={25} duration={7} />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const colorClasses = {
    cyan: "group-hover:border-accent-cyan/50",
    purple: "group-hover:border-accent-purple/50",
    pink: "group-hover:border-accent-pink/50",
    yellow: "group-hover:border-accent-yellow/50",
  };

  const iconColors = {
    cyan: "text-accent-cyan",
    purple: "text-accent-purple",
    pink: "text-accent-pink",
    yellow: "text-accent-yellow",
  };

  return (
    <div className={`group glass rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
      <div className={`text-4xl mb-4 ${iconColors[feature.color as keyof typeof iconColors]}`}>
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </div>
  );
}
