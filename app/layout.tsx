import type { Metadata } from "next";
import { PageScrollFade } from "@/components/PageScrollFade";
import { PageTransition } from "@/components/PageTransition";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varanda Roots",
  description:
    "Aulas de Forró Roots, bailes e workshops com Pía e PC no Rio Vermelho, Salvador.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        {children}
        <PageScrollFade />
        <PageTransition />
      </body>
    </html>
  );
}
