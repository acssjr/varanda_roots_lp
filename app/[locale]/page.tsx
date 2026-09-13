import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { isLocale } from "@/lib/site-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "pt" ? "Forró Roots em Salvador | Varanda Roots" : "Forró Roots in Salvador | Varanda Roots",
    description: locale === "pt"
      ? "Aulas em grupo e particulares, bailes e workshops com Pía e PC. Conheça a Varanda Roots no Rio Vermelho, Salvador, e o curso online."
      : "Group and private forró classes, social dances and workshops with Pía and PC. Meet Varanda Roots in Rio Vermelho, Salvador, and explore the online course.",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
