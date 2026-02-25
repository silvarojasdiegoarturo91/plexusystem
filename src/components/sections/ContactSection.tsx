"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollEffects";
import { Heading, Paragraph, Button, Badge } from "@/components/ui/UIComponents";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Mensaje enviado correctamente. Te contactaremos pronto.' });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus({ type: 'error', message: data.error || 'Error al enviar el mensaje' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error de conexión. Intenta de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

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
            {status && (
              <div className={`mb-6 p-4 rounded-xl ${
                status.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Empresa</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan focus:outline-none transition-colors"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan focus:outline-none transition-colors h-32 resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              <div className="text-center pt-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar Mensaje 🚀'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
