import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceFiles = [
  "lib/rich-page-content.ts",
  "lib/site-content.ts",
  "components/HomePage.tsx",
  "components/InternalPageView.tsx",
];

test("keeps every published content image above the minimum source resolution", async () => {
  const sources = await Promise.all(sourceFiles.map((file) => readFile(join(root, file), "utf8")));
  const imagePaths = new Set(sources.flatMap((source) => source.match(/\/images\/[^"]+\.webp/g) ?? []));

  assert.ok(imagePaths.size > 20, "the audit should cover the site's image catalogue");
  for (const imagePath of imagePaths) {
    const metadata = await sharp(join(root, "public", imagePath)).metadata();
    assert.ok(
      (metadata.width ?? 0) >= 1000,
      `${imagePath} has only ${metadata.width}px of source width`,
    );
  }
});

test("requests high-fidelity internal images at their real responsive widths", async () => {
  const view = await readFile(join(root, "components/InternalPageView.tsx"), "utf8");

  assert.match(view, /src=\{page\.heroImage\}[\s\S]*?quality=\{88\}/);
  assert.match(view, /max-width: 900px\) calc\(100vw - 48px\), 48vw/);
  assert.match(view, /src=\{item\.src\}[\s\S]*?quality=\{88\}/);
  assert.match(view, /index === 0[\s\S]*?58vw, 880px/);
});

test("balances the deliberate mobile hero crop with the performance image budget", async () => {
  const home = await readFile(join(root, "components/HomePage.tsx"), "utf8");

  assert.match(home, /src:\s*mobile[\s\S]*?sizes:\s*"118vw"/);
  assert.match(home, /quality:\s*75/);
  assert.match(home, /fetchPriority:\s*"high"/);
});
