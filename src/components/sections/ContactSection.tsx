"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollEffects";
import { Heading, Paragraph, Button, Badge } from "@/components/ui/UIComponents";

export function ContactSection() {
  return (
    <section id="contacto" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent-purple/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-16">
            <Badge color="cyan" className="mb-4">Contacto</Badge>
            <Heading level={2} className="mb-6">
              ¿Listo para <span className="gradient-text">transformar</span> tu negocio?
            </Heading>
            <Paragraph size="lg" className="max-w-2xl mx-auto">
              Contáctanos y descubre cómo podemos llevar tu proyecto al siguiente nivel
            </Paragraph>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nombre</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Empresa</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan focus:outline-none transition-colors"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Mensaje</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan focus:outline-none transition-colors h-32 resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              <div className="text-center pt-4">
                <Button variant="primary" size="lg">
                  Enviar Mensaje 🚀
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
