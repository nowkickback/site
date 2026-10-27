#!/usr/bin/env node
// Rebuilds the Phosphor icon subset in assets/phosphor/ from every `ph-*` class
// used in src/ and assets/*.js. Run after adding an icon:
//
//   node scripts/subset-icons.mjs
//
// Needs @phosphor-icons/web (devDependency) and fonttools with brotli for
// pyftsubset (`pip install fonttools brotli`). Each referenced name goes into
// both weights, since templates often build the class from data.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = join(root, "node_modules/@phosphor-icons/web/src");

const WEIGHTS = [
  { dir: "regular", cls: "ph", font: "Phosphor" },
  { dir: "fill", cls: "ph-fill", font: "Phosphor-Fill" },
];

function files(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) files(full, out);
    else if (/\.(njk|json|js|html|md)$/.test(name)) out.push(full);
  }
  return out;
}

const used = new Set();
for (const file of [...files(join(root, "src")), ...files(join(root, "assets")).filter((f) => f.endsWith(".js"))]) {
  for (const [, name] of readFileSync(file, "utf8").matchAll(/\bph-([a-z0-9]+(?:-[a-z0-9]+)*)\b/g)) {
    if (name !== "fill") used.add(name);
  }
}

for (const w of WEIGHTS) {
  const css = readFileSync(join(pkg, w.dir, "style.css"), "utf8");
  const head = css
    .slice(0, css.indexOf(`.${w.cls}.ph-`))
    .replace(/src:[^;]+;/, `src: url("./${w.font}.woff2") format("woff2");`)
    .replace("font-display: block;", "font-display: swap;");
  const glyphs = [];
  for (const name of [...used].sort()) {
    const m = css.match(new RegExp(`\\.${w.cls.replace("-", "\\-")}\\.ph-${name}:before \\{\\s*content: "\\\\([0-9a-f]+)";`));
    if (m) glyphs.push({ name, code: m[1] });
  }
  const rules = glyphs.map((g) => `.${w.cls}.ph-${g.name}:before {\n  content: "\\${g.code}";\n}`).join("\n");
  writeFileSync(join(root, "assets/phosphor", w.dir, "style.css"), head.trimEnd() + "\n\n" + rules + "\n");
  execFileSync("pyftsubset", [
    join(pkg, w.dir, `${w.font}.ttf`),
    `--unicodes=${glyphs.map((g) => "U+" + g.code).join(",")}`,
    "--flavor=woff2",
    "--layout-features=*",
    `--output-file=${join(root, "assets/phosphor", w.dir, `${w.font}.woff2`)}`,
  ]);
  console.log(`${w.dir}: ${glyphs.length} glyphs`);
}
