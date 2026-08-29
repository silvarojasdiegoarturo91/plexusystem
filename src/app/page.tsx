"use client";

import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Preloader } from "@/components/effects/Preloader";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader duration={2500} />
      <main className="min-h-screen bg-dark">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
