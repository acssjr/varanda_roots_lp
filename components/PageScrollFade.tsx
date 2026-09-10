"use client";

import { useEffect, useRef } from "react";

export function PageScrollFade() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    let frame = 0;
    const update = () => {
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      const remaining = Math.max(scrollRange - window.scrollY, 0);
      const headerHeight = document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().height ?? 0;

      element.style.setProperty("--page-fade-top", String(Math.min(window.scrollY / 96, 1)));
      element.style.setProperty("--page-fade-bottom", String(Math.min(remaining / 96, 1)));
      element.style.setProperty("--page-fade-header", `${Math.round(headerHeight)}px`);
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="page-scroll-fade" ref={root} aria-hidden="true">
      <span className="page-scroll-fade__edge page-scroll-fade__edge--top" />
      <span className="page-scroll-fade__edge page-scroll-fade__edge--bottom" />
    </div>
  );
}
