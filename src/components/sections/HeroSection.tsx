"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Bot, MessageCircle, ShoppingCart, Smartphone } from "lucide-react";
import { Button, Heading, Paragraph } from "@/components/ui/UIComponents";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.55], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.65], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.65], [1, 1.08]);
  const nextPanelOpacity = useTransform(scrollYProgress, [0.35, 0.55, 0.8], [0, 1, 1]);
  const nextPanelY = useTransform(scrollYProgress, [0.35, 0.55], [80, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[220vh] overflow-clip"
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent-cyan/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-purple/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-pink/20 blur-3xl" />
        </motion.div>

        <motion.div style={{ y, opacity }} className="container relative z-10 mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
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
              <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/20 px-4 py-2 text-sm font-medium text-accent-cyan">
                <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_10px_currentColor]" />Transformación Digital</span>
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

            <motion.div style={{ scale }} className="relative">
              <FloatingElements scrollYProgress={scrollYProgress} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: nextPanelOpacity, y: nextPanelY }}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-20 mx-auto max-w-3xl -translate-y-1/2 px-6 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-accent-cyan">
            De la idea a la experiencia
          </p>
          <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Tecnología que se mueve al ritmo de tu negocio.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            Desplazate para descubrir cómo convertimos problemas complejos en productos digitales claros, rápidos y memorables.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [1, 0]) }}
          className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-center text-xs uppercase tracking-[0.3em] text-gray-400"
        >
          <span>Desplazate para comenzar</span>
          <span className="mx-auto mt-3 block h-10 w-px bg-gradient-to-b from-accent-cyan to-transparent" />
        </motion.div>
      </div>
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

function FloatingElements({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const aiY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const chatX = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cartX = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const ringReverseRotate = useTransform(ringRotate, (value) => -value * 0.7);

  return (
    <div className="relative w-full h-[500px]">
      <motion.div style={{ y: phoneY, rotate: phoneRotate }} className="absolute left-1/4 top-0">
        <div className="glass flex h-32 w-32 items-center justify-center rounded-2xl border-accent-cyan/30 text-accent-cyan"><Smartphone aria-hidden="true" className="h-12 w-12" /></div>
      </motion.div>

      <motion.div style={{ y: aiY }} className="absolute right-0 top-1/3">
        <div className="glass flex h-28 w-28 items-center justify-center rounded-2xl border-accent-purple/30 text-accent-purple"><Bot aria-hidden="true" className="h-10 w-10" /></div>
      </motion.div>

      <motion.div style={{ x: chatX }} className="absolute bottom-1/4 left-0">
        <div className="glass flex h-36 w-36 items-center justify-center rounded-2xl border-accent-pink/30 text-accent-pink"><MessageCircle aria-hidden="true" className="h-12 w-12" /></div>
      </motion.div>

      <motion.div style={{ x: cartX }} className="absolute bottom-0 right-1/4">
        <div className="glass flex h-24 w-24 items-center justify-center rounded-2xl border-accent-yellow/30 text-accent-yellow"><ShoppingCart aria-hidden="true" className="h-8 w-8" /></div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ rotate: ringRotate }}
      >
        <div className="w-64 h-64 border border-dashed border-accent-cyan/30 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ rotate: ringReverseRotate }}
      >
        <div className="w-48 h-48 border border-dashed border-accent-purple/30 rounded-full" />
      </motion.div>
    </div>
  );
}
