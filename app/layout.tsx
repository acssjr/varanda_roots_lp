import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varanda Roots",
  description:
    "Aulas de Forró Roots, bailes e workshops com Pía e PC no Rio Vermelho, Salvador.",
  icons: { icon: "/brand/icone-varanda-roots-colorido-redondo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/SaansCollectionVF-Latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
