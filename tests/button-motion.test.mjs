import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesPath = new URL("../app/globals.css", import.meta.url);

test("gives arrow buttons subtle pointer-specific motion feedback", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /\.round-link i > span[^\{]*\{[^}]*transition:\s*transform\s+160ms\s+var\(--ease-in-out\)/s);
  assert.match(styles, /@media \(hover:\s*hover\) and \(pointer:\s*fine\)/);
  assert.match(styles, /\.round-link:hover i > span[^{]*\{[^}]*transform:\s*rotate\(45deg\)/s);
  assert.doesNotMatch(styles, /\.round-link:hover i\s*\{[^}]*transform/s);
  assert.match(styles, /\.round-link:active[^}]*transform:\s*scale\(\.98\)/s);
});
