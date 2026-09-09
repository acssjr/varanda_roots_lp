import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { type Locale, navigation } from "@/lib/site-content";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__watermark" aria-hidden="true" />
      <div className="page-shell site-footer__grid">
        <div className="site-footer__identity">
          <BrandMark compact />
          <p>{locale === "pt" ? "Escola, festa, comunidade e casa." : "School, party, community and home."}</p>
        </div>
        <div className="site-footer__column">
          <span>{locale === "pt" ? "Explore" : "Explore"}</span>
          {navigation[locale].slice(1).map((item) => (
            <Link key={item.href} href={`/${locale}${item.href}`}>{item.label}</Link>
          ))}
        </div>
        <div className="site-footer__column">
          <span>{locale === "pt" ? "Encontre" : "Find us"}</span>
          <p>Rua Deputado Cunha Bueno, 55<br />Rio Vermelho · Salvador</p>
          <a href="https://www.instagram.com/varanda.roots/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <div className="site-footer__column">
          <span>{locale === "pt" ? "Idioma" : "Language"}</span>
          <Link href="/pt">Português</Link>
          <Link href="/en">English</Link>
        </div>
      </div>
      <div className="page-shell site-footer__bottom">
        <span>© {new Date().getFullYear()} Varanda Roots</span>
        <nav className="site-footer__legal" aria-label={locale === "pt" ? "Informações legais" : "Legal information"}>
          <Link href={`/${locale}/${locale === "pt" ? "politica-de-privacidade" : "privacy-policy"}`}>{locale === "pt" ? "Política de privacidade" : "Privacy policy"}</Link>
          <Link href={`/${locale}/${locale === "pt" ? "termos-de-uso" : "terms-of-use"}`}>{locale === "pt" ? "Termos de uso" : "Terms of use"}</Link>
          <Link href={`/${locale}/cookies`}>Cookies</Link>
        </nav>
        <a href="#top">{locale === "pt" ? "Voltar ao topo" : "Back to top"} ↑</a>
      </div>
    </footer>
  );
}
