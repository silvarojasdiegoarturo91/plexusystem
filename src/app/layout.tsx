import type { Metadata } from "next";
import "./globals.css";
import { VisitTracker } from "@/components/VisitTracker";

export const metadata: Metadata = {
  title: "PlexuSystem - Desarrollo de Software Innovador",
  description: "Desarrollamos aplicaciones móviles, IA generativa, agentes inteligentes, chatbots y tiendas virtuales. Soluciones de vanguardia para tu negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
