"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Float, ScaleOnScroll } from "@/components/effects/ScrollEffects";
import { Button, Heading, Paragraph } from "@/components/ui/UIComponents";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-pink/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="px-4 py-2 bg-accent-cyan/20 text-accent-cyan rounded-full text-sm font-medium border border-accent-cyan/30">
                🚀 Transformación Digital
              </span>
            </motion.div>

            <Heading level={1} gradient className="mb-6 leading-tight">
              Construimos el futuro con{' '}
              <span className="block">código inteligente</span>
            </Heading>

            <Paragraph size="lg" className="mb-8 max-w-xl">
              Somos una empresa de desarrollo de software especializada en crear soluciones 
              innovadoras: aplicaciones móviles, IA generativa, agentes inteligentes, 
              chatbots y tiendas virtuales.
            </Paragraph>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Ver Servicios
              </Button>
              <Button variant="outline" size="lg">
                Contactar
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex gap-8"
            >
              <StatItem number={150} suffix="+" label="Proyectos" />
              <StatItem number={50} suffix="+" label="Clientes" />
              <StatItem number={5} suffix="+" label="Años" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <FloatingElements />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-accent-cyan rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-accent-cyan rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function StatItem({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  return (
    <div className="text-center">
      <motion.span
        className="text-4xl font-bold gradient-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {number}{suffix}
      </motion.span>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

function FloatingElements() {
  return (
    <div className="relative w-full h-[500px]">
      <Float className="absolute top-0 left-1/4" amplitude={20} duration={4}>
        <ScaleOnScroll scaleRange={[1, 1.2]} threshold={0.2}>
          <div className="w-32 h-32 glass rounded-2xl flex items-center justify-center text-5xl border-accent-cyan/30">
            📱
          </div>
        </ScaleOnScroll>
      </Float>

      <Float className="absolute top-1/3 right-0" amplitude={25} duration={5}>
        <ScaleOnScroll scaleRange={[1, 1.15]} threshold={0.2}>
          <div className="w-28 h-28 glass rounded-2xl flex items-center justify-center text-4xl border-accent-purple/30">
            🤖
          </div>
        </ScaleOnScroll>
      </Float>

      <Float className="absolute bottom-1/4 left-0" amplitude={30} duration={6}>
        <ScaleOnScroll scaleRange={[1, 1.25]} threshold={0.2}>
          <div className="w-36 h-36 glass rounded-2xl flex items-center justify-center text-5xl border-accent-pink/30">
            💬
          </div>
        </ScaleOnScroll>
      </Float>

      <Float className="absolute bottom-0 right-1/4" amplitude={15} duration={4.5}>
        <ScaleOnScroll scaleRange={[1, 1.1]} threshold={0.2}>
          <div className="w-24 h-24 glass rounded-2xl flex items-center justify-center text-3xl border-accent-yellow/30">
            🛒
          </div>
        </ScaleOnScroll>
      </Float>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-64 h-64 border border-dashed border-accent-cyan/30 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-48 h-48 border border-dashed border-accent-purple/30 rounded-full" />
      </motion.div>
    </div>
  );
}
