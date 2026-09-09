# Homepage Alignment and Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alinhar as introduções da home ao mesmo eixo esquerdo, refinar o movimento do cabeçalho e dos CTAs, compactar as ações de rota e reduzir a altura do rodapé mobile.

**Architecture:** Manter a estrutura atual de `HomePage`, `SiteHeader` e `SiteFooter`, concentrando composição em TSX e comportamento visual em `app/globals.css`. Estender o GSAP/ScrollTrigger existente somente para entradas de seção, usando `clip-path`, `transform` e `opacity`; usar transições CSS para estados de cabeçalho e hover.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS global, GSAP 3, Node Test Runner.

---

## File map

- Modify: `app/globals.css` — margens, alinhamentos, tokens de easing, cabeçalho, CTAs, rota e rodapé.
- Modify: `components/HomePage.tsx` — entradas GSAP, estrutura interna das setas e ícones Maps/Waze.
- Modify: `lib/site-content.ts` — rótulo `Maps`.
- Modify: `tests/mobile-header.test.mjs` — recorte progressivo, alturas e estabilidade da marca.
- Modify: `tests/button-motion.test.mjs` — rotação exclusiva da seta.
- Modify: `tests/location-panel.test.mjs` — ícones e largura intrínseca dos botões.
- Create: `tests/home-layout-motion.test.mjs` — alinhamento, margens e entrada das seções.
- Create: `tests/mobile-footer.test.mjs` — compactação do rodapé.

### Task 1: Unify content margins and left alignment

**Files:**
- Create: `tests/home-layout-motion.test.mjs`
- Modify: `app/globals.css`

- [ ] **Step 1: Write the failing layout tests**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesPath = new URL("../app/globals.css", import.meta.url);

test("adds subtle responsive page margins", async () => {
  const styles = await readFile(stylesPath, "utf8");
  assert.match(styles, /--shell:\s*min\(100% - 64px,\s*1500px\)/);
  assert.match(styles, /@media \(max-width:\s*1080px\)[\s\S]*?--shell:\s*min\(100% - 48px,\s*1500px\)/);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?--shell:\s*calc\(100% - 36px\)/);
});

test("aligns manifest and class introductions to one left edge", async () => {
  const styles = await readFile(stylesPath, "utf8");
  assert.match(styles, /\.manifest__grid\s*\{[^}]*display:\s*block/s);
  assert.match(styles, /\.manifest h2\s*\{[^}]*margin[^;]*0/s);
  assert.match(styles, /\.manifest p\s*\{[^}]*margin-left:\s*0/s);
  assert.match(styles, /\.section-heading\s*\{[^}]*display:\s*block/s);
  assert.match(styles, /\.section-heading > p\s*\{[^}]*margin-left:\s*0/s);
});
```

- [ ] **Step 2: Run the test and verify red**

Run: `node --test tests/home-layout-motion.test.mjs`

Expected: FAIL because the old shell and grid alignments are still present.

- [ ] **Step 3: Implement the shared axis and margins**

Update the relevant rules in `app/globals.css`:

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --shell: min(100% - 64px, 1500px);
}

.manifest__grid { display: block; padding-block: clamp(100px, 11vw, 180px); }
.manifest h2 { max-width: 1120px; margin: 46px 0 0; }
.manifest p { max-width: 620px; margin: 42px 0 0; }
.section-heading { display: block; }
.section-heading h2 { max-width: 980px; margin: 42px 0 0; }
.section-heading > p { max-width: 620px; margin: 28px 0 0; }

@media (max-width: 1080px) {
  :root { --shell: min(100% - 48px, 1500px); }
}

@media (max-width: 760px) {
  :root { --shell: calc(100% - 36px); }
}
```

Keep `.section-heading--split`, `.course__copy` and `.duo__copy` overrides only where their two-column parent composition requires them.

- [ ] **Step 4: Run the test and verify green**

Run: `node --test tests/home-layout-motion.test.mjs`

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add app/globals.css tests/home-layout-motion.test.mjs
git commit -m "fix: align homepage sections and content margins"
```

### Task 2: Add restrained scroll entrances

**Files:**
- Modify: `tests/home-layout-motion.test.mjs`
- Modify: `components/HomePage.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add failing motion assertions**

