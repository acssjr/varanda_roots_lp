import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesPath = new URL("../app/globals.css", import.meta.url);

test("aligns every internal-page subtitle with its H1", async () => {
  const styles = await readFile(stylesPath, "utf8");
  const subtitleRule = styles.match(/\.internal-hero\s*>\s*p\s*\{([^}]*)\}/);

  assert.ok(subtitleRule, "expected a shared internal hero subtitle rule");
  assert.match(subtitleRule[1], /margin-left\s*:\s*0\s*;/);
  assert.doesNotMatch(subtitleRule[1], /margin-left\s*:\s*auto\s*;/);
});
