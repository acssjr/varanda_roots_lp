import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const headerPath = new URL("../components/SiteHeader.tsx", import.meta.url);
const brandPath = new URL("../components/BrandMark.tsx", import.meta.url);
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
  assert.match(header, /ref=\{navigationRef\}/);
  assert.match(
    header,
    /className="mobile-menu-backdrop"[\s\S]*?onPointerDown=\{handleMenuPointerDown\}[\s\S]*?onPointerMove=\{handleMenuPointerMove\}[\s\S]*?onPointerUp=\{handleMenuPointerEnd\}[\s\S]*?onPointerCancel=\{handleMenuPointerCancel\}/,
  );
  assert.match(styles, /\.mobile-menu-backdrop\s*\{/);
  assert.match(styles, /\.main-navigation\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(styles, /\.site-header\s*\{[^}]*--mobile-header-edge:\s*148px/s);
  assert.match(
    styles,
    /@media \(max-width:\s*1080px\)[\s\S]*?\.site-header\s*\{[^}]*--mobile-header-edge:\s*136px[\s\S]*?\.site-header--compact\s*\{[^}]*--mobile-header-edge:\s*75px/s,
  );
  assert.match(
    styles,
    /@media \(max-width:\s*760px\)[\s\S]*?\.site-header\s*\{[^}]*--mobile-header-edge:\s*88px[\s\S]*?\.site-header--compact\s*\{[^}]*--mobile-header-edge:\s*72px/s,
  );
  assert.match(styles, /\.main-navigation\s*\{[^}]*top:\s*var\(--mobile-header-edge\)/s);
  assert.doesNotMatch(styles, /\.main-navigation\s*\{[^}]*min-height:\s*100svh/s);
});

test("defines a subtle boundary only for light page headers", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.site-header::after\s*\{[^}]*width:\s*var\(--shell\)[^}]*opacity:\s*0/s);
  assert.match(
    styles,
    /body:has\(\.rich-page--light\) \.site-header:not\(\.site-header--compact\):not\(\.site-header--menu-open\)::after\s*\{[^}]*opacity:/s,
  );
  assert.match(styles, /\.site-header--compact::after[\s\S]*?opacity:\s*0/s);
});

test("reconstructs the wordmark from left to right on desktop and mobile without moving the brand", async () => {
  const [header, brand, styles] = await Promise.all([
    readFile(headerPath, "utf8"),
    readFile(brandPath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  assert.match(
    styles,
    /\.site-header--compact:not\(\.site-header--menu-open\)\s+\.brand__official-name\s*\{[^}]*width:\s*0/s,
  );
  assert.match(
    styles,
    /\.site-header--menu-open\s+\.brand__official-name\s*\{[^}]*width:\s*var\(--brand-name-width\)/s,
  );

  assert.match(
    styles,
    /\.brand__official-name\s*\{[^}]*overflow:\s*hidden[^}]*contain:\s*layout paint[^}]*transition:\s*width\s+\.62s\s+var\(--ease-in-out\)/s,
  );
  assert.match(styles, /\.brand__official-name-shape\s*\{[^}]*position:\s*absolute[^}]*left:\s*0[^}]*width:\s*var\(--brand-name-width\)[^}]*translateZ\(0\)/s);
  assert.doesNotMatch(
    styles,
    /\.site-header--compact:not\(\.site-header--menu-open\)\s+\.brand\s*\{[^}]*(?:width:\s*49px|gap:\s*0)/s,
  );
  assert.doesNotMatch(styles, /(?:^|\n)\.brand--compact\s*\{[^}]*(?:width|height):/s);
  assert.doesNotMatch(styles, /(?:^|\n)\.site-header--compact\s+\.brand__official-icon\s*\{[^}]*width:/s);
  assert.match(brand, /className="brand__official-name-shape"/);
  assert.match(header, /compactRef\.current\s*\?\s*window\.scrollY\s*>\s*72\s*:\s*window\.scrollY\s*>\s*128/);
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
  assert.match(styles, /\.menu-toggle:focus-visible\s*\{[^}]*outline:\s*none[^}]*box-shadow:\s*none/s);
});

test("keeps the tablet header spacer flush with the fixed header", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(
    styles,
    /@media \(max-width:\s*1080px\)[\s\S]*?\.site-header-spacer\s*\{[^}]*height:\s*136px[\s\S]*?\.site-header__main\s*\{[^}]*min-height:\s*92px/s,
  );
});

test("makes the brand return home or scroll the current home page to the top", async () => {
  const header = await readFile(headerPath, "utf8");

  assert.match(header, /onClick=\{handleBrandClick\}/);
  assert.match(header, /window\.scrollTo\(\{\s*top:\s*0,\s*behavior:\s*"smooth"\s*\}\)/s);
});

test("protects mobile hero copy with a strong lower-half shade", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.hero__shade\s*\{[^}]*rgba\(5,6,9,\.72\)\s*39%[^}]*rgba\(5,6,9,\.94\)\s*57%/s);
  assert.match(styles, /\.hero__slide:nth-child\(1\) \.hero__image\s*\{[^}]*translateY\(-8%\)[^}]*scale\(1\.18\)/s);
  assert.match(styles, /\.hero__copy::before\s*\{[^}]*rgba\(3,4,8,\.86\)[^}]*blur\(14px\)/s);
});
