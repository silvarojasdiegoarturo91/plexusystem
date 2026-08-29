"use client";

import { useEffect, useState } from "react";

const scenes = [
  { id: "scene-services", index: "01", label: "Origen" },
  { id: "scene-projects", index: "02", label: "Inteligencia" },
  { id: "scene-features", index: "03", label: "Velocidad" },
  { id: "scene-testimonials", index: "04", label: "Señales" },
  { id: "scene-contact", index: "05", label: "Portal" },
];

export function SceneRail() {
  const [activeScene, setActiveScene] = useState(scenes[0].id);

  useEffect(() => {
    const elements = scenes
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveScene(visible.target.id);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.1, 0.35, 0.65] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navegación de escenas"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 md:block"
    >
      <ol className="flex flex-col items-end gap-3">
        {scenes.map((scene) => {
          const isActive = activeScene === scene.id;

          return (
            <li key={scene.id}>
              <a
                href={`#${scene.id}`}
                aria-current={isActive ? "location" : undefined}
                aria-label={`Ir a escena ${scene.index}: ${scene.label}`}
                className={`group flex items-center gap-2 rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  isActive ? "text-white" : "text-white/30 hover:text-white/70"
                }`}
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">{scene.label}</span>
                <span className={`h-2 w-2 rounded-full border transition-all ${isActive ? "border-accent-cyan bg-accent-cyan shadow-[0_0_12px_rgba(0,245,212,0.8)]" : "border-white/30 bg-transparent"}`} />
                <span>{scene.index}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
