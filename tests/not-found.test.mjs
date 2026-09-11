import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const viewPath = new URL("../components/NotFoundView.tsx", import.meta.url);
const rootPath = new URL("../app/not-found.tsx", import.meta.url);
const localePath = new URL("../app/[locale]/not-found.tsx", import.meta.url);
const stylesPath = new URL("../app/globals.css", import.meta.url);

test("provides the branded 404 for global and localized missing routes", async () => {
  const [view, root, localized] = await Promise.all([
    readFile(viewPath, "utf8"),
    readFile(rootPath, "utf8"),
    readFile(localePath, "utf8"),
  ]);

  assert.match(root, /<NotFoundView\s*\/>/);
  assert.match(localized, /<NotFoundView\s*\/>/);
  assert.match(view, /pathname\?\.startsWith\("\/en"\)/);
  assert.match(view, /not-found-page--standalone/);
  assert.match(view, /href=\{`\/\$\{locale\}`\}/);
  assert.match(view, /data-page-transition="home"/);
  assert.doesNotMatch(view, /PASSO PERDIDO|MISSED STEP/);
  assert.match(view, /Essa página saiu para dançar/);
  assert.match(view, /This page went out dancing/);
});

test("animates the official icon and respects reduced motion", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.not-found-page__brand-icon[^}]*iconevarandaroots\.svg/s);
  assert.match(styles, /@keyframes not-found-dance/);
  assert.match(styles, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.not-found-page__zero[\s\S]*?animation:\s*none/s);
  assert.match(styles, /\.not-found-page[^}]*linear-gradient\([^}]*var\(--blue-dark\)/s);
});
