import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const headerPath = new URL("../components/SiteHeader.tsx", import.meta.url);
const stylesPath = new URL("../app/globals.css", import.meta.url);

test("turns the mobile menu into a dismissible non-scrolling sheet", async () => {
  const [header, styles] = await Promise.all([
    readFile(headerPath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  assert.match(header, /className="mobile-menu-backdrop"/);
  assert.match(header, /onPointerDown=\{handleMenuPointerDown\}/);
  assert.match(header, /onPointerMove=\{handleMenuPointerMove\}/);
  assert.match(header, /onPointerUp=\{handleMenuPointerEnd\}/);
  assert.match(styles, /\.mobile-menu-backdrop\s*\{/);
  assert.match(styles, /\.main-navigation\s*\{[^}]*overflow:\s*hidden/s);
  assert.doesNotMatch(styles, /\.main-navigation\s*\{[^}]*min-height:\s*100svh/s);
});

test("collapses the mobile wordmark only while the header is compact", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(
    styles,
    /\.site-header--compact:not\(\.site-header--menu-open\)\s+\.brand__official-name\s*\{[^}]*clip-path:\s*inset\(0 100% 0 0\)/s,
  );

  assert.match(
    styles,
    /\.brand__official-name\s*\{[^}]*clip-path:\s*inset\(0 0 0 0\)[^}]*transition:[^}]*clip-path\s+\.7s\s+var\(--ease-in-out\)/s,
  );
  assert.match(
    styles,
    /\.site-header--compact:not\(\.site-header--menu-open\)\s+\.brand__official-name\s*\{[^}]*opacity:\s*1[^}]*transform:\s*none/s,
  );
  assert.doesNotMatch(
    styles,
    /\.site-header--compact:not\(\.site-header--menu-open\)\s+\.brand\s*\{[^}]*(?:width:\s*49px|gap:\s*0)/s,
  );
});

test("keeps the mobile brand and menu toggle on the same stable center line", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(
    styles,
    /@media \(max-width:\s*760px\)[\s\S]*?\.site-header__main[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto/s,
  );
  assert.match(
    styles,
    /@media \(max-width:\s*760px\)[\s\S]*?\.site-header \.menu-toggle\s*\{[^}]*position:\s*static[^}]*height:\s*49px[^}]*transform:\s*none/s,
  );
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.site-header-spacer\s*\{[^}]*height:\s*88px/s);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.site-header__main[^}]*min-height:\s*82px/s);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.site-header--compact \.site-header__main\s*\{[^}]*min-height:\s*69px/s);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.site-header\s*\{[^}]*transition:[^}]*background\s+\.65s\s+var\(--ease-in-out\)/s);
});

test("makes the brand return home or scroll the current home page to the top", async () => {
  const header = await readFile(headerPath, "utf8");

  assert.match(header, /onClick=\{handleBrandClick\}/);
  assert.match(header, /window\.scrollTo\(\{\s*top:\s*0,\s*behavior:\s*"smooth"\s*\}\)/s);
});

test("protects mobile hero copy with a strong lower-half shade", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.hero__shade\s*\{[^}]*rgba\(5,6,9,\.72\)\s*39%[^}]*rgba\(5,6,9,\.94\)\s*57%/s);
  assert.match(styles, /\.hero__slide:nth-child\(1\) \.hero__mobile-image\s*\{[^}]*translateY\(-8%\)[^}]*scale\(1\.18\)/s);
  assert.match(styles, /\.hero__copy::before\s*\{[^}]*rgba\(3,4,8,\.86\)[^}]*blur\(14px\)/s);
});
