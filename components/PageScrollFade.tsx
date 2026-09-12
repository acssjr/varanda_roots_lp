"use client";

import { useEffect, useRef } from "react";

const blurLayers = Array.from({ length: 8 }, (_, index) => index + 1);

export function PageScrollFade() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    let frame = 0;
    let hideThumbTimer = 0;
    let idleTimer = 0;
    let idleCallback = 0;
    let disposed = false;
    let lenis: { destroy: () => void; start: () => void; stop: () => void } | undefined;
    let pageScrollLocked = document.documentElement.classList.contains("is-scroll-locked");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleScrollLock = (event: Event) => {
      pageScrollLocked = (event as CustomEvent<{ locked: boolean }>).detail.locked;
      if (pageScrollLocked) {
        lenis?.stop();
      } else {
        lenis?.start();
      }
    };

    const initializeSmoothScroll = async () => {
      try {
        const { default: Lenis } = await import("lenis");
        if (disposed) return;
        lenis = new Lenis({
          anchors: true,
          autoRaf: true,
          duration: 1.15,
          smoothWheel: !reducedMotion.matches,
          stopInertiaOnNavigate: true,
          syncTouch: false,
          wheelMultiplier: 0.82,
        });
        if (pageScrollLocked) lenis.stop();
      } catch {
        // A stale tab can reference an expired lazy chunk after a new deploy or dev-server restart.
        // Native scrolling remains fully functional, so fail quietly instead of breaking the page.
      }
    };

    window.addEventListener("varanda:scroll-lock", handleScrollLock);

    if (window.requestIdleCallback) {
      idleCallback = window.requestIdleCallback(() => void initializeSmoothScroll(), { timeout: 1200 });
    } else {
      idleTimer = window.setTimeout(() => void initializeSmoothScroll(), 1);
    }

    const update = () => {
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      const remaining = Math.max(scrollRange - window.scrollY, 0);
      const viewportHeight = window.innerHeight;
      const documentHeight = Math.max(document.documentElement.scrollHeight, viewportHeight);
      const thumbHeight = Math.max(38, (viewportHeight / documentHeight) * viewportHeight);
      const thumbTravel = Math.max(viewportHeight - thumbHeight, 0);
      const scrollProgress = scrollRange > 0 ? Math.min(Math.max(window.scrollY / scrollRange, 0), 1) : 0;

      element.style.setProperty("--page-fade-bottom", String(Math.min(remaining / 96, 1)));
      element.style.setProperty("--scroll-thumb-height", `${Math.round(thumbHeight)}px`);
      element.style.setProperty("--scroll-thumb-y", `${Math.round(thumbTravel * scrollProgress)}px`);
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const showScrollThumb = () => {
      element.classList.add("is-scrolling");
      window.clearTimeout(hideThumbTimer);
      hideThumbTimer = window.setTimeout(() => element.classList.remove("is-scrolling"), 720);
      scheduleUpdate();
    };

    update();
    window.addEventListener("scroll", showScrollThumb, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    return () => {
      disposed = true;
      lenis?.destroy();
      window.removeEventListener("varanda:scroll-lock", handleScrollLock);
      window.removeEventListener("scroll", showScrollThumb);
      window.removeEventListener("resize", scheduleUpdate);
      if (idleCallback) window.cancelIdleCallback?.(idleCallback);
      window.clearTimeout(idleTimer);
      window.clearTimeout(hideThumbTimer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="page-scroll-fade" ref={root} aria-hidden="true">
      <div className="page-scroll-fade__edge page-scroll-fade__edge--bottom">
        {blurLayers.map((layer) => (
          <span className={`page-scroll-fade__blur page-scroll-fade__blur--${layer}`} key={layer} />
        ))}
      </div>
      <span className="page-scroll-fade__scroll-thumb" />
    </div>
  );
}
