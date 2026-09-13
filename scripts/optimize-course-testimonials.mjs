import fs from "node:fs/promises";
import path from "node:path";
import { ImagePool } from "@squoosh/lib";

const sourceRoot = path.join(process.cwd(), "assets", "media-source", "images", "course-testimonials");
const outputRoot = path.join(process.cwd(), "public", "images", "course", "testimonials");

async function optimize() {
  const sourceFiles = (await fs.readdir(sourceRoot))
    .filter((file) => /\.(jpe?g|png)$/i.test(file));

  await fs.mkdir(outputRoot, { recursive: true });

  for (const file of sourceFiles) {
    const pool = new ImagePool(1);
    try {
      const sourcePath = path.join(sourceRoot, file);
      const image = pool.ingestImage(await fs.readFile(sourcePath));
      await image.decoded;
      await image.encode({ webp: { quality: 82, method: 4 } });
      const encoded = await image.encodedWith.webp;
      const outputPath = path.join(outputRoot, `${path.parse(file).name}.webp`);
      await fs.writeFile(outputPath, encoded.binary);

      const sourceSize = (await fs.stat(sourcePath)).size;
      const reduction = Math.round((1 - encoded.size / sourceSize) * 100);
      console.log(`${file}: ${sourceSize} -> ${encoded.size} bytes (${reduction}% smaller)`);
    } finally {
      await pool.close();
    }
  }
}

optimize().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
