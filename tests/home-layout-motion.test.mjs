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

test("keeps compact mobile controls inside 48px touch targets", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.hero__dots button\s*\{[^}]*place-items:\s*center[^}]*width:\s*48px[^}]*height:\s*48px/s);
  assert.match(styles, /\.hero__dots i\s*\{[^}]*width:\s*42px/s);
  assert.match(styles, /\.visit__mode-button\s*\{[^}]*min-height:\s*48px/s);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.hero__dots i\s*\{[^}]*width:\s*31px/s);
});

test("keeps homepage sections compact without removing their breathing room", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.classes\s*\{[^}]*padding-block:\s*clamp\(72px,\s*8vw,\s*112px\)/s);
  assert.match(styles, /\.class-grid\s*\{[^}]*margin-top:\s*clamp\(44px,\s*5vw,\s*72px\)/s);
  assert.match(styles, /\.agenda\s*\{[^}]*padding-block:\s*clamp\(76px,\s*8vw,\s*120px\)/s);
  assert.match(styles, /\.duo\s*\{[^}]*padding-block:\s*clamp\(76px,\s*8vw,\s*124px\)/s);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.classes, \.agenda, \.duo\s*\{[^}]*padding-block:\s*62px/s);
});

test("reveals the yellow section and stacks class cards on mobile", async () => {
  const home = await readFile(homePath, "utf8");

  assert.match(home, /trigger:\s*"\.manifest"/);
  assert.match(home, /clipPath:\s*"inset\(100% 0 0 0\)"/);
  assert.match(home, /yPercent:\s*8/);
  assert.match(home, /trigger:\s*"\.class-grid"/);
  assert.match(home, /stagger:\s*0?\.07/);
  assert.match(home, /once:\s*true/);
  assert.match(home, /rotateX:\s*-6/);
  assert.match(home, /start:\s*"top 100%"/);
  assert.match(home, /scrub:\s*0\.8/);
});

test("removes false class-card actions and uses a sticky mobile stack", async () => {
  const [home, styles] = await Promise.all([readFile(homePath, "utf8"), readFile(stylesPath, "utf8")]);

  assert.doesNotMatch(home, /className="class-card__footer"><p>\{body\}<\/p><ActionArrow/);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.classes\s*\{[^}]*overflow:\s*visible/s);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.class-card\s*\{[^}]*position:\s*sticky[^}]*margin-bottom:\s*14px[^}]*transform-style:\s*preserve-3d/s);
});
