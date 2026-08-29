"use client";

import { motion } from "framer-motion";
import { ScrollReveal, ScaleOnScroll } from "@/components/effects/ScrollEffects";
import { Heading, Paragraph, Card, Badge } from "@/components/ui/UIComponents";

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "CEO, TechStart",
    content: "El equipo de PlexuSystem transformó nuestra visión en realidad. Su profesionalismo y conocimiento en IA superaron todas las expectativas.",
    avatar: "👨‍💼",
    rating: 5,
  },
  {
    name: "María González",
    role: "Directora, E-commerce Pro",
    content: "Nuestra tienda virtual aumentó un 300% las ventas después de trabajar con ellos. El diseño y la funcionalidad son excepcionales.",
    avatar: "👩‍💼",
    rating: 5,
  },
  {
    name: "Roberto Silva",
    role: "CTO, InnovaTech",
    content: "Los chatbots que desarrollaron automatizaron nuestro soporte al cliente. Excelente implementación y seguimiento.",
    avatar: "👨‍💻",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 via-transparent to-accent-purple/5" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-20 grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal direction="right">
            <Badge color="pink" className="mb-4">Señales recibidas</Badge>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/40">Frecuencia 04 / 06</p>
          </ScrollReveal>
          <ScrollReveal direction="up">
            <Heading level={2} className="mb-6">
              Cuando el sistema <span className="gradient-text">conecta</span>
            </Heading>
            <Paragraph size="lg" className="max-w-2xl">
              La mejor prueba de una experiencia es lo que permanece después de usarla.
            </Paragraph>
          </ScrollReveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5 lg:translate-y-20" : "lg:col-span-6 lg:col-start-4"}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <ScaleOnScroll
      scaleRange={[1, 1.03]}
      threshold={0.3}
      rotationRange={[0, index === 1 ? 3 : index === 2 ? -3 : 0]}
    >
      <Card className={`h-full ${index === 0 ? "min-h-[380px]" : "min-h-[320px]"}`} glow={index === 0 ? "cyan" : index === 1 ? "purple" : "pink"}>
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
          <span>Señal verificada / 0{index + 1}</span>
          <span className="text-accent-cyan">● conectada</span>
        </div>
        <div className="mb-4 text-5xl">{testimonial.avatar}</div>
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-accent-yellow">⭐</span>
          ))}
        </div>
        <Paragraph className={`${index === 0 ? "text-xl" : "text-base"} mb-6 italic`}>
          “{testimonial.content}”
        </Paragraph>
        <div>
          <h4 className="font-bold text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </Card>
    </ScaleOnScroll>
  );
}
