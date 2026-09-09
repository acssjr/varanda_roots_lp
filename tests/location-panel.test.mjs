import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = new URL("../components/HomePage.tsx", import.meta.url);
const contentPath = new URL("../lib/site-content.ts", import.meta.url);
const stylesPath = new URL("../app/globals.css", import.meta.url);

test("offers Google Maps and Waze routes from the location panel", async () => {
  const homePage = await readFile(homePagePath, "utf8");

  assert.match(homePage, /google\.com\/maps\/dir\/\?api=1/);
  assert.match(homePage, /ul\.waze\.com\/ul\?place=ChIJ52z4fWsDFgcRf1jeybK-zmM/);
  assert.match(homePage, /className="visit__actions"/);
});

test("shows the neighborhood and three researched walking references", async () => {
  const [homePage, content] = await Promise.all([
    readFile(homePagePath, "utf8"),
    readFile(contentPath, "utf8"),
  ]);

  assert.match(homePage, /className="visit__neighborhood"/);
  assert.match(homePage, /className="visit__nearby"/);
  assert.match(homePage, /className="visit__nearby-icon"/);
  assert.match(content, /Praia do Buracão/);
  assert.match(content, /Vila Caramuru/);
  assert.match(content, /Largo de Santana/);
  assert.match(content, /9 min a pé/);
  assert.match(content, /13 min a pé/);
  assert.match(content, /18 min a pé/);
});

test("keeps the enriched location panel responsive", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.visit__nearby-item\s*\{/);
  assert.match(styles, /\.visit__actions\s*\{/);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.visit__actions\s*\{[^}]*grid-template-columns:\s*1fr/s);
});
