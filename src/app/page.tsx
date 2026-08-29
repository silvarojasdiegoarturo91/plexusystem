import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { SceneFrame } from "@/components/effects/SceneFrame";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      <HeroSection />
      <SceneFrame index="01" eyebrow="Sistema de origen" tone="origin">
        <ServicesSection />
      </SceneFrame>
      <SceneFrame index="02" eyebrow="Inteligencia aplicada" tone="intelligence">
        <ProjectsSection />
      </SceneFrame>
      <SceneFrame index="03" eyebrow="Velocidad de ejecución" tone="velocity">
        <FeaturesSection />
      </SceneFrame>
      <SceneFrame index="04" eyebrow="Señales del futuro" tone="signal">
        <TestimonialsSection />
      </SceneFrame>
      <SceneFrame index="05" eyebrow="Abrir un portal" tone="contact">
        <ContactSection />
      </SceneFrame>
      <SceneFrame index="06" eyebrow="Continuar el viaje" tone="origin">
        <Footer />
      </SceneFrame>
    </main>
  );
}
