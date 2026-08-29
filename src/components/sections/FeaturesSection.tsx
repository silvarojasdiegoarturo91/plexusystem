"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/effects/ScrollEffects";
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
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-12, 24]);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-20 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ScrollReveal direction="up">
            <Badge color="purple" className="mb-4">Mapa de capacidades</Badge>
            <Heading level={2} className="mb-6">
              Tecnología de <span className="gradient-text">vanguardia</span>
            </Heading>
          </ScrollReveal>
          <ScrollReveal direction="left">
            <Paragraph size="lg" className="max-w-xl lg:justify-self-end">
              No son promesas aisladas. Son seis coordenadas que conectan estrategia, diseño y ejecución en un mismo sistema.
            </Paragraph>
          </ScrollReveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5 lg:translate-y-16" : index === 2 ? "lg:col-span-4" : index === 3 ? "lg:col-span-4 lg:translate-y-12" : "lg:col-span-4"}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div style={{ y, rotate: orbitRotate }} className="pointer-events-none relative mx-auto mt-20 h-24 max-w-3xl">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-cyan/30 shadow-[0_0_40px_rgba(0,245,212,0.14)]" />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
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
    <div className={`group glass rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
      <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
        <span>Capacidad / 0{index + 1}</span>
        <span className={iconColors[feature.color as keyof typeof iconColors]}>●</span>
      </div>
      <div className={`mb-4 text-4xl ${iconColors[feature.color as keyof typeof iconColors]}`}>
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </div>
  );
}
