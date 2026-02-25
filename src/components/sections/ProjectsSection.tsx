"use client";

import { motion } from "framer-motion";
import { ScrollReveal, ScaleOnScroll } from "@/components/effects/ScrollEffects";
import { Heading, Paragraph, Badge, Card } from "@/components/ui/UIComponents";

const projects = [
  {
    title: "TechEcommerce Pro",
    client: "TechCorp",
    description: "Plataforma de e-commerce completa con gestión de inventario, pasarelas de pago y panel de administración.",
    image: "🛒",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    color: "cyan" as const,
    year: "2024",
  },
  {
    title: "IA Customer Support",
    "client": "ServiceHub",
    description: "Sistema de atención al cliente potenciado con IA que maneja el 80% de consultas automáticamente.",
    image: "🎧",
    tags: ["Python", "GPT-4", "Twilio"],
    color: "purple" as const,
    year: "2024",
  },
  {
    title: "HealthTrack App",
    client: "MediCare Plus",
    description: "Aplicación móvil para seguimiento de salud con sincronización de dispositivos wearables.",
    image: "🏥",
    tags: ["React Native", "Firebase", "AWS"],
    color: "pink" as const,
    year: "2023",
  },
  {
    title: "Finance Dashboard",
    client: "Inversiones Global",
    description: "Dashboard en tiempo real para gestión de inversiones con análisis predictivo de mercados.",
    image: "📊",
    tags: ["Vue.js", "D3.js", "Python"],
    color: "yellow" as const,
    year: "2023",
  },
  {
    title: "Logistics Platform",
    client: "Transporte Express",
    description: "Sistema de gestión de flotas con tracking GPS en tiempo real y optimización de rutas.",
    image: "🚚",
    tags: ["React", "Google Maps API", "Node.js"],
    color: "cyan" as const,
    year: "2023",
  },
  {
    title: "EduLearn Platform",
    client: "Academia Virtual",
    description: "Plataforma de educación online con clases en vivo, cursos grabados y certificación digital.",
    image: "🎓",
    tags: ["Next.js", "WebRTC", "MongoDB"],
    color: "purple" as const,
    year: "2024",
  },
];

const colorClasses = {
  cyan: {
    border: "border-accent-cyan",
    bg: "bg-accent-cyan/20",
    text: "text-accent-cyan",
    glow: "hover:shadow-[0_0_40px_rgba(0,245,212,0.3)]",
  },
  purple: {
    border: "border-accent-purple",
    bg: "bg-accent-purple/20",
    text: "text-accent-purple",
    glow: "hover:shadow-[0_0_40px_rgba(155,93,229,0.3)]",
  },
  pink: {
    border: "border-accent-pink",
    bg: "bg-accent-pink/20",
    text: "text-accent-pink",
    glow: "hover:shadow-[0_0_40px_rgba(241,91,181,0.3)]",
  },
  yellow: {
    border: "border-accent-yellow",
    bg: "bg-accent-yellow/20",
    text: "text-accent-yellow",
    glow: "hover:shadow-[0_0_40px_rgba(250,204,21,0.3)]",
  },
};

export function ProjectsSection() {
  return (
    <section id="proyectos" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent-cyan/10 via-transparent to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-radial from-accent-purple/10 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-20">
          <Badge color="purple" className="mb-4">Proyectos</Badge>
          <Heading level={2} className="mb-6">
            Casos de <span className="gradient-text">éxito</span>
          </Heading>
          <Paragraph size="lg" className="max-w-2xl mx-auto">
            Solutions we've delivered to transform businesses across industries
          </Paragraph>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            ¿Listo para ser nuestro próximo caso de éxito?{' '}
            <a href="#contacto" className="text-accent-cyan hover:underline">
              Contáctanos
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const colors = colorClasses[project.color];

  return (
    <ScaleOnScroll
      scaleRange={[1, 1.03]}
      threshold={0.3}
      className="h-full"
    >
      <Card className="h-full" glow={project.color}>
        <div className="relative">
          <div className="text-6xl mb-4">{project.image}</div>
          <span className={`absolute top-0 right-0 text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
            {project.year}
          </span>
        </div>
        
        <div className="mb-4">
          <span className={`text-xs ${colors.text}`}>Cliente: {project.client}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </ScaleOnScroll>
  );
}
