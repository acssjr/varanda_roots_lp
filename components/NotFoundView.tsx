"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const copy = {
  pt: {
    title: "Essa página saiu para dançar.",
    body: "Parece que ela errou o caminho até a roda. A gente te leva de volta para a Varanda.",
    action: "Voltar ao início",
    aria: "Erro 404: página não encontrada",
  },
  en: {
    title: "This page went out dancing.",
    body: "It seems to have lost its way to the dance floor. We can take you back to Varanda.",
    action: "Back to home",
    aria: "Error 404: page not found",
  },
} as const;

export function NotFoundView() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "pt";
  const hasLocaleLayout = pathname === "/pt" || pathname === "/en" || pathname?.startsWith("/pt/") || pathname?.startsWith("/en/");
  const content = copy[locale];

  return (
    <main className={`not-found-page${hasLocaleLayout ? "" : " not-found-page--standalone"}`}>
      <div className="not-found-page__watermark" aria-hidden="true" />
      <div className="not-found-page__rhythm" aria-hidden="true">
        <span>♪</span>
        <span>•</span>
        <span>♫</span>
        <span>•</span>
      </div>

      <section className="not-found-page__content">
        <div className="not-found-page__code" role="img" aria-label={content.aria}>
          <span>4</span>
          <span className="not-found-page__zero" aria-hidden="true">
            <span className="not-found-page__orbit not-found-page__orbit--one" />
            <span className="not-found-page__orbit not-found-page__orbit--two" />
            <span className="not-found-page__dancer">
              <span className="not-found-page__brand-icon" />
            </span>
          </span>
          <span>4</span>
        </div>

        <div className="not-found-page__message">
          <h1>{content.title}</h1>
          <p>{content.body}</p>
          <Link
            className="round-link round-link--yellow not-found-page__action"
            href={`/${locale}`}
            data-page-transition="home"
          >
            {content.action}
            <i aria-hidden="true"><span>↗</span></i>
          </Link>
        </div>
      </section>

      <p className="not-found-page__signature" aria-hidden="true">VARANDA ROOTS · SALVADOR</p>
    </main>
  );
}
