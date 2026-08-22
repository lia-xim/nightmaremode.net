import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const roots = ["design", "public", "src/assets"];
const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)],
);
const files = roots.flatMap(walk).filter((file) => /\.(png|jpe?g|webp)$/i.test(file));
const images = [];
for (const file of files) {
  const metadata = await sharp(file).metadata();
  images.push({ file, width: metadata.width, height: metadata.height, format: metadata.format, size: statSync(file).size });
}
const invalid = images.filter((image) => !image.width || !image.height || !image.format);
console.log(JSON.stringify({ count: images.length, invalid, images }, null, 2));
if (invalid.length > 0) process.exitCode = 1;
