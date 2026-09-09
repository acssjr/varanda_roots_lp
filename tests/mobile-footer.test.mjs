import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesPath = new URL("../app/globals.css", import.meta.url);

test("compacts the mobile footer without hiding information", async () => {
  const styles = await readFile(stylesPath, "utf8");

  assert.match(styles, /@media \(max-width:\s*760px\)[\s\S]*?\.site-footer__grid\s*\{[^}]*padding-block:\s*38px[^}]*row-gap:\s*30px/s);
  assert.match(styles, /\.site-footer__identity\s*\{[^}]*margin-bottom:\s*0/s);
  assert.match(styles, /\.site-footer__column:last-child\s*\{[^}]*grid-column:\s*1\s*\/\s*-1[^}]*flex-direction:\s*row/s);
  assert.match(styles, /\.site-footer__bottom\s*\{[^}]*gap:\s*14px[^}]*padding-block:\s*16px/s);
});
