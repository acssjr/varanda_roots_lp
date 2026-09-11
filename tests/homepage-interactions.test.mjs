import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePath = new URL("../components/HomePage.tsx", import.meta.url);
const stylesPath = new URL("../app/globals.css", import.meta.url);

test("keeps the first hero slide on screen for the initial carousel cycle", async () => {
  const home = await readFile(homePath, "utf8");

  assert.match(home, /useState\(0\)/);
  assert.match(home, /isFirstCycle \? 10000 : 6500/);
  assert.match(home, /window\.setTimeout\(advance/);
});

test("reveals the manifest phrase progressively with scroll", async () => {
  const [home, styles] = await Promise.all([
    readFile(homePath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  assert.match(home, /className="manifest__highlight"/);
  assert.match(home, /"--highlight-progress": "100%"/);
  assert.match(home, /scrub: 0\.55/);
  assert.match(home, /className="manifest__highlight-row"/);
  assert.match(styles, /\.manifest__highlight-row\s*\{[^}]*display:\s*block[^}]*margin-top:\s*\.12em[^}]*line-height:\s*1/s);
  assert.match(styles, /\.manifest__highlight\s*\{[^}]*display:\s*inline/s);
  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.manifest__highlight-row\s*\{[^}]*margin-top:\s*\.18em[^}]*line-height:\s*1\.08/s);
  assert.match(styles, /linear-gradient\(90deg, var\(--blue\) 0 var\(--highlight-progress\), transparent var\(--highlight-progress\) 100%\)/);
});
