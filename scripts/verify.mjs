import { readFile, readdir, access } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
const root = path.resolve("dist");
async function walk(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const files = (await walk(root)).filter((f) => f.endsWith(".html"));
for (const file of files) {
  const html = await readFile(file, "utf8");
  assert.match(html, /<h1[ >]/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /hreflang="zh-Hans"/);
  assert.match(html, /hreflang="en"/);
  assert.match(html, /property="og:description"/);
  for (const match of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
    const url = match[1];
    if (!url.startsWith("/") && !url.startsWith("#")) continue;
    const [pathname, hash] = url.split("#");
    const target = pathname
      ? path.join(root, pathname, pathname.endsWith("/") ? "index.html" : "")
      : file;
    await access(target);
    if (hash) {
      const targetHTML = await readFile(target, "utf8");
      assert(targetHTML.includes(`id="${hash}"`), `${file}: missing ${url}`);
    }
  }
  if (file.includes("/zh/")) await access(file.replace("/zh/", "/en/"));
}
assert.equal(files.length, 11);
console.log(
  `Verified ${files.length} generated HTML pages: local assets, anchors, language pairs and metadata.`,
);
