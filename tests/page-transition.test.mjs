import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL("../components/PageTransition.tsx", import.meta.url);
const layoutPath = new URL("../app/[locale]/layout.tsx", import.meta.url);
const stylesPath = new URL("../app/globals.css", import.meta.url);

test("mounts one persistent transition layer around route changes", async () => {
  const [component, layout] = await Promise.all([
    readFile(componentPath, "utf8"),
    readFile(layoutPath, "utf8"),
  ]);

  assert.match(layout, /<PageTransition\s*\/>/);
  assert.match(component, /router\.prefetch/);
  assert.match(component, /router\.prefetch\(href\)/);
  assert.doesNotMatch(component, /transitionTargets\[locale\]\.forEach/);
  assert.match(component, /router\.push\(href\)/);
  assert.match(component, /phase:\s*"preparing"/);
  assert.match(component, /phase:\s*"covering"/);
  assert.match(component, /phase:\s*"revealing"/);
});

test("limits the experience to the five home-page destinations and the explicit 404 return", async () => {
  const component = await readFile(componentPath, "utf8");

  for (const slug of ["aulas", "eventos", "curso", "pia-e-pc", "contato"]) {
    assert.match(component, new RegExp(`slug: "${slug}"`));
  }
  assert.match(component, /event\.metaKey \|\| event\.ctrlKey \|\| event\.shiftKey \|\| event\.altKey/);
  assert.match(component, /url\.origin !== window\.location\.origin/);
  assert.match(component, /link\.target && link\.target !== "_self"/);
  assert.match(component, /link\.dataset\.pageTransition === "home"/);
  assert.match(component, /destinationLocale === "pt" \? "Início" : "Home"/);
  assert.match(component, /document\.addEventListener\("click", handleClick, true\)/);
  assert.match(component, /window\.requestAnimationFrame\(\(\) => \{[\s\S]*?window\.requestAnimationFrame/s);
});

test("centers the brand above the destination", async () => {
  const [component, styles] = await Promise.all([
    readFile(componentPath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  assert.doesNotMatch(component, /Opening|Abrindo/);
  assert.match(styles, /\.route-transition__lockup\s*\{[^}]*justify-items:\s*center[^}]*text-align:\s*center/s);
  assert.match(styles, /\.route-transition__destination\s*\{[^}]*border-top:\s*1px solid currentColor/s);
});

test("uses five distinct entrances, a brand reveal and a reduced-motion fallback", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.route-transition--classes \.route-transition__panel--left[^}]*translate3d\(-101%,\s*0,\s*0\)/s);
  assert.match(styles, /\.route-transition--events \.route-transition__panel--left[^}]*translate3d\(0,\s*-101%,\s*0\)/s);
  assert.match(styles, /\.route-transition--course \.route-transition__panel--left[^}]*skewX\(-7deg\)/s);
  assert.match(styles, /\.route-transition--people\s*\{[^}]*--transition-left:\s*var\(--blue\)[^}]*--transition-card:\s*var\(--yellow\)/s);
  assert.match(styles, /\.route-transition--people\[data-state="covering"\][^}]*clip-path:\s*circle\(75vmax/s);
  assert.match(styles, /\.route-transition--contact \.route-transition__panel--right[^}]*translate3d\(101%,\s*0,\s*0\)/s);
  assert.match(styles, /\.route-transition--home \.route-transition__panel--left[^}]*translate3d\(0,\s*-101%,\s*0\)/s);
  assert.match(styles, /\.route-transition\[data-state="preparing"\] \.route-transition__panel\s*\{[^}]*transition:\s*none/s);
  assert.match(styles, /\.route-transition__brand \.brand__official-name-shape[^}]*clip-path:\s*inset\(0 100% 0 0\)/s);
  assert.match(styles, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.route-transition__panel[^}]*transition:\s*opacity\s+\.18s/s);
});
