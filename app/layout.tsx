import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varanda Roots",
  description:
    "Escola, festa, comunidade e casa de Forró Roots no Rio Vermelho, em Salvador.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
