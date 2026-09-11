import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePagePath = new URL("../components/HomePage.tsx", import.meta.url);
const contentPath = new URL("../lib/site-content.ts", import.meta.url);
const stylesPath = new URL("../app/globals.css", import.meta.url);

test("offers Google Maps and Waze routes from the location panel", async () => {
  const [homePage, content] = await Promise.all([
    readFile(homePagePath, "utf8"),
    readFile(contentPath, "utf8"),
  ]);

  assert.match(homePage, /google\.com\/maps\/dir\/\?api=1/);
  assert.match(homePage, /ul\.waze\.com\/ul\?place=ChIJ52z4fWsDFgcRf1jeybK-zmM/);
  assert.match(homePage, /className="visit__actions"/);
  assert.match(homePage, /function RouteServiceIcon/);
  assert.match(homePage, /<RouteServiceIcon service="maps"/);
  assert.match(homePage, /<RouteServiceIcon service="waze"/);
  assert.match(content, /visitMapsLabel:\s*"Maps"/);
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
  assert.match(content, /walk:\s*\{ time: "9 min", distance: "600 m" \}/);
  assert.match(content, /walk:\s*\{ time: "13 min", distance: "950 m" \}/);
  assert.match(content, /walk:\s*\{ time: "18 min", distance: "1,3 km" \}/);
});

test("switches between fixed walking, cycling and driving references", async () => {
  const [homePage, content, styles] = await Promise.all([
    readFile(homePagePath, "utf8"),
    readFile(contentPath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  assert.match(homePage, /const \[travelMode, setTravelMode\] = useState<TravelMode>\("walk"\)/);
  assert.match(homePage, /className="visit__mode-switch"/);
  assert.match(homePage, /role="group"/);
  assert.match(homePage, /aria-pressed=\{travelMode === mode\}/);
  assert.match(homePage, /className=\{`visit__nearby-metric/);
  assert.match(content, /visitTravelModeLabel:\s*"Como você vem\?"/);
  assert.match(content, /visitTravelModes:\s*\{\s*walk:\s*"A pé",\s*bike:\s*"Bicicleta",\s*car:\s*"Carro"\s*\}/s);
  for (const value of ["600 m", "950 m", "1,2 km", "1,3 km", "1.2 km", "1.3 km"]) {
    assert.match(content, new RegExp(value.replace(".", "\\.")));
  }
  assert.match(styles, /\.visit__mode-button\s*\{/);
  assert.match(styles, /\.visit__nearby-metric\s*\{[^}]*opacity:\s*0[^}]*transform:\s*translate3d/s);
  assert.match(styles, /\.visit__nearby-metric\.is-active\s*\{[^}]*opacity:\s*1[^}]*transform:\s*translate3d\(0,\s*0,\s*0\)/s);
});

test("keeps the enriched location panel responsive", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.visit__nearby-item\s*\{/);
  assert.match(styles, /\.visit__actions\s*\{[^}]*display:\s*flex[^}]*flex-wrap:\s*wrap/s);
  assert.match(styles, /\.visit__actions \.round-link\s*\{[^}]*width:\s*max-content/s);
});
