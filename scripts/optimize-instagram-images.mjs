import fs from "node:fs/promises";
import path from "node:path";
import { ImagePool } from "@squoosh/lib";

const sourceRoot = path.join(process.cwd(), "assets", "media-source", "images", "instagram");
const outputRoot = path.join(process.cwd(), "public", "images", "instagram", "optimized");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function collectImages(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectImages(entryPath);
    return supportedExtensions.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : [];
  }));
  return nested.flat();
}

async function optimize() {
  const requestedPrefix = process.argv[2]?.replaceAll("/", path.sep);
  const allSourceFiles = await collectImages(sourceRoot);
  const sourceFiles = requestedPrefix
    ? allSourceFiles.filter((sourcePath) => path.relative(sourceRoot, sourcePath).startsWith(requestedPrefix))
    : allSourceFiles;

  for (const sourcePath of sourceFiles) {
    const imagePool = new ImagePool(1);
    try {
      const relativePath = path.relative(sourceRoot, sourcePath);
      console.log(`Processing ${relativePath}`);
      const outputPath = path.join(
        outputRoot,
        path.dirname(relativePath),
        `${path.parse(relativePath).name}.webp`,
      );
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      const image = imagePool.ingestImage(await fs.readFile(sourcePath));
      const decoded = await image.decoded;
      const originalWidth = decoded.bitmap.width;
      const originalHeight = decoded.bitmap.height;
      const isHero = relativePath.startsWith(path.join("generated", "hero"));
      const isProfile = relativePath.startsWith(`profiles${path.sep}`);
      const maxWidth = isHero ? originalWidth : 1600;
      const quality = isHero || isProfile ? 88 : 82;

      if (originalWidth > maxWidth) {
        await image.preprocess({ resize: { width: maxWidth } });
      }

      await image.encode({ webp: { quality, method: 4 } });
      const encoded = await image.encodedWith.webp;
      await fs.writeFile(outputPath, encoded.binary);

      const sourceSize = (await fs.stat(sourcePath)).size;
      const reduction = Math.round((1 - encoded.size / sourceSize) * 100);
      console.log(
        `${relativePath} | ${originalWidth}x${originalHeight} | ` +
        `${sourceSize} -> ${encoded.size} bytes (${reduction}% smaller)`,
      );
    } finally {
      await imagePool.close();
    }
  }
}

optimize().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
