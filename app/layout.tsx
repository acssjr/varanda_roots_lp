import type { Metadata } from "next";
import { PageScrollFade } from "@/components/PageScrollFade";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varanda Roots",
  description:
    "Escola, festa, comunidade e casa de Forró Roots no Rio Vermelho, em Salvador.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        {children}
        <PageScrollFade />
      </body>
    </html>
  );
}
