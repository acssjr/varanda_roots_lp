"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ActionArrow } from "./ActionArrow";
import type { RichInternalPage, PageAction } from "@/lib/rich-page-content";
import type { Locale } from "@/lib/site-content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SimplePage = {
  eyebrow: string;
  title: string;
  intro: string;
  theme: "yellow" | "blue" | "light" | "dark";
  sections: { title: string; body: string }[];
};

type PageData = SimplePage | RichInternalPage;

function isRichPage(page: PageData): page is RichInternalPage {
  return "kind" in page && page.kind === "rich";
}

function ActionLink({ action, className = "rich-button" }: { action: PageAction; className?: string }) {
  const classes = `${className} action-link`;
  if (action.external) {
    const newTab = action.href.startsWith("http");
    return <a className={classes} href={action.href} target={newTab ? "_blank" : undefined} rel={newTab ? "noreferrer" : undefined}>{action.label}<ActionArrow /></a>;
  }
  return <Link className={classes} href={action.href}>{action.label}<ActionArrow /></Link>;
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.4 3.5 9.7 8l-2.1 1.8c1.2 2.5 3.2 4.5 5.7 5.7l1.8-2.1 4.5 2.3-.8 3.5c-.2.8-.9 1.3-1.7 1.3C9.6 20.5 3.5 14.4 3.5 6.9c0-.8.5-1.5 1.3-1.7l2.6-.7Z" />
    </svg>
  );
}

