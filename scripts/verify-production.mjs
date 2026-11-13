import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";

const origin = "https://www.cardpress.diy";
const root = path.resolve("dist");
async function walk(directory) {
  return (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map((entry) =>
        entry.isDirectory()
          ? walk(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}
const pages = (await walk(root)).filter(
  (file) =>
    file.endsWith(".html") && !file.includes(`${path.sep}assets${path.sep}`),
);
assert.equal(pages.length, 11);
for (const file of pages) {
  const html = await readFile(file, "utf8");
  assert.match(html, /<meta name="robots" content="index,follow">/);
  assert(!html.includes("cardpress.invalid"));
  for (const tag of html.matchAll(/<(?:link|meta)\b[^>]+>/g)) {
    if (!/rel="canonical"|hreflang=|property="og:(?:url|image)"/.test(tag[0]))
      continue;
    assert.equal(
      new URL(tag[0].match(/(?:href|content)="([^"]+)"/)[1]).origin,
      origin,
    );
  }
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  assert.equal(schema["@type"], "WebSite");
  assert.equal(schema.url, `${origin}/`);
  assert(html.includes('href="/assets/privacy.html"'));
  assert(html.includes('href="/assets/terms_conditions.html"'));
}
const robots = await readFile(path.join(root, "robots.txt"), "utf8");
assert.equal(
  robots,
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => new URL(match[1]),
);
assert.equal(locations.length, 12);
for (const url of locations) {
  assert.equal(url.origin, origin);
  await access(
    path.join(
      root,
      url.pathname,
      url.pathname.endsWith("/") ? "index.html" : "",
    ),
  );
}
const agentIndex = await readFile(path.join(root, "llms.txt"), "utf8");
assert(!/undefined|cardpress.invalid/.test(agentIndex));
for (const match of agentIndex.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) {
  const url = new URL(match[1]);
  assert.equal(url.origin, origin);
  await access(
    path.join(
      root,
      url.pathname,
      url.pathname.endsWith("/") ? "index.html" : "",
    ),
  );
}
for (const name of ["privacy.html", "terms_conditions.html"]) {
  const html = await readFile(path.join(root, "assets", name), "utf8");
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<h1>/);
  assert(html.includes("KEYME PTE. LTD."));
  assert(html.includes("keychat222@gmail.com"));
  assert(
    !/Keychat app|remote push messaging|no risk of your data|Google Play Services|2025-03-11/.test(
      html,
    ),
  );
}
console.log(
  "Production output verified: indexable pages, canonical origins, structured data, sitemap, agent index and CardPress policies.",
);
