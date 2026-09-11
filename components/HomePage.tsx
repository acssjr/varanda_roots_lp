"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ActionArrow } from "./ActionArrow";
import { homeContent, type Locale } from "@/lib/site-content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GOOGLE_MAPS_ROUTE = "https://www.google.com/maps/dir/?api=1&destination=Rua+Deputado+Cunha+Bueno+55%2C+Rio+Vermelho%2C+Salvador%2C+BA";
const WAZE_ROUTE = "https://ul.waze.com/ul?place=ChIJ52z4fWsDFgcRf1jeybK-zmM&ll=-13.01066800%2C-38.48298000&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location";

function RouteServiceIcon({ service }: { service: "maps" | "waze" }) {
  if (service === "maps") {
    return (
      <svg className="route-service-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#34a853" d="M12 2a7.5 7.5 0 0 0-7.5 7.5C4.5 15.1 12 22 12 22s7.5-6.9 7.5-12.5A7.5 7.5 0 0 0 12 2Z" />
        <path fill="#fbbc04" d="M4.8 7.4 12 22v-9.4a3.1 3.1 0 0 1-2.9-2L4.8 7.4Z" />
        <path fill="#4285f4" d="M12 2a7.5 7.5 0 0 0-7.2 5.4l4.3 3.2A3.1 3.1 0 0 1 12 6.4V2Z" />
        <path fill="#ea4335" d="M12 2v4.4a3.1 3.1 0 0 1 2.9 4.2l4.1 3.1c.3-1.3.5-2.7.5-4.2A7.5 7.5 0 0 0 12 2Z" />
        <circle cx="12" cy="9.5" r="2" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg className="route-service-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.2C4 7.7 7.5 4 12 4s8 3.7 8 8.2c0 3.7-2.8 6.8-6.5 7.7H9.7a7.9 7.9 0 0 1-3.5-1.8L3 19l1.2-3.1a8 8 0 0 1-.2-3.7Z" fill="#33ccff" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
      <path d="M9 15c1.7 1.1 4.3 1.1 6 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.3" />
    </svg>
  );
}

function LocationIcon({ type }: { type: string }) {
  if (type === "beach") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 15c2.2-2 4.2-2 6.2 0s4 2 6 0 3.8-2 5.8-.2M4 19c1.8-1.4 3.5-1.4 5.2 0s3.5 1.4 5.2 0 3.4-1.4 5.2 0M17 5a4 4 0 0 1 2 5.5M17 3v1M22 8h-1M20.5 4.5l-.8.8" />
      </svg>
    );
  }

  if (type === "community") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="8" r="2.5" /><circle cx="16" cy="8" r="2.5" />
        <path d="M3.5 18c.4-3 2-4.7 4.5-4.7s4.1 1.7 4.5 4.7M11.5 18c.4-3 2-4.7 4.5-4.7s4.1 1.7 4.5 4.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 9 8-5 8 5M5 20h14M7 18v-7M12 18v-7M17 18v-7" />
    </svg>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const content = homeContent[locale];
  const mainRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let timer: number | undefined;
    let isFirstCycle = true;

    const advance = () => {
      setActiveSlide((current) => (current + 1) % content.slides.length);
      isFirstCycle = false;
      timer = window.setTimeout(advance, 6500);
    };

    const start = () => {
      window.clearTimeout(timer);
      if (document.visibilityState === "visible") {
        timer = window.setTimeout(advance, isFirstCycle ? 10000 : 6500);
      }
    };

    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", start);
    };
  }, [content.slides.length]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]:not(.class-card)").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.fromTo(
        ".manifest",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifest", start: "top 94%", once: true },
        },
      );

      gsap.fromTo(
        ".manifest__grid > *",
        { yPercent: 8, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifest", start: "top 90%", once: true },
        },
      );

      gsap.fromTo(
        ".manifest__highlight",
        { "--highlight-progress": "0%" },
        {
          "--highlight-progress": "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".manifest",
            start: "top 74%",
            end: "center 46%",
            scrub: 0.55,
          },
        },
      );

      const cardsMedia = gsap.matchMedia();

      cardsMedia.add("(min-width: 761px)", () => {
        gsap.fromTo(
          ".class-card",
          { yPercent: 8, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: ".class-grid", start: "top 88%", once: true },
          },
        );
      });

      cardsMedia.add("(max-width: 760px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".class-card");
        gsap.set(cards[0], { yPercent: 0, rotateX: 0, scale: 1 });

        cards.slice(1).forEach((card) => {
          gsap.fromTo(
            card,
            { yPercent: 18, rotateX: -6, scale: 0.96 },
            {
              yPercent: 0,
              rotateX: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 100%",
                end: "top 62%",
                scrub: 0.8,
              },
            },
          );
        });
      });

      gsap.from(".duo__image-wrap", {
        scale: 0.96,
        opacity: 0.4,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".duo",
          start: "top 78%",
          once: true,
        },
      });

      return () => cardsMedia.revert();
    },
    { scope: mainRef },
  );

  useGSAP(
    () => {
      if (!slidesRef.current) return;
      const slides = gsap.utils.toArray<HTMLElement>(".hero__slide", slidesRef.current);
      const activeElement = slides[activeSlide];
      const inactiveElements = slides.filter((_, index) => index !== activeSlide);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(activeElement, { zIndex: 2 });
      gsap.set(inactiveElements, { zIndex: 1 });

      if (reduceMotion) {
        gsap.set(inactiveElements, { autoAlpha: 0, scale: 1 });
        gsap.set(activeElement, { autoAlpha: 1, scale: 1 });
        gsap.set(".hero__copy", { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline();
      timeline
        .to(inactiveElements, { autoAlpha: 0, scale: 1.01, duration: 0.7, ease: "power2.out", overwrite: true }, 0)
        .fromTo(activeElement, { autoAlpha: 0, scale: 1.025 }, { autoAlpha: 1, scale: 1, duration: 0.82, ease: "power2.out", overwrite: true }, 0)
        .fromTo(".hero__copy", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: true }, 0.16);
    },
    { scope: mainRef, dependencies: [activeSlide] },
  );

  const active = content.slides[activeSlide];
  const manifestHighlight = locale === "pt" ? "Forró Roots em Salvador." : "Forró Roots in Salvador.";
  const manifestLead = content.manifest.slice(0, -manifestHighlight.length).trimEnd();

  return (
    <main ref={mainRef}>
      <section className="hero" aria-roledescription="carousel" aria-label={locale === "pt" ? "Universo Varanda Roots" : "Varanda Roots universe"}>
        <div className="hero__slides" ref={slidesRef}>
          {content.slides.map((slide, index) => (
            <div className="hero__slide" key={slide.title} aria-hidden={index !== activeSlide}>
              <Image className="hero__desktop-image" src={slide.image} alt={slide.imageAlt} fill priority={index === 0} quality={88} sizes="100vw" />
              <Image className="hero__mobile-image" src={slide.mobileImage} alt="" fill priority={index === 0} quality={88} sizes="100vw" />
            </div>
          ))}
        </div>
        <div className="hero__shade" />
        <div className="page-shell hero__content">
          <div className="hero__copy" key={active.title}>
            <span className="eyebrow eyebrow--light">{content.eyebrow}</span>
            <span className="hero__kicker">{active.kicker}</span>
            <h1>{active.title}</h1>
            <p>{active.text}</p>
            <Link className="round-link round-link--yellow action-link" href={`/${locale}${active.href}`}>
              <span>{content.discover}</span><ActionArrow />
            </Link>
          </div>
          <div className="hero__controls" aria-label={locale === "pt" ? "Selecionar imagem" : "Select image"}>
            <span className="hero__counter">0{activeSlide + 1} / 0{content.slides.length}</span>
            <div className="hero__dots">
              {content.slides.map((slide, index) => (
                <button key={slide.title} type="button" className={index === activeSlide ? "is-active" : ""} onClick={() => setActiveSlide(index)} aria-label={`${locale === "pt" ? "Mostrar" : "Show"} ${slide.kicker}`}>
                  <i />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="manifest chapter chapter--yellow">
        <div className="page-shell manifest__grid">
          <span className="eyebrow">{content.manifestKicker}</span>
          <h2>
            {manifestLead}
            <span className="manifest__highlight-row"><span className="manifest__highlight">{manifestHighlight}</span></span>
          </h2>
          <p>{content.manifestBody}</p>
        </div>
      </section>

      <section className="classes chapter chapter--blue">
        <div className="page-shell">
          <div className="section-heading">
            <span className="eyebrow eyebrow--light" data-reveal>{content.classesKicker}</span>
            <h2 data-reveal>{content.classesTitle}</h2>
            <p data-reveal>{content.classesBody}</p>
          </div>
          <div className="class-grid">
            {content.classCards.map(([title, body], index) => (
              <article className="class-card" key={title} data-reveal>
                <div className="class-card__image">
                  <Image src={content.classImages[index]} alt="" fill quality={82} sizes="(max-width: 760px) calc(100vw - 36px), 33vw" />
                </div>
                <div className="class-card__body">
                  <span>0{index + 1}</span><h3>{title}</h3>
                  <div className="class-card__footer"><p>{body}</p></div>
                </div>
              </article>
            ))}
          </div>
          <Link className="text-link text-link--light" href={`/${locale}/${locale === "pt" ? "aulas" : "classes"}`}>{content.learnMore} →</Link>
        </div>
      </section>

      <section className="agenda chapter chapter--light">
        <div className="page-shell">
          <div className="section-heading section-heading--split">
            <div><span className="eyebrow" data-reveal>{content.agendaKicker}</span><h2 data-reveal>{content.agendaTitle}</h2></div>
            <p data-reveal>{content.agendaNote}</p>
          </div>
          <div className="agenda-list" data-reveal>
            {content.agendaItems.map((item, index) => (
              <Link className="agenda-item" href={`/${locale}${item.href}`} key={item.title} aria-label={`${item.title}: ${item.status}`}>
                <span className="agenda-item__number">0{index + 1}</span>
                <div className="agenda-item__title"><span>{item.type}</span><h3>{item.title}</h3></div>
                <div className="agenda-item__meta"><span>{item.place}</span><strong>{item.status}</strong></div>
                <ActionArrow />
              </Link>
            ))}
          </div>
          <Link className="text-link" href={`/${locale}/${locale === "pt" ? "eventos" : "events"}`}>{content.allEvents} →</Link>
        </div>
      </section>

      <section className="course chapter chapter--yellow">
        <div className="page-shell course__grid">
          <div className="course__visual" data-reveal>
            <span className="course__ring course__ring--one" /><span className="course__ring course__ring--two" />
            <span className="course__icon-mask" aria-hidden="true" />
            <strong>ROOTS</strong><small>{locale === "pt" ? "curso online" : "online course"}</small>
          </div>
          <div className="section-heading course__copy">
            <span className="eyebrow" data-reveal>{content.courseKicker}</span>
            <h2 data-reveal>{content.courseTitle}</h2>
            <p data-reveal>{content.courseBody}</p>
            <Link className="round-link round-link--blue action-link" href={`/${locale}/${locale === "pt" ? "curso" : "course"}`} data-reveal><span>{content.courseLink}</span><ActionArrow /></Link>
          </div>
        </div>
      </section>

      <section className="duo chapter chapter--dark">
        <div className="page-shell duo__grid">
          <span className="eyebrow eyebrow--yellow duo__mobile-kicker" data-reveal>{content.duoKicker}</span>
          <div className="duo__image-wrap">
            <Image src="/images/instagram/optimized/photos/pia-pc-casacos-varanda-roots-DYkNlnOjRZq.webp" alt="" fill sizes="(max-width: 800px) calc(100vw - 32px), 50vw" />
          </div>
          <div className="section-heading duo__copy">
            <span className="eyebrow eyebrow--yellow" data-reveal>{content.duoKicker}</span>
            <h2 data-reveal>{content.duoTitle}</h2>
            <p data-reveal>{content.duoBody}</p>
            <Link className="text-link text-link--light" href={`/${locale}/${locale === "pt" ? "pia-e-pc" : "pia-and-pc"}`} data-reveal>{content.duoLink} →</Link>
          </div>
        </div>
      </section>

      <section className="visit chapter chapter--light">
        <div className="page-shell visit__heading">
          <span className="eyebrow" data-reveal>{content.visitKicker}</span>
          <h2 data-reveal>{content.visitTitle}</h2>
        </div>
        <div className="page-shell visit__map-grid" data-reveal>
          <div className="visit__map">
            <iframe
              src="https://www.google.com/maps?q=Rua%20Deputado%20Cunha%20Bueno%2C%2055%2C%20Rio%20Vermelho%2C%20Salvador%2C%20BA&output=embed"
              title={locale === "pt" ? "Mapa da Varanda Roots" : "Varanda Roots map"}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="visit__details">
            <div className="visit__address-block">
              <span className="visit__neighborhood">{content.visitNeighborhood}</span>
              <p className="visit__address">{content.visitBody}</p>
            </div>
            <div className="visit__nearby">
              {content.visitNearby.map((item) => (
                <div className="visit__nearby-item" key={item.place}>
                  <span className="visit__nearby-icon"><LocationIcon type={item.icon} /></span>
                  <span><strong>{item.time}</strong><small>{item.place}</small></span>
                </div>
              ))}
            </div>
            <div className="visit__actions">
              <a className="round-link round-link--blue action-link" href={GOOGLE_MAPS_ROUTE} target="_blank" rel="noreferrer">
                <RouteServiceIcon service="maps" /><span>{content.visitMapsLabel}</span><ActionArrow />
              </a>
              <a className="round-link round-link--waze action-link" href={WAZE_ROUTE} target="_blank" rel="noreferrer">
                <RouteServiceIcon service="waze" /><span>{content.visitWazeLabel}</span><ActionArrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
