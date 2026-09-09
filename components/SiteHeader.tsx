"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrandMark } from "./BrandMark";
import { equivalentSlugs, type Locale, navigation } from "@/lib/site-content";

function FlagIcon({ country }: { country: "br" | "gb" }) {
  if (country === "br") {
    return (
      <svg className="flag-icon" viewBox="0 0 28 20" aria-hidden="true">
        <rect width="28" height="20" rx="2" fill="#169B62" />
        <path d="M14 2.5 25 10 14 17.5 3 10Z" fill="#FFDF00" />
        <circle cx="14" cy="10" r="4" fill="#002776" />
      </svg>
    );
  }

  return (
    <svg className="flag-icon" viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="20" rx="2" fill="#21468B" />
      <path d="m0 0 28 20M28 0 0 20" stroke="#fff" strokeWidth="4" />
      <path d="m0 0 28 20M28 0 0 20" stroke="#AE1C28" strokeWidth="1.6" />
      <path d="M14 0v20M0 10h28" stroke="#fff" strokeWidth="6" />
      <path d="M14 0v20M0 10h28" stroke="#AE1C28" strokeWidth="3.2" />
    </svg>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const compactRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const nextCompact = compactRef.current ? window.scrollY > 24 : window.scrollY > 150;
      if (nextCompact !== compactRef.current) {
        compactRef.current = nextCompact;
        setCompact(nextCompact);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const alternateHref = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const nextLocale = locale === "pt" ? "en" : "pt";
    const slug = parts[1];
    return slug ? `/${nextLocale}/${equivalentSlugs[slug] ?? slug}` : `/${nextLocale}`;
  }, [locale, pathname]);

  return (
    <>
    <div className="site-header-spacer" aria-hidden="true" />
    <header className={`site-header ${compact ? "site-header--compact" : ""}`}>
      <div className="site-header__stripe" />
      <div className="site-header__utility page-shell">
        <span>{locale === "pt" ? "Salvador · Brasil" : "Salvador · Brazil"}</span>
        <Link href={alternateHref} onClick={() => setOpen(false)} className="language-switch" aria-label={locale === "pt" ? "View in English" : "Ver em português"}>
          <span className={`language-option ${locale === "pt" ? "is-active" : ""}`}><FlagIcon country="br" /><em>PT</em></span>
          <i />
          <span className={`language-option ${locale === "en" ? "is-active" : ""}`}><FlagIcon country="gb" /><em>EN</em></span>
        </Link>
      </div>
      <div className="site-header__main page-shell">
        <Link href={`/${locale}`} className="site-header__brand-link">
          <BrandMark compact={compact} />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-toggle__icon" aria-hidden="true"><i /><i /></span>
          <span>{open ? (locale === "pt" ? "Fechar" : "Close") : "Menu"}</span>
        </button>
        <nav id="main-navigation" className={`main-navigation ${open ? "is-open" : ""}`} aria-label="Principal">
          {navigation[locale].map((item) => {
            const href = `/${locale}${item.href}`;
            const active = pathname === href;
            return (
              <Link key={item.href} href={href} onClick={() => setOpen(false)} className={active ? "is-active" : ""}>
                {item.label}
              </Link>
            );
          })}
          <Link className="main-navigation__language" href={alternateHref} onClick={() => setOpen(false)}>
            <FlagIcon country={locale === "pt" ? "gb" : "br"} />
            {locale === "pt" ? "English" : "Português"}
          </Link>
          <span className="main-navigation__mark" aria-hidden="true" />
        </nav>
      </div>
    </header>
    </>
  );
}
