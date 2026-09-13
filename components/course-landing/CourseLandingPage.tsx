import Image from "next/image";
import Link from "next/link";
import {
  COURSE_CHECKOUT_URL,
  COURSE_PRICING,
  courseLandingContent,
  courseQuestionUrl,
} from "@/lib/course-landing-content";
import { CourseStickyCta } from "./CourseStickyCta";
import styles from "./CourseLandingPage.module.css";

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

export function CourseLandingPage() {
  const content = courseLandingContent;
  const firstTestimonial = content.testimonials[0];

  return (
    <main className={`course-landing-page ${styles.root}`} id="inicio">
      <header className={styles.lpHeader}>
        <div className={styles.shell}>
          <a className={styles.headerBrand} href="#inicio" aria-label="Aprenda o Roots — voltar ao início">
            <Image
              src="/images/course/brand/aprendaoroots2-horizontal.svg"
              alt=""
              width={240}
              height={80}
              unoptimized
            />
          </a>
          <nav aria-label="Navegação do curso">
            <a href="#conteudo">Conteúdo</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#perguntas">Perguntas</a>
          </nav>
          <a className={styles.headerCta} href={COURSE_CHECKOUT_URL} target="_blank" rel="noreferrer">
            Comprar agora
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroStage}>
          <div className={styles.heroVisual}>
            <Image
              src={content.hero.image}
              alt={content.hero.imageAlt}
              fill
              fetchPriority="high"
              loading="eager"
              quality={88}
              sizes="100vw"
            />
          </div>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
            <h1>{content.hero.title}</h1>
            <p className={styles.heroBody}>{content.hero.body}</p>
            <div className={styles.heroActions} id="course-hero-actions">
              <a className={styles.primaryButton} href={COURSE_CHECKOUT_URL} target="_blank" rel="noreferrer">Quero aprender Roots <Arrow /></a>
            </div>
            <p className={styles.heroPrice}><strong>{COURSE_PRICING.installment}</strong> no cartão</p>
            <p className={styles.heroDetails}>27 aulas · 4 módulos · acesso por tempo indeterminado</p>
          </div>
          <div className={styles.heroCredit} aria-hidden="true">Pía Ovalle + DJ PC</div>
        </div>
      </section>

      <section className={styles.proofStrip} aria-label="Depoimento de aluno">
        <div className={`${styles.shell} ${styles.proofStripInner}`}>
          <Image src={firstTestimonial.image} alt={`Retrato de ${firstTestimonial.name}`} width={72} height={72} />
          <blockquote>“{firstTestimonial.quote}”</blockquote>
          <cite>{firstTestimonial.name}</cite>
        </div>
      </section>

      <section className={styles.problemSection}>
        <div className={`${styles.shell} ${styles.narrowGrid}`}>
          <span className={styles.sectionIndex}>01 · Para quem é</span>
          <div>
            <h2>Roots parece difícil quando ninguém mostra por onde começar.</h2>
            <div className={styles.twoColumnText}>
              <p>Quem já dança forró costuma reconhecer alguns movimentos do Roots, mas nem sempre consegue perceber o que organiza cada um deles. Sem essa base, é fácil achar que o estilo depende de força, velocidade ou de decorar muitas sequências.</p>
              <p>O curso foi feito para organizar esse estudo. Pía e PC apresentam as referências do estilo, mostram como os movimentos funcionam e propõem uma prática que pode ser retomada quantas vezes você precisar.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.methodSection}>
        <div className={`${styles.shell} ${styles.methodGrid}`}>
          <div className={styles.methodImage}>
            <Image
              src="/images/instagram/optimized/reels/C2IB07Kg5Cn/C2IB07Kg5Cn_20240115.webp"
              alt="Pía e PC demonstrando um movimento durante uma aula de forró."
              fill
              quality={86}
              sizes="(max-width: 799px) calc(100vw - 36px), 42vw"
            />
          </div>
          <div className={styles.methodCopy}>
            <span className={styles.sectionIndex}>02 · Como Pía e PC ensinam</span>
            <h2>Primeiro você entende a base. Depois, amplia o vocabulário.</h2>
            <p>Em vez de começar por uma coleção solta de passos, o curso chama atenção para aquilo que sustenta a dança: organização do corpo, comunicação com a parceria e leitura dos movimentos.</p>
            <p>Os nomes “Desconstrução” e “Reprogramação” marcam as duas partes centrais desse caminho: observar o que você já faz e construir novas referências para o Roots.</p>
            <a className={styles.inlineLink} href="#conteudo">Conhecer os quatro módulos <Arrow /></a>
          </div>
        </div>
      </section>

      <section className={styles.curriculumSection} id="conteudo">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIndex}>03 · Conteúdo do curso</span>
            <h2>Quatro módulos em uma ordem clara.</h2>
            <p>São 27 aulas curtas, com cerca de 10 minutos em média, para assistir e levar à prática no mesmo dia.</p>
          </div>
          <ol className={styles.moduleList}>
            {content.modules.map((module) => (
              <li key={module.number}>
                <span className={styles.moduleNumber}>{module.number}</span>
                <div className={styles.moduleTitle}>
                  <small>Módulo</small>
                  <h3>{module.title}</h3>
                </div>
                <div className={styles.moduleBody}>
                  <strong>{module.subtitle}</strong>
                  <p>{module.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.practiceSection}>
        <div className={`${styles.shell} ${styles.practiceGrid}`}>
          <div>
            <span className={styles.sectionIndex}>04 · Na prática</span>
            <h2>Assista, experimente e volte à aula quando quiser.</h2>
          </div>
          <ul>
            <li><strong>Prática individual</strong><span>Muitos exercícios podem ser feitos sem parceria fixa.</span></li>
            <li><strong>Leve para o baile</strong><span>O curso prepara o estudo; dançar com outras pessoas completa a experiência.</span></li>
            <li><strong>No seu ritmo</strong><span>O acesso não expira e as aulas podem ser revistas.</span></li>
            <li><strong>Liberação progressiva</strong><span>Você começa pelos módulos 1 e 2 e pelas primeiras aulas do módulo 3.</span></li>
          </ul>
        </div>
      </section>

      <section className={styles.testimonialsSection} id="depoimentos">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIndex}>05 · Depoimentos</span>
            <h2>O que alunos de Pía e PC contam.</h2>
          </div>
          <div className={styles.testimonialGrid}>
            {content.testimonials.map((testimonial) => (
              <article key={testimonial.name}>
                <div className={styles.testimonialPerson}>
                  <Image src={testimonial.image} alt={`Retrato de ${testimonial.name}`} width={64} height={64} />
                  <span>{testimonial.name}</span>
                </div>
                <blockquote>“{testimonial.quote}”</blockquote>
                <p>{testimonial.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bonusSection}>
        <div className={`${styles.shell} ${styles.bonusGrid}`}>
          <div>
            <span className={styles.sectionIndex}>06 · Materiais extras</span>
            <h2>Dois bônus que acompanham a prática.</h2>
          </div>
          <div className={styles.bonusCards}>
            {content.bonuses.map((bonus, index) => (
              <article key={bonus.title}>
                <span>0{index + 1}</span>
                <h3>{bonus.title}</h3>
                <p>{bonus.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.teachersSection}>
        <div className={`${styles.shell} ${styles.teachersGrid}`}>
          <div className={styles.teachersCopy}>
            <span className={styles.sectionIndex}>07 · Quem ensina</span>
            <h2>Pía e PC ensinam juntos desde 2020.</h2>
            <p>Em 2021, os dois fundaram a Varanda Roots, em Salvador. Dão aulas, ministram workshops e participam de festivais no Brasil e no exterior. PC também trabalha como DJ e pesquisador musical.</p>
            <p>No curso, os dois mostram os movimentos por perspectivas diferentes da dança a dois e explicam o que observar em cada etapa.</p>
            <Link className={styles.inlineLink} href="/pt/pia-e-pc">Conhecer Pía e PC <Arrow /></Link>
          </div>
          <div className={styles.teachersImage}>
            <Image
              src="/images/instagram/optimized/reels/pia-pc-dancando-em-evento-Davphbzv178.webp"
              alt="Pía e PC dançando forró em um evento com público ao redor."
              fill
              quality={86}
              sizes="(max-width: 799px) calc(100vw - 36px), 45vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.offerSection} id="course-offer">
        <div className={`${styles.shell} ${styles.offerGrid}`}>
          <div className={styles.offerIntro}>
            <span className={styles.sectionIndex}>08 · Inscrição</span>
            <h2>Aprenda o Roots com Pía e PC.</h2>
            <p>Uma compra, acesso por tempo indeterminado e sete dias para conhecer o curso com calma.</p>
          </div>
          <div className={styles.offerCard}>
            <span className={styles.offerLabel}>Curso completo</span>
            <p className={styles.installmentPrice}><small>no cartão</small><strong>{COURSE_PRICING.installment}</strong></p>
            <p className={styles.priceNote}>Pagamento pela Hotmart · {COURSE_PRICING.note}</p>
            <ul>
              <li><Check />27 aulas em 4 módulos</li>
              <li><Check />Aula do abraço</li>
              <li><Check />Três playlists de DJ PC</li>
              <li><Check />Legendas em PT, EN e ES</li>
              <li><Check />Acesso por tempo indeterminado</li>
              <li><Check />Garantia incondicional de 7 dias</li>
            </ul>
            <a className={styles.offerButton} href={COURSE_CHECKOUT_URL} target="_blank" rel="noreferrer">Quero começar o curso <Arrow /></a>
            <a className={styles.offerQuestion} href={courseQuestionUrl} target="_blank" rel="noreferrer">Tirar uma dúvida antes de comprar</a>
            <p className={styles.releaseNote}>Módulos 1 e 2 e início do módulo 3: acesso imediato. Conteúdo restante e bônus: após 7 dias.</p>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} id="perguntas">
        <div className={`${styles.shell} ${styles.faqGrid}`}>
          <div>
            <span className={styles.sectionIndex}>09 · Perguntas frequentes</span>
            <h2>Antes de entrar.</h2>
          </div>
          <div className={styles.faqList}>
            {content.faq.map((item) => (
              <details key={item.question}>
                <summary><span>{item.question}</span><i aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} id="course-final-cta">
        <div className={styles.shell}>
          <span className={styles.eyebrow}>Curso online · acesso por tempo indeterminado</span>
          <h2>Quer começar seu estudo de Roots?</h2>
          <p>Conheça as aulas, pratique no seu ritmo e leve novas referências para a pista.</p>
          <a className={styles.primaryButton} href={COURSE_CHECKOUT_URL} target="_blank" rel="noreferrer">Comprar na Hotmart <Arrow /></a>
          <small>{COURSE_PRICING.installment} · garantia incondicional de 7 dias</small>
        </div>
      </section>

      <footer className={styles.lpFooter} id="course-footer">
        <div className={`${styles.shell} ${styles.footerGrid}`}>
          <div className={styles.footerBrandBlock}>
            <a className={styles.footerBrand} href="#inicio" aria-label="Aprenda o Roots — voltar ao início">
              <Image
                src="/images/course/brand/aprendaoroots1-footer.svg"
                alt=""
                width={300}
                height={168}
                unoptimized
              />
            </a>
            <p>Um curso online para entender os fundamentos do Roots e levar a prática para o baile.</p>
          </div>
          <div className={styles.footerNavGroup}>
            <span>Curso</span>
            <nav aria-label="Navegação do curso">
              <a href="#conteudo">Conteúdo</a>
              <a href="#depoimentos">Depoimentos</a>
              <a href="#perguntas">Perguntas frequentes</a>
            </nav>
          </div>
          <div className={styles.footerNavGroup}>
            <span>Informações</span>
            <nav aria-label="Informações legais">
              <Link href="/pt/termos-de-uso">Termos de uso</Link>
              <Link href="/pt/politica-de-privacidade">Política de privacidade</Link>
            </nav>
          </div>
        </div>
        <div className={`${styles.shell} ${styles.footerBottom}`}>
          <small>Varanda Roots · Curso online Aprenda o Roots com Pía e PC.</small>
        </div>
      </footer>

      <CourseStickyCta />
    </main>
  );
}
