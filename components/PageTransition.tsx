"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./BrandMark";

type TransitionPhase = "preparing" | "covering" | "revealing";
type TransitionTone = "classes" | "events" | "course" | "people" | "contact" | "home";

type TransitionTarget = {
  slug: string;
  label: string;
  tone: TransitionTone;
};

type ActiveTransition = TransitionTarget & {
  href: string;
  locale: "pt" | "en";
  phase: TransitionPhase;
};

const transitionTargets: Record<"pt" | "en", TransitionTarget[]> = {
  pt: [
    { slug: "aulas", label: "Aulas", tone: "classes" },
    { slug: "eventos", label: "Eventos", tone: "events" },
    { slug: "curso", label: "Curso", tone: "course" },
    { slug: "pia-e-pc", label: "Pía e PC", tone: "people" },
    { slug: "contato", label: "Contato", tone: "contact" },
  ],
  en: [
    { slug: "classes", label: "Classes", tone: "classes" },
    { slug: "events", label: "Events", tone: "events" },
    { slug: "course", label: "Course", tone: "course" },
    { slug: "pia-and-pc", label: "Pía & PC", tone: "people" },
    { slug: "contact", label: "Contact", tone: "contact" },
  ],
};

function homeLocale(pathname: string) {
  const match = pathname.match(/^\/(pt|en)\/?$/);
  return match?.[1] as "pt" | "en" | undefined;
}

function normalizedPath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [transition, setTransition] = useState<ActiveTransition | null>(null);
  const activeRef = useRef(false);
  const preparationFrameRef = useRef<number | undefined>(undefined);
  const navigationTimerRef = useRef<number | undefined>(undefined);
  const revealTimerRef = useRef<number | undefined>(undefined);
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    const sourceLocale = homeLocale(pathname);

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.download || (link.target && link.target !== "_self") || link.dataset.noPageTransition !== undefined) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const destinationLocale = normalizedPath(url.pathname).match(/^\/(pt|en)$/)?.[1] as "pt" | "en" | undefined;
      const isHomeReturn = link.dataset.pageTransition === "home" && destinationLocale;
      const target = isHomeReturn
        ? { slug: "", label: destinationLocale === "pt" ? "Início" : "Home", tone: "home" as const }
        : sourceLocale
          ? transitionTargets[sourceLocale].find(({ slug }) => normalizedPath(url.pathname) === `/${sourceLocale}/${slug}`)
          : undefined;
      const locale = isHomeReturn ? destinationLocale : sourceLocale;
      if (!target || !locale) return;

      event.preventDefault();
      if (activeRef.current) return;

      activeRef.current = true;
      const href = `${url.pathname}${url.search}${url.hash}`;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      router.prefetch(href);
      setTransition({ ...target, href, locale, phase: "preparing" });
      preparationFrameRef.current = window.requestAnimationFrame(() => {
        preparationFrameRef.current = window.requestAnimationFrame(() => {
          setTransition((current) => current ? { ...current, phase: "covering" } : null);
          navigationTimerRef.current = window.setTimeout(() => router.push(href), reduceMotion ? 180 : 760);
        });
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, router]);

  useEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;
    if (!activeRef.current) return;

    window.clearTimeout(navigationTimerRef.current);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTransition((current) => current ? { ...current, phase: "revealing" } : null);
    revealTimerRef.current = window.setTimeout(() => {
      activeRef.current = false;
      setTransition(null);
    }, reduceMotion ? 220 : 680);
  }, [pathname]);

  useEffect(() => () => {
    window.cancelAnimationFrame(preparationFrameRef.current ?? 0);
    window.clearTimeout(navigationTimerRef.current);
    window.clearTimeout(revealTimerRef.current);
  }, []);

  const phase = transition?.phase ?? "idle";

  return (
    <div
      className={`route-transition route-transition--${transition?.tone ?? "classes"}`}
      data-state={phase}
      aria-hidden={!transition}
    >
      <span className="route-transition__panel route-transition__panel--left" />
      <span className="route-transition__panel route-transition__panel--right" />
      <div className="route-transition__lockup" role="status" aria-live="polite">
        <span className="route-transition__brand"><BrandMark /></span>
        <span className="route-transition__destination">
          <strong>{transition?.label}</strong>
        </span>
      </div>
    </div>
  );
}
