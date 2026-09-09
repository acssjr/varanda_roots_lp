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
  assert.match(styles, /\.main-navigation\s*\{[^}]*overflow-y:\s*hidden/s);
  assert.doesNotMatch(styles, /\.main-navigation\s*\{[^}]*min-height:\s*100svh/s);
});

test("collapses the mobile wordmark only while the header is compact", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(
    styles,
    /\.site-header--compact:not\(\.site-header--menu-open\)\s+\.brand__official-name\s*\{[^}]*opacity:\s*0/s,
  );
});

test("makes the brand return home or scroll the current home page to the top", async () => {
  const header = await readFile(headerPath, "utf8");

  assert.match(header, /onClick=\{handleBrandClick\}/);
  assert.match(header, /window\.scrollTo\(\{\s*top:\s*0,\s*behavior:\s*"smooth"\s*\}\)/s);
});

test("protects mobile hero copy with a localized lower-third shade", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.hero__shade\s*\{[^}]*rgba\(8,\s*8,\s*10,\s*0\)\s*72%/s);
});