```js
const homePath = new URL("../components/HomePage.tsx", import.meta.url);

test("reveals the yellow section and class cards once from below", async () => {
  const home = await readFile(homePath, "utf8");
  assert.match(home, /trigger:\s*"\.manifest"/);
  assert.match(home, /clipPath:\s*"inset\(100% 0 0 0\)"/);
  assert.match(home, /yPercent:\s*8/);
  assert.match(home, /trigger:\s*"\.class-grid"/);
  assert.match(home, /stagger:\s*\.07/);
  assert.match(home, /once:\s*true/);
});
```

- [ ] **Step 2: Run the test and verify red**

Run: `node --test tests/home-layout-motion.test.mjs`

Expected: FAIL because the dedicated timelines do not exist.

- [ ] **Step 3: Replace the generic class-card reveal with dedicated timelines**

Inside the first `useGSAP` in `components/HomePage.tsx`, change the generic selector to `"[data-reveal]:not(.class-card)"` and add:

```tsx
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
```

The existing early return for `prefers-reduced-motion` leaves every element in its stable rendered state.

- [ ] **Step 4: Position the card action on mobile**

Wrap every card arrow as `<i aria-hidden="true"><span>↗</span></i>` and add:

```css
.class-card__footer i > span { display: grid; place-items: center; line-height: 1; }

@media (max-width: 760px) {
  .class-card__body { padding-top: 24px; }
  .class-card__footer i { position: absolute; top: 24px; right: 24px; }
}
```

- [ ] **Step 5: Run the motion test and commit**

Run: `node --test tests/home-layout-motion.test.mjs`

Expected: all tests pass.

```powershell
git add components/HomePage.tsx app/globals.css tests/home-layout-motion.test.mjs
git commit -m "feat: add restrained homepage scroll reveals"
```

### Task 3: Build the mobile header wipe without shake

**Files:**
- Modify: `tests/mobile-header.test.mjs`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace opacity expectations with failing clip-path expectations**

```js
test("wipes the wordmark from right to left without changing its width", async () => {
  const styles = await readFile(stylesPath, "utf8");
  assert.match(styles, /\.brand__official-name\s*\{[^}]*clip-path:\s*inset\(0 0 0 0\)[^}]*clip-path\s+\.7s\s+var\(--ease-in-out\)/s);
  assert.match(styles, /\.site-header--compact:not\(\.site-header--menu-open\)\s+\.brand__official-name\s*\{[^}]*clip-path:\s*inset\(0 100% 0 0\)/s);
  assert.doesNotMatch(styles, /\.site-header--compact:not\(\.site-header--menu-open\)\s+\.brand\s*\{[^}]*width/s);
});

test("uses distinct normal and compact mobile header heights", async () => {
  const styles = await readFile(stylesPath, "utf8");
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.site-header__main\s*\{[^}]*min-height:\s*82px/s);
  assert.match(styles, /\.site-header--compact \.site-header__main\s*\{[^}]*transform:\s*translate3d\(0,\s*-8px,\s*0\)/s);
  assert.match(styles, /\.site-header--compact\s*\{[^}]*clip-path:\s*inset\(0 0 16px 0\)/s);
});
```

- [ ] **Step 2: Run the mobile header test and verify red**

Run: `node --test tests/mobile-header.test.mjs`

Expected: FAIL on clip-path and height-state assertions.

- [ ] **Step 3: Implement the reversible wipe and visual height change**

Use these mobile rules in `app/globals.css`:

```css
@media (max-width: 760px) {
  .site-header {
    clip-path: inset(0 0 0 0);
    transition: color .65s var(--ease-in-out), background .65s var(--ease-in-out), box-shadow .45s var(--ease-out), clip-path .65s var(--ease-in-out);
  }
  .site-header__main { min-height: 82px; padding-block: 8px; transition: transform .65s var(--ease-in-out); }
  .site-header--compact { clip-path: inset(0 0 16px 0); }
  .site-header--compact .site-header__main { transform: translate3d(0, -8px, 0); }
  .brand__official-name {
    clip-path: inset(0 0 0 0);
    opacity: 1;
    transform: none;
    transition: clip-path .7s var(--ease-in-out);
  }
  .site-header--compact:not(.site-header--menu-open) .brand__official-name {
    clip-path: inset(0 100% 0 0);
    opacity: 1;
    transform: none;
  }
}
```

Update the mobile spacer to `94px`, matching stripe plus normal header height. Preserve the fixed `169px` brand width.

- [ ] **Step 4: Run the header tests and commit**

