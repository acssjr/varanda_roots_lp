import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const stylesPath = new URL("../app/globals.css", import.meta.url);
const homePath = new URL("../components/HomePage.tsx", import.meta.url);
const configPath = new URL("../next.config.ts", import.meta.url);
const fontPath = new URL("../public/fonts/SaansCollectionVF-Latin-TRIAL.woff2", import.meta.url);

test("serves one compact variable Saans font for proportional and mono typography", async () => {
  const [styles, font] = await Promise.all([readFile(stylesPath, "utf8"), stat(fontPath)]);
  const declaredSources = [...styles.matchAll(/@font-face\{[^}]*src:url\("([^"]+)"\)/g)].map((match) => match[1]);

  assert.deepEqual([...new Set(declaredSources)], ["/fonts/SaansCollectionVF-Latin-TRIAL.woff2"]);
  assert.ok(font.size < 100 * 1024, `expected the initial font to stay below 100 KiB, received ${font.size}`);
  assert.doesNotMatch(styles, /Saans(?:Mono|SemiMono)-TRIAL/);
  assert.match(styles, /\.eyebrow,[^{]*\{\s*font-variation-settings:\s*"MONO" 100/s);
  assert.match(styles, /\.site-header__utility,[^{]*\.visit__mode-label\s*\{\s*font-variation-settings:\s*"MONO" 55/s);
});

test("delivers the mobile hero with a compressed modern image candidate", async () => {
  const [home, config] = await Promise.all([readFile(homePath, "utf8"), readFile(configPath, "utf8")]);

  assert.match(home, /const common = \{ alt, quality:\s*75 \} as const/);
  assert.match(config, /formats:\s*\["image\/avif",\s*"image\/webp"\]/);
  assert.match(config, /optimizePackageImports:\s*\["lucide-react"\]/);
});

test("keeps GSAP out of the initial home bundle and loads motion on demand", async () => {
  const home = await readFile(homePath, "utf8");

  assert.doesNotMatch(home, /import \{ useGSAP \} from "@gsap\/react"/);
  assert.doesNotMatch(home, /import gsap from "gsap"/);
  assert.match(home, /Promise\.all\(\[[\s\S]*?import\("gsap"\)[\s\S]*?import\("gsap\/ScrollTrigger"\)/);
  assert.match(home, /addEventListener\("wheel", initializeMotion/);
  assert.match(home, /addEventListener\("touchstart", initializeMotion/);
  assert.match(home, /addEventListener\("scroll", initializeMotion/);
  assert.match(home, /previousIndex\.current === activeIndex/);
});

test("avoids expensive full-screen hero filters and decodes the LCP image synchronously", async () => {
  const [home, styles] = await Promise.all([readFile(homePath, "utf8"), readFile(stylesPath, "utf8")]);

  assert.match(home, /decoding=\{eager \? "sync" : "async"\}/);
  assert.doesNotMatch(styles, /\.hero__slide img\s*\{[^}]*filter:/s);
});
