import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();

async function readReadme() {
  return readFile(path.join(root, "README.md"), "utf8");
}

test("documents the real project setup and validation commands", async () => {
  const readme = await readReadme();

  assert.match(readme, /Varanda Roots/);
  assert.match(readme, /Next\.js 16/);
  assert.match(readme, /React 19/);
  for (const command of ["npm ci", "npm run dev", "npm test", "npm run lint", "npm run build"]) {
    assert.match(readme, new RegExp(command.replaceAll(" ", "\\s+")));
  }
  assert.match(readme, /\/pt/);
  assert.match(readme, /\/en/);
});

test("maps maintenance, commercial asset care and Vercel delivery", async () => {
  const readme = await readReadme();

  for (const projectPath of [
    "lib/site-content.ts",
    "lib/rich-page-content.ts",
    "components/SiteHeader.tsx",
    "components/HomePage.tsx",
    "app/globals.css",
    "public/",
    "assets/media-source/",
    "docs/",
  ]) {
    assert.ok(readme.includes(projectPath), `README must mention ${projectPath}`);
  }

  assert.match(readme, /Vercel/);
  assert.match(readme, /main/);
  assert.match(readme, /marca/i);
  assert.match(readme, /uso comercial/i);
  assert.match(readme, /não (?:é|está publicado como) (?:um projeto |software )?de código aberto/i);
});

test("keeps local documentation links valid and contains no placeholders", async () => {
  const readme = await readReadme();
  const relativeLinks = [...readme.matchAll(/\[[^\]]+\]\((?!https?:|#)([^)]+)\)/g)].map((match) => match[1]);

  assert.ok(relativeLinks.length > 0, "README must link to local maintenance documentation");
  for (const relativeLink of relativeLinks) {
    const cleanPath = decodeURIComponent(relativeLink.split("#")[0]);
    await access(path.resolve(root, cleanPath));
  }

  assert.doesNotMatch(readme, /\b(?:TBD|TODO|FIXME)\b|<[^>]+>/i);
});
