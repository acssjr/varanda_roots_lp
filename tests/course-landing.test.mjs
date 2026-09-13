import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const contentModule = await import("../lib/course-landing-content.ts");

test("builds a replaceable and correctly encoded WhatsApp URL", () => {
  const message = "Olá! Quero saber se o curso é para mim & para minha parceria.";
  const url = new URL(contentModule.courseWhatsappUrl(message));

  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, `/${contentModule.VARANDA_WHATSAPP_NUMBER}`);
  assert.equal(url.searchParams.get("text"), message);
  assert.match(contentModule.courseQuestionUrl, /^https:\/\/wa\.me\/5571936189895\?text=/);
  assert.notEqual(contentModule.courseQuestionUrl, contentModule.courseStickyQuestionUrl);
});

test("shows the persistent CTA only between the hero and commercial zones", () => {
  const show = contentModule.shouldShowCourseStickyCta;

  assert.equal(show({ heroVisible: true, offerVisible: false, finalVisible: false, footerVisible: false }), false);
  assert.equal(show({ heroVisible: false, offerVisible: false, finalVisible: false, footerVisible: false }), true);
  assert.equal(show({ heroVisible: false, offerVisible: true, finalVisible: false, footerVisible: false }), false);
  assert.equal(show({ heroVisible: false, offerVisible: false, finalVisible: true, footerVisible: false }), false);
  assert.equal(show({ heroVisible: false, offerVisible: false, finalVisible: false, footerVisible: true }), false);
  assert.equal(show({ heroVisible: true, offerVisible: true, finalVisible: true, footerVisible: true }), false);
});

test("keeps all approved commercial information in one typed configuration", () => {
  const content = contentModule.courseLandingContent;

  assert.equal(content.modules.length, 4);
  assert.equal(content.testimonials.length, 6);
  assert.equal(content.bonuses.length, 2);
  assert.deepEqual(content.facts, ["27 aulas", "4 módulos", "2 bônus", "Acesso por tempo indeterminado"]);
  assert.equal(contentModule.COURSE_CHECKOUT_URL, "https://go.hotmart.com/L106426800T");
  assert.equal(contentModule.COURSE_PRICING.installment, "12x de R$ 46,54*");
  assert.equal(contentModule.COURSE_PRICING.cash, "R$ 450,00 à vista");
  assert.match(contentModule.COURSE_PRICING.note, /acréscimo/);
  assert.equal(content.hero.image, "/images/instagram/optimized/reels/pia-pc-retrato-ao-ar-livre-CyvrSRQIONU.webp");
  assert.doesNotMatch(content.hero.image, /casacos-varanda-roots/);
  assert.ok(content.faq.some(({ answer }) => answer.includes("7 dias")));
  assert.ok(content.faq.some(({ answer }) => answer.includes("português, inglês e espanhol")));
});

test("uses the course mark in the header, the alternate mark in the footer, and makes checkout the hero action", async () => {
  const verticalLogo = await stat(path.join(root, "public", "images", "course", "brand", "aprendaoroots1.svg"));
  const horizontalLogo = await stat(path.join(root, "public", "images", "course", "brand", "aprendaoroots2-horizontal.svg"));
  const footerLogo = await stat(path.join(root, "public", "images", "course", "brand", "aprendaoroots1-footer.svg"));
  assert.ok(verticalLogo.size < 125 * 1024);
  assert.ok(horizontalLogo.size < 220 * 1024);
  assert.ok(footerLogo.size < 125 * 1024);

  const component = await readFile(path.join(root, "components", "course-landing", "CourseLandingPage.tsx"), "utf8");
  assert.match(component, /src="\/images\/course\/brand\/aprendaoroots2-horizontal\.svg"/);
  assert.match(component, /className=\{styles\.primaryButton\} href=\{COURSE_CHECKOUT_URL\}/);
  assert.match(component, /src="\/images\/course\/brand\/aprendaoroots1-footer\.svg"/);
  assert.doesNotMatch(component, /BrandMark/);
  assert.match(component, /fetchPriority="high"/);
  assert.match(component, /loading="eager"/);

  const heroActions = component.match(/<div className=\{styles\.heroActions\}[\s\S]*?<\/div>/)?.[0] ?? "";
  assert.equal((heroActions.match(/<a /g) ?? []).length, 1);
  assert.doesNotMatch(heroActions, /#conteudo|Ver o conteúdo do curso/);
  assert.doesNotMatch(component, /className=\{styles\.cashPrice\}/);

  for (const file of ["aprendaoroots1.svg", "aprendaoroots2-horizontal.svg", "aprendaoroots1-footer.svg"]) {
    const svg = await readFile(path.join(root, "public", "images", "course", "brand", file), "utf8");
    assert.doesNotMatch(svg, /#e83e01/i, `${file} should use the landing-page palette`);
  }
});

test("keeps the institutional course page separate from the Aprenda o Roots landing", async () => {
  const institutionalRoute = await readFile(path.join(root, "app", "[locale]", "[slug]", "page.tsx"), "utf8");
  const institutionalContent = await readFile(path.join(root, "lib", "rich-page-content.ts"), "utf8");
  const landingRoute = await readFile(path.join(root, "app", "pt", "aprenda-o-roots", "page.tsx"), "utf8");

  assert.doesNotMatch(institutionalRoute, /slug\) => slug !== "curso"/);
  assert.match(landingRoute, /<CourseLandingPage \/>/);
  assert.match(institutionalContent, /primaryAction: \{ label: "Conhecer o curso completo", href: "\/pt\/aprenda-o-roots" \}/);
  assert.match(institutionalContent, /closingAction: \{ label: "Ir para a página do curso", href: "\/pt\/aprenda-o-roots" \}/);
  await assert.rejects(access(path.join(root, "app", "pt", "curso", "page.tsx")));
});

test("publishes optimized testimonial portraits without stretching their source size", async () => {
  for (const testimonial of contentModule.courseLandingContent.testimonials) {
    const assetPath = path.join(root, "public", testimonial.image);
    const file = await stat(assetPath);
    assert.ok(file.size < 24 * 1024, `${testimonial.image} should remain a small avatar asset`);
    await access(assetPath);
  }

  const component = await readFile(path.join(root, "components", "course-landing", "CourseLandingPage.tsx"), "utf8");
  const testimonialImages = [...component.matchAll(/<Image src=\{(?:firstTestimonial|testimonial)\.image\}[^>]+>/g)]
    .map((match) => match[0]);
  assert.equal(testimonialImages.length, 2);
  assert.ok(testimonialImages.every((markup) => /width=\{(?:64|72)\}\s+height=\{(?:64|72)\}/.test(markup)));
  assert.ok(testimonialImages.every((markup) => !markup.includes("fill")));
});
