import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesPath = new URL("../app/globals.css", import.meta.url);
const homePath = new URL("../components/HomePage.tsx", import.meta.url);

test("adds subtle responsive page margins", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /--shell:\s*min\(100% - 64px,\s*1500px\)/);
  assert.match(styles, /@media \(max-width:\s*1080px\)[\s\S]*?--shell:\s*min\(100% - 48px,\s*1500px\)/);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?--shell:\s*calc\(100% - 36px\)/);
});

test("aligns manifest and class introductions to one left edge", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.manifest__grid\s*\{[^}]*display:\s*block/s);
  assert.match(styles, /\.manifest h2\s*\{[^}]*margin:\s*46px 0 0/s);
  assert.match(styles, /\.manifest p\s*\{[^}]*margin:\s*42px 0 0/s);
  assert.match(styles, /\.section-heading\s*\{[^}]*display:\s*block/s);
  assert.match(styles, /\.section-heading h2\s*\{[^}]*margin:\s*42px 0 0/s);
  assert.match(styles, /\.section-heading > p\s*\{[^}]*margin:\s*28px 0 0/s);
  assert.match(styles, /\.section-heading--split\s*\{[^}]*display:\s*grid/s);
});

test("reveals the yellow section and class cards once from below", async () => {
  const home = await readFile(homePath, "utf8");

  assert.match(home, /trigger:\s*"\.manifest"/);
  assert.match(home, /clipPath:\s*"inset\(100% 0 0 0\)"/);
  assert.match(home, /yPercent:\s*8/);
  assert.match(home, /trigger:\s*"\.class-grid"/);
  assert.match(home, /stagger:\s*0?\.07/);
  assert.match(home, /once:\s*true/);
});

test("places the mobile class action in the upper-right corner", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(
    styles,
    /@media \(max-width:\s*760px\)[\s\S]*?\.class-card__footer i\s*\{[^}]*position:\s*absolute[^}]*top:\s*24px[^}]*right:\s*24px/s,
  );
});
