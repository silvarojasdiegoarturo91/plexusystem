import type { Metadata } from "next";
import "./globals.css";
import { VisitTracker } from "@/components/VisitTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://plexusystem.com"),
  title: {
    default: "PlexuSystem - Desarrollo de Software Innovador",
    template: "%s | PlexuSystem",
  },
  description: "Desarrollamos aplicaciones móviles, IA generativa, agentes inteligentes, chatbots y tiendas virtuales. Soluciones de vanguardia para tu negocio.",
  keywords: ["desarrollo de software", "aplicaciones móviles", "IA", "inteligencia artificial", "chatbots", "agentes AI", "tiendas virtuales", "e-commerce", "desarrollo web", "apps"],
  authors: [{ name: "PlexuSystem" }],
  creator: "PlexuSystem",
  publisher: "PlexuSystem",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://plexusystem.com",
    siteName: "PlexuSystem",
    title: "PlexuSystem - Desarrollo de Software Innovador",
    description: "Desarrollamos aplicaciones móviles, IA generativa, agentes inteligentes, chatbots y tiendas virtuales. Soluciones de vanguardia para tu negocio.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlexuSystem - Desarrollo de Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlexuSystem - Desarrollo de Software Innovador",
    description: "Desarrollamos aplicaciones móviles, IA generativa, agentes inteligentes, chatbots y tiendas virtuales.",
    images: ["/og-image.png"],
    creator: "@plexusystem",
  },
  verification: {
    google: "google-site-verification-code",
  },
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