function SimpleInternalPage({ locale, page }: { locale: Locale; page: SimplePage }) {
  return (
    <main className={`internal-page internal-page--${page.theme}`}>
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

function RichInternalPageView({ locale, page }: { locale: Locale; page: RichInternalPage }) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeProfile, setActiveProfile] = useState(0);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const heroCopy = gsap.utils.toArray<HTMLElement>(".rich-hero__copy > *");
    const heroVisual = root.current?.querySelector<HTMLElement>(".rich-hero__visual");

    if (heroCopy.length) {
      gsap.from(heroCopy, { y: 30, opacity: 0, duration: 0.75, stagger: 0.07, ease: "power3.out" });
    }
    if (heroVisual) {
      gsap.from(heroVisual, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power3.inOut" });
    }

    gsap.utils.toArray<HTMLElement>("[data-rich-reveal]").forEach((element) => {
      gsap.from(element, {
        y: 38,
        opacity: 0,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 87%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-rich-stagger]").forEach((group) => {
      const children = Array.from(group.children);
      if (!children.length) return;
      gsap.from(children, {
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: group, start: "top 86%", once: true },
      });
    });
  }, { scope: root });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play();
      else video.pause();
    }, { threshold: 0.35 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const profile = page.profiles?.[activeProfile];
  const contactSignals = locale === "pt"
    ? [
        { label: "Aulas", image: "/images/instagram/optimized/generated/cards/comecar-aula-editorial.webp" },
        { label: "Eventos", image: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_9.webp" },
        { label: "Workshops", image: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp" },
      ]
    : [
        { label: "Classes", image: "/images/instagram/optimized/generated/cards/comecar-aula-editorial.webp" },
        { label: "Events", image: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_9.webp" },
        { label: "Workshops", image: "/images/instagram/optimized/carousels/Dax6IEonKfx/Dax6IEonKfx_20260714_2.webp" },
      ];

  return (
    <main ref={root} className={`rich-page rich-page--${page.theme}`}>
      <section className={`rich-hero ${page.heroImage ? "" : "rich-hero--contact"}`}>
        <div className="page-shell rich-hero__grid">
          <div className="rich-hero__copy">
            <span className="eyebrow">{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="rich-actions">
              <ActionLink action={page.primaryAction} />
              {page.secondaryAction && <ActionLink action={page.secondaryAction} className="rich-text-link" />}
            </div>
          </div>
          {page.heroImage ? (
            <div className="rich-hero__visual">
              <Image src={page.heroImage} alt={page.heroAlt ?? ""} fill priority sizes="(max-width: 800px) calc(100vw - 32px), 48vw" />
            </div>
          ) : (
            <div className="rich-hero__signal" aria-hidden="true">
              {contactSignals.map((signal) => (
                <div className="contact-signal__item" key={signal.label}>
                  <Image src={signal.image} alt="" fill quality={82} sizes="(max-width: 760px) calc(100vw - 36px), 44vw" />
                  <span>{signal.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {page.highlights && (
        <section className={`rich-highlights ${page.highlights.some((item) => item.image) ? "rich-highlights--media" : ""}`}>
          <div className="page-shell rich-highlights__grid" data-rich-stagger>
            {page.highlights.map((item) => (
              <article key={item.title} id={item.id}>
                {item.image && <Image src={item.image} alt={item.alt ?? ""} fill quality={82} sizes="(max-width: 760px) calc(100vw - 32px), 33vw" />}
                <div className="rich-highlight__copy"><h2>{item.title}</h2><p>{item.body}</p></div>
              </article>
            ))}
          </div>
        </section>
      )}

      {page.profiles && profile && (
        <section className="rich-profiles" id="perfis">
          <div className="page-shell">
            <div className="rich-section-heading" data-rich-reveal><span>{locale === "pt" ? "Conheça os fundadores" : "Meet the founders"}</span><h2>{locale === "pt" ? "Pía e PC, por eles mesmos." : "Meet Pía and PC."}</h2></div>
            <div className="rich-profiles__choices" data-rich-stagger>
              {page.profiles.map((item, index) => (
                <button type="button" className={index === activeProfile ? "is-active" : ""} key={item.name} onClick={() => setActiveProfile(index)} aria-pressed={index === activeProfile}>
                  <span className="rich-profile__image"><Image src={item.image} alt={item.alt} fill quality={88} sizes="(max-width: 760px) calc(50vw - 22px), 46vw" /></span>
                  <span className="rich-profile__label"><strong>{item.name}</strong><small>{item.role}</small></span>
                </button>
              ))}
            </div>
            <div className="rich-profile__description" aria-live="polite" key={profile.name}><span>{profile.role}</span><h3>{profile.name}</h3><p>{profile.description}</p></div>
          </div>
        </section>
      )}

      {page.story && (
        <section className="rich-story" id="como-funciona">
          <div className="page-shell rich-story__grid" data-rich-reveal><span>{page.story.eyebrow}</span><h2>{page.story.title}</h2><p>{page.story.body}</p></div>
        </section>
      )}

      {page.gallery && (
        <section className="rich-gallery" aria-label={locale === "pt" ? "Galeria" : "Gallery"}>
          <div className="page-shell rich-gallery__grid scroll-fade-x" data-rich-stagger>
            {page.gallery.map((item, index) => (
              <figure key={item.src} className={`rich-gallery__item rich-gallery__item--${index + 1}`}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) calc(100vw - 44px), 40vw" />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {page.video && (
        <section className="rich-video">
          <div className="page-shell rich-video__grid">
            <div className="rich-video__frame" data-rich-reveal><video ref={videoRef} muted loop playsInline preload="none" poster={page.video.poster} aria-label={page.video.title}><source src={page.video.src} type="video/mp4" /></video></div>
            <div className="rich-video__copy" data-rich-reveal><span>{locale === "pt" ? "Em movimento" : "In motion"}</span><h2>{page.video.title}</h2><p>{page.video.body}</p></div>
          </div>
        </section>
      )}

      {page.contactOptions && (
        <section className="rich-contact-options">
          <div className="page-shell rich-contact-options__grid" data-rich-stagger>
            {page.contactOptions.map((option) => <article key={option.title}><h2>{option.title}</h2><p>{option.body}</p><small>{option.note}</small><ActionLink action={option.action} /></article>)}
          </div>
        </section>
      )}

      <section id={page.contactOptions ? "telefone" : undefined} className={`rich-closing ${page.contactOptions ? "rich-closing--contact" : ""}`}>
        <div className="page-shell rich-closing__grid" data-rich-reveal>
          <h2>{page.closingTitle}</h2>
          {page.contactOptions ? (
            <div className="contact-call-card">
              <span className="contact-call-card__icon"><PhoneIcon /></span>
              <div className="contact-call-card__content">
                <span>{locale === "pt" ? "Telefone e WhatsApp" : "Phone and WhatsApp"}</span>
                <a className="contact-call-card__number" href="tel:+5571936189895">{locale === "pt" ? "(71) 93618-9895" : "+55 71 93618-9895"}</a>
                <p>{page.closingBody}</p>
              </div>
              <ActionLink action={page.closingAction} />
            </div>
          ) : (
            <div><p>{page.closingBody}</p><ActionLink action={page.closingAction} /></div>
          )}
        </div>
      </section>
    </main>
  );
}

export function InternalPageView({ locale, page }: { locale: Locale; page: PageData }) {
  if (isRichPage(page)) return <RichInternalPageView locale={locale} page={page} />;
  return <SimpleInternalPage locale={locale} page={page} />;
}