Run: `node --test tests/mobile-header.test.mjs`

Expected: all mobile-header tests pass.

```powershell
git add app/globals.css tests/mobile-header.test.mjs
git commit -m "fix: refine mobile header wipe and height transition"
```

### Task 4: Keep CTA circles fixed and compact route actions

**Files:**
- Modify: `tests/button-motion.test.mjs`
- Modify: `tests/location-panel.test.mjs`
- Modify: `components/HomePage.tsx`
- Modify: `lib/site-content.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Write failing CTA and route tests**

Add assertions that require `.round-link i > span`, `rotate(45deg)`, no transform on `.round-link:hover i`, `RouteServiceIcon`, `visitMapsLabel: "Maps"`, `display: flex`, `flex-wrap: wrap`, and `width: max-content` on route links.

```js
assert.match(homePage, /function RouteServiceIcon/);
assert.match(homePage, /<RouteServiceIcon service="maps"/);
assert.match(homePage, /<RouteServiceIcon service="waze"/);
assert.match(content, /visitMapsLabel:\s*"Maps"/);
assert.match(styles, /\.round-link i > span\s*\{[^}]*transition:\s*transform\s+160ms\s+var\(--ease-in-out\)/s);
assert.match(styles, /\.round-link:hover i > span\s*\{[^}]*transform:\s*rotate\(45deg\)/s);
assert.doesNotMatch(styles, /\.round-link:hover i\s*\{[^}]*transform/s);
assert.match(styles, /\.visit__actions\s*\{[^}]*display:\s*flex[^}]*flex-wrap:\s*wrap/s);
assert.match(styles, /\.visit__actions \.round-link\s*\{[^}]*width:\s*max-content/s);
```

- [ ] **Step 2: Run both tests and verify red**

Run: `node --test tests/button-motion.test.mjs tests/location-panel.test.mjs`

Expected: FAIL on the new arrow structure, service icons and compact actions.

- [ ] **Step 3: Implement inline service icons and arrow wrappers**

Add focused `ArrowGlyph` and `RouteServiceIcon` functions to `HomePage.tsx`:

```tsx
function ArrowGlyph() {
  return <i aria-hidden="true"><span>↗</span></i>;
}

function RouteServiceIcon({ service }: { service: "maps" | "waze" }) {
  if (service === "maps") {
    return (
      <svg className="route-service-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#34a853" d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.6 7.5 12.5 7.5 12.5s7.5-6.9 7.5-12.5A7.5 7.5 0 0 0 12 2Z" />
        <path fill="#fbbc04" d="M4.8 7.4 12 22V12.6a3.1 3.1 0 0 1-2.9-2l-4.3-3.2Z" />
        <path fill="#4285f4" d="M12 2a7.5 7.5 0 0 0-7.2 5.4l4.3 3.2A3.1 3.1 0 0 1 12 6.4V2Z" />
        <path fill="#ea4335" d="M12 2v4.4a3.1 3.1 0 0 1 2.9 4.2l4.1 3.1c.3-1.3.5-2.7.5-4.2A7.5 7.5 0 0 0 12 2Z" />
        <circle cx="12" cy="9.5" r="2" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg className="route-service-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.2C4 7.7 7.5 4 12 4s8 3.7 8 8.2c0 3.7-2.8 6.8-6.5 7.7H9.7a7.9 7.9 0 0 1-3.5-1.8L3 19l1.2-3.1A8 8 0 0 1 4 12.2Z" fill="#33ccff" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="12" r="1" fill="currentColor" /><circle cx="15" cy="12" r="1" fill="currentColor" />
      <path d="M9 15c1.7 1.1 4.3 1.1 6 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.3" />
    </svg>
  );
}
```

Replace the five circular arrow occurrences in the hero CTA, class cards, agenda items, course CTA and route actions with `<ArrowGlyph />`. Use each service icon before its route label:

```tsx
<a className="round-link round-link--blue" href={GOOGLE_MAPS_ROUTE} target="_blank" rel="noreferrer">
  <RouteServiceIcon service="maps" />
  <span>{content.visitMapsLabel}</span>
  <ArrowGlyph />
</a>
```

Repeat with `service="waze"`. Change both locale values of `visitMapsLabel` to `Maps` in `lib/site-content.ts`.

- [ ] **Step 4: Implement centered rotation and compact action sizing**

```css
.round-link i { transform: none; }
.round-link i > span { display: grid; place-items: center; line-height: 1; transform-origin: 50% 50%; transition: transform 160ms var(--ease-in-out); }
.route-service-icon { flex: 0 0 auto; width: 20px; height: 20px; }
.visit__actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: auto; }
.visit__actions .round-link { width: max-content; min-width: 0; gap: 12px; padding-left: 14px; }

