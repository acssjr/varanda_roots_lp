import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { DocumentLanguage } from "@/components/DocumentLanguage";
import { PageScrollFade } from "@/components/PageScrollFade";
import { PageTransition } from "@/components/PageTransition";
import { isLocale } from "@/lib/site-content";

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div id="top">
      <DocumentLanguage locale={locale} />
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
      <PageScrollFade />
      <PageTransition />
    </div>
  );
}
