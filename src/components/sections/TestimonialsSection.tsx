"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 via-transparent to-accent-purple/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-20">
          <Badge color="pink" className="mb-4">Testimonios</Badge>
          <Heading level={2} className="mb-6">
            Lo que dicen <span className="gradient-text">nuestros clientes</span>
          </Heading>
          <Paragraph size="lg" className="max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor logro
          </Paragraph>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
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
      <Card className="h-full" glow={index === 0 ? "cyan" : index === 1 ? "purple" : "pink"}>
        <div className="text-5xl mb-4">{testimonial.avatar}</div>
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-accent-yellow">⭐</span>
          ))}
        </div>
        <Paragraph className="mb-6 italic">"{testimonial.content}"</Paragraph>
        <div>
          <h4 className="font-bold text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </Card>
    </ScaleOnScroll>
  );
}