@media (hover: hover) and (pointer: fine) {
  .round-link:hover i > span,
  .class-card:hover .class-card__footer i > span,
  .agenda-item:hover > i > span { transform: rotate(45deg); }
}
```

- [ ] **Step 5: Run tests and commit**

Run: `node --test tests/button-motion.test.mjs tests/location-panel.test.mjs`

Expected: all tests pass.

```powershell
git add components/HomePage.tsx lib/site-content.ts app/globals.css tests/button-motion.test.mjs tests/location-panel.test.mjs
git commit -m "feat: refine CTA motion and route actions"
```

### Task 5: Compact the mobile footer

**Files:**
- Create: `tests/mobile-footer.test.mjs`
- Modify: `app/globals.css`

- [ ] **Step 1: Write the failing footer test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesPath = new URL("../app/globals.css", import.meta.url);

test("compacts the mobile footer without hiding information", async () => {
  const styles = await readFile(stylesPath, "utf8");
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.site-footer__grid\s*\{[^}]*padding-block:\s*38px[^}]*row-gap:\s*30px/s);
  assert.match(styles, /\.site-footer__identity\s*\{[^}]*margin-bottom:\s*0/s);
  assert.match(styles, /\.site-footer__column:last-child\s*\{[^}]*grid-column:\s*1\s*\/\s*-1[^}]*flex-direction:\s*row/s);
  assert.match(styles, /\.site-footer__bottom\s*\{[^}]*gap:\s*14px[^}]*padding-block:\s*16px/s);
});
```

- [ ] **Step 2: Run the test and verify red**

Run: `node --test tests/mobile-footer.test.mjs`

Expected: FAIL on the old 56px padding and vertical language column.

- [ ] **Step 3: Implement the compact footer grid**

```css
@media (max-width: 760px) {
  .site-footer__grid { grid-template-columns: 1fr 1fr; column-gap: 24px; row-gap: 30px; padding-block: 38px; }
  .site-footer__identity { grid-column: 1 / -1; margin-bottom: 0; }
  .site-footer__identity p { margin-top: 18px; }
  .site-footer__column { gap: 10px; }
  .site-footer__column > span { margin-bottom: 6px; }
  .site-footer__column:last-child { grid-column: 1 / -1; flex-direction: row; align-items: center; flex-wrap: wrap; gap: 10px 18px; }
  .site-footer__column:last-child > span { width: 100%; margin-bottom: 0; }
  .site-footer__bottom { flex-wrap: wrap; gap: 14px; padding-block: 16px; }
  .site-footer__legal { order: 3; width: 100%; justify-content: flex-start; gap: 8px 16px; }
}
```

- [ ] **Step 4: Run the footer test and commit**

Run: `node --test tests/mobile-footer.test.mjs`

Expected: 1 test passes.

```powershell
git add app/globals.css tests/mobile-footer.test.mjs
git commit -m "fix: compact mobile footer layout"
```

### Task 6: Full verification and deployment readiness

**Files:**
- Verify only; no source edits unless a discovered defect requires a new failing test first.

- [ ] **Step 1: Run automated verification**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: every test passes, ESLint exits 0, and Next.js generates all PT/EN routes.

- [ ] **Step 2: Validate responsive geometry**

At 1920 × 1080, 1024 × 768 and 390 × 844, verify:

- manifest and classes eyebrow/title/body share the same left coordinate;
- page has no horizontal overflow;
- top mobile header is 88 px and compact header is visually 72 px;
- brand icon X coordinate stays constant throughout forward and reverse scroll;
- wordmark reveals progressively right-to-left;
- brand and Menu center-Y coordinates differ by no more than 1 px;
- card action is top-right on mobile;
- Maps and Waze actions use intrinsic widths and wrap only when necessary;
- mobile footer contains every link in materially less height.

- [ ] **Step 3: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce` and confirm there is no positional scroll entrance, while content remains visible and color/state changes stay legible.

- [ ] **Step 4: Review and commit any test-only verification adjustment**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors and no untracked diagnostic artifacts.
