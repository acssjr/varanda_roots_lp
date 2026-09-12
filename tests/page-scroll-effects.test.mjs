import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesPath = new URL("../app/globals.css", import.meta.url);
const effectPath = new URL("../components/PageScrollFade.tsx", import.meta.url);
const layoutPath = new URL("../app/layout.tsx", import.meta.url);

test("builds the bottom fade from progressive backdrop blur layers", async () => {
  const [effect, styles] = await Promise.all([
    readFile(effectPath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  assert.match(effect, /Array\.from\(\{ length: 8 \}/);
  assert.match(styles, /\.page-scroll-fade__edge--bottom[^}]*bottom:\s*-6px[^}]*height:\s*calc\(clamp\(104px,\s*12vw,\s*154px\)\s*\+\s*6px\)/s);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.page-scroll-fade__edge--bottom\s*\{[^}]*bottom:\s*-6px[^}]*height:\s*102px/s);
  assert.match(styles, /\.page-scroll-fade__blur--1[^}]*backdrop-filter:\s*blur\(\.25px\)/s);
  assert.match(styles, /\.page-scroll-fade__blur--8[^}]*backdrop-filter:\s*blur\(28px\)/s);
});

test("adds restrained Lenis wheel smoothing while preserving reduced motion", async () => {
  const [effect, layout] = await Promise.all([
    readFile(effectPath, "utf8"),
    readFile(layoutPath, "utf8"),
  ]);

  assert.match(layout, /import "lenis\/dist\/lenis\.css"/);
  assert.doesNotMatch(effect, /^import Lenis from "lenis";/m);
  assert.match(effect, /await import\("lenis"\)/);
  assert.match(effect, /try\s*\{[\s\S]*?await import\("lenis"\)[\s\S]*?\}\s*catch\s*\{/);
  assert.match(effect, /requestIdleCallback/);
  assert.match(effect, /duration:\s*1\.15/);
  assert.match(effect, /wheelMultiplier:\s*0\.82/);
  assert.match(effect, /smoothWheel:\s*!reducedMotion\.matches/);
  assert.match(effect, /syncTouch:\s*false/);
});

test("stops smooth scrolling while the mobile menu owns the viewport", async () => {
  const effect = await readFile(effectPath, "utf8");

  assert.match(effect, /window\.addEventListener\("varanda:scroll-lock",\s*handleScrollLock\)/);
  assert.match(effect, /window\.removeEventListener\("varanda:scroll-lock",\s*handleScrollLock\)/);
  assert.match(effect, /if \(pageScrollLocked\)\s*\{\s*lenis\?\.stop\(\);\s*\}\s*else\s*\{\s*lenis\?\.start\(\);/s);
  assert.match(effect, /if \(pageScrollLocked\) lenis\.stop\(\)/);
});

test("uses a transient overlay thumb without reserving page width", async () => {
  const [effect, styles] = await Promise.all([
    readFile(effectPath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  assert.match(effect, /classList\.add\("is-scrolling"\)/);
  assert.match(effect, /classList\.remove\("is-scrolling"\), 720/);
  assert.match(styles, /html\s*\{[^}]*scrollbar-width:\s*none[^}]*scrollbar-gutter:\s*auto/s);
  assert.match(styles, /html::\-webkit-scrollbar,[\s\S]*?body::\-webkit-scrollbar\s*\{[^}]*width:\s*0/s);
  assert.match(effect, /--scroll-thumb-height/);
  assert.match(effect, /page-scroll-fade__scroll-thumb/);
  assert.match(styles, /\.page-scroll-fade__scroll-thumb\s*\{[^}]*position:\s*absolute[^}]*right:\s*4px[^}]*opacity:\s*0/s);
  assert.match(styles, /\.page-scroll-fade\.is-scrolling \.page-scroll-fade__scroll-thumb\s*\{[^}]*opacity:\s*\.88/s);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.page-scroll-fade__scroll-thumb\s*\{[^}]*right:\s*3px[^}]*width:\s*3px/s);
});
