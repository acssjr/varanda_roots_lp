import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InternalPageView } from "@/components/InternalPageView";
import { richInternalPages } from "@/lib/rich-page-content";
import { internalPages, isLocale } from "@/lib/site-content";

export function generateStaticParams() {
  return [
    ...Object.keys(internalPages.pt).map((slug) => ({ locale: "pt", slug })),
    ...Object.keys(internalPages.en).map((slug) => ({ locale: "en", slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = richInternalPages[locale][slug] ?? internalPages[locale][slug];
  return page ? { title: `${page.title} | Varanda Roots`, description: page.intro } : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = richInternalPages[locale][slug] ?? internalPages[locale][slug];
  if (!page) notFound();
  return <InternalPageView locale={locale} page={page} />;
}
