import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "assets", "media-source", "images", "course-brand");
const outputDir = path.join(root, "public", "images", "course", "brand");

const variants = [
  {
    source: "aprendaoroots1.svg",
    output: "aprendaoroots1.svg",
    accent: "#b85135",
    light: "#fffaf3",
  },
  {
    source: "aprendaoroots2-horizontal.svg",
    output: "aprendaoroots2-horizontal.svg",
    accent: "#b85135",
    light: "#fffaf3",
  },
  {
    source: "aprendaoroots1.svg",
    output: "aprendaoroots1-footer.svg",
    accent: "#d68a6a",
    light: "#f6efe6",
  },
];

function hexToRgb(hex) {
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

function isLightFill(hex) {
  const [red, green, blue] = hexToRgb(hex);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const saturation = max === 0 ? 0 : (max - min) / max;
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  return luminance > 0.76 && saturation < 0.28;
}

await mkdir(outputDir, { recursive: true });

for (const variant of variants) {
  const source = await readFile(path.join(sourceDir, variant.source), "utf8");
  const adapted = source.replace(/fill="(#[0-9a-fA-F]{6})"/g, (_, color) => {
    return `fill="${isLightFill(color) ? variant.light : variant.accent}"`;
  });

  await writeFile(path.join(outputDir, variant.output), adapted);
}

console.log(`Adapted ${variants.length} course brand SVG variants to the landing-page palette.`);
