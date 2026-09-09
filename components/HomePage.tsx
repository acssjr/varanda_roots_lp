"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeContent, type Locale } from "@/lib/site-content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomePage({ locale }: { locale: Locale }) {
  const content = homeContent[locale];
  const mainRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let timer: number | undefined;
    const start = () => {
      window.clearInterval(timer);
      if (document.visibilityState === "visible") {
        timer = window.setInterval(() => {
          setActiveSlide((current) => (current + 1) % content.slides.length);
        }, 6500);
      }
    };

    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", start);
    };
  }, [content.slides.length]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
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

  return (
    <main ref={mainRef}>
      <section className="hero" aria-roledescription="carousel" aria-label={locale === "pt" ? "Universo Varanda Roots" : "Varanda Roots universe"}>
        <div className="hero__slides" ref={slidesRef}>
          {content.slides.map((slide, index) => (
            <div className="hero__slide" key={slide.title} aria-hidden={index !== activeSlide}>
              <Image src={slide.image} alt={slide.imageAlt} fill priority sizes="100vw" />
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
            <Link className="round-link round-link--yellow" href={`/${locale}${active.href}`}>
              <span>{content.discover}</span><i aria-hidden="true">↗</i>
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
          <h2>{content.manifest}</h2>
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
                  <Image src={content.slides[[0, 2, 3][index]].image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                </div>
                <div className="class-card__body">
                  <span>0{index + 1}</span><h3>{title}</h3>
                  <div className="class-card__footer"><p>{body}</p><i aria-hidden="true">↗</i></div>
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
              <article className="agenda-item" key={item.title}>
                <span className="agenda-item__number">0{index + 1}</span>
                <div className="agenda-item__title"><span>{item.type}</span><h3>{item.title}</h3></div>
                <div className="agenda-item__meta"><span>{item.place}</span><strong>{item.status}</strong></div>
                <i aria-hidden="true">↗</i>
              </article>
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
            <Link className="round-link round-link--blue" href={`/${locale}/${locale === "pt" ? "curso" : "course"}`} data-reveal><span>{content.courseLink}</span><i>↗</i></Link>
          </div>
        </div>
      </section>

      <section className="duo chapter chapter--dark">
        <div className="page-shell duo__grid">
          <div className="duo__image-wrap">
            <Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=86" alt="" fill sizes="(max-width: 800px) 100vw, 50vw" />
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
            <p>{content.visitBody}</p>
            <a className="round-link round-link--blue" href="https://www.google.com/maps/dir/?api=1&destination=Rua+Deputado+Cunha+Bueno+55%2C+Rio+Vermelho%2C+Salvador%2C+BA" target="_blank" rel="noreferrer">
              <span>{locale === "pt" ? "Como chegar" : "Get directions"}</span><i>↗</i>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
