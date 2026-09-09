"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/site-content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type PageData = {
  eyebrow: string;
  title: string;
  intro: string;
  theme: "yellow" | "blue" | "light" | "dark";
  sections: { title: string; body: string }[];
};

export function InternalPageView({ locale, page }: { locale: Locale; page: PageData }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".internal-hero > *", { y: 42, opacity: 0, duration: 0.9, stagger: 0.09, ease: "power3.out" });
    gsap.from(".internal-card", {
      y: 52,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".internal-grid", start: "top 80%", once: true },
    });
  }, { scope: root });

  return (
    <main ref={root} className={`internal-page internal-page--${page.theme}`}>
      <section className="page-shell internal-hero">
        <span className="eyebrow">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>
      <section className="page-shell internal-grid">
        {page.sections.map((section, index) => (
          <article className="internal-card" key={section.title}>
            <span>0{index + 1}</span><h2>{section.title}</h2><p>{section.body}</p>
          </article>
        ))}
      </section>
      <section className="page-shell internal-back">
        <Link href={`/${locale}`}>← {locale === "pt" ? "Voltar ao início" : "Back home"}</Link>
      </section>
    </main>
  );
}
