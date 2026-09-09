import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = new URL("../components/HomePage.tsx", import.meta.url);
const stylesPath = new URL("../app/globals.css", import.meta.url);

test("uses the validated Google Maps embed without a static map image", async () => {
  const [homePage, styles] = await Promise.all([
    readFile(homePagePath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  assert.match(
    homePage,
    /https:\/\/www\.google\.com\/maps\?q=.*Rua%20Deputado%20Cunha%20Bueno.*&output=embed/,
  );
  assert.match(homePage, /<iframe[\s\S]*?allowFullScreen[\s\S]*?\/>/);
  assert.doesNotMatch(homePage, /\/maps\/embed\?pb=/);
  assert.doesNotMatch(styles, /google-maps-varanda\.webp/);
});
