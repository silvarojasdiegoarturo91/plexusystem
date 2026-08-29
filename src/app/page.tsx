import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { SceneFrame } from "@/components/effects/SceneFrame";
import { SceneRail } from "@/components/effects/SceneRail";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen scroll-mt-24 bg-dark">
      <Navbar />
      <SceneRail />
      <HeroSection />
      <SceneFrame id="scene-services" index="01" eyebrow="Sistema de origen" tone="origin">
        <ServicesSection />
      </SceneFrame>
      <SceneFrame id="scene-projects" index="02" eyebrow="Inteligencia aplicada" tone="intelligence">
        <ProjectsSection />
      </SceneFrame>
      <SceneFrame id="scene-features" index="03" eyebrow="Velocidad de ejecución" tone="velocity">
        <FeaturesSection />
      </SceneFrame>
      <SceneFrame id="scene-testimonials" index="04" eyebrow="Señales del futuro" tone="signal">
        <TestimonialsSection />
      </SceneFrame>
      <SceneFrame id="scene-contact" index="05" eyebrow="Abrir un portal" tone="contact">
        <ContactSection />
      </SceneFrame>
      <SceneFrame id="scene-footer" index="06" eyebrow="Continuar el viaje" tone="origin">
        <Footer />
      </SceneFrame>
    </main>
  );
}
