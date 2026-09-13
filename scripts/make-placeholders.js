/**
 * Generate local placeholder images with Node built-ins only (no npm packages).
 * JPG/PNG targets are written as labelled SVG files with matching basenames
 * where binary raster output would need an external package — see notes below.
 *
 * Exception: favicon is written as favicon.svg (and index.html uses that).
 * All "jpg" placeholders are SVG files saved with .svg extension so every
 * asset referenced by the site exists on disk without third-party deps.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IMAGES = path.join(ROOT, "images");
const GALLERY = path.join(IMAGES, "gallery");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function labelledSvg(width, height, label, bg, fg) {
  const fontSize = Math.max(14, Math.round(Math.min(width, height) / 12));
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <rect width="100%" height="100%" fill="${bg}"/>
  <text x="50%" y="50%" fill="${fg}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" text-anchor="middle" dominant-baseline="middle">${escapeXml(label)}</text>
</svg>
`;
}

function writeSvg(filePath, width, height, label, bg, fg) {
  fs.writeFileSync(filePath, labelledSvg(width, height, label, bg, fg), "utf8");
  console.log("wrote", path.relative(ROOT, filePath));
}

function logoSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="48" viewBox="0 0 280 48" role="img" aria-label="All Carpet Cleaners">
  <rect width="280" height="48" fill="#0c4a45"/>
  <text x="140" y="30" fill="#f4f7f6" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" text-anchor="middle">All Carpet Cleaners</text>
</svg>
`;
}

function faviconSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0c4a45"/>
  <text x="16" y="22" fill="#f4f7f6" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" text-anchor="middle">A</text>
</svg>
`;
}

ensureDir(GALLERY);

fs.writeFileSync(path.join(IMAGES, "favicon.svg"), faviconSvg(), "utf8");
console.log("wrote images/favicon.svg");

fs.writeFileSync(path.join(IMAGES, "logo.svg"), logoSvg(), "utf8");
console.log("wrote images/logo.svg");

writeSvg(path.join(IMAGES, "hero.svg"), 1600, 900, "HERO IMAGE", "#1a5c56", "#e8f2f0");
writeSvg(path.join(IMAGES, "og-image.svg"), 1200, 630, "SOCIAL SHARE IMAGE", "#164a45", "#e8f2f0");

const pairs = [
  ["before-1", "BEFORE 1", "#5c4033"],
  ["after-1", "AFTER 1", "#2d6a4f"],
  ["before-2", "BEFORE 2", "#5c4033"],
  ["after-2", "AFTER 2", "#2d6a4f"],
  ["before-3", "BEFORE 3", "#5c4033"],
  ["after-3", "AFTER 3", "#2d6a4f"],
  ["before-4", "BEFORE 4", "#5c4033"],
  ["after-4", "AFTER 4", "#2d6a4f"],
  ["before-5", "BEFORE 5", "#5c4033"],
  ["after-5", "AFTER 5", "#2d6a4f"],
  ["before-6", "BEFORE 6", "#5c4033"],
  ["after-6", "AFTER 6", "#2d6a4f"],
];

for (const [name, label, bg] of pairs) {
  writeSvg(path.join(GALLERY, name + ".svg"), 800, 600, label, bg, "#f5f5f0");
}

console.log("\nDone. Using .svg extension for all placeholders (no npm packages).");
console.log("favicon: images/favicon.svg (index.html link updated to match).");
