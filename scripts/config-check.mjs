import assert from "node:assert/strict";
import {
  cp,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const temporary = await mkdtemp(path.join(tmpdir(), "cardpress-config-"));
const environment = { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" };
for (const key of Object.keys(environment)) {
  if (key.startsWith("PUBLIC_") || key === "NODE_ENV") delete environment[key];
}
const cases = [
  {
    name: "default",
    files: {},
    origin: "https://cardpress.invalid",
    indexable: false,
  },
  {
    name: "dotenv-only",
    files: {
      ".env":
        'PUBLIC_SITE_URL="https://dotenv.example"\nPUBLIC_INDEXABLE=true\n',
    },
    origin: "https://dotenv.example",
    indexable: true,
  },
  {
    name: "shell-override",
    files: {
      ".env":
        "PUBLIC_SITE_URL=https://dotenv.example\nPUBLIC_INDEXABLE=false\n",
    },
    env: { PUBLIC_SITE_URL: "https://shell.example", PUBLIC_INDEXABLE: "true" },
    origin: "https://shell.example",
    indexable: true,
  },
  {
    name: "indexing-off",
    files: {
      ".env": "PUBLIC_SITE_URL=https://dotenv.example\nPUBLIC_INDEXABLE=true\n",
    },
    env: { PUBLIC_INDEXABLE: "false" },
    origin: "https://dotenv.example",
    indexable: false,
  },
  {
    name: "production-mode",
    files: {
      ".env": "PUBLIC_SITE_URL=https://base.example\nPUBLIC_INDEXABLE=false\n",
      ".env.production":
        "PUBLIC_SITE_URL=https://production.example\nPUBLIC_INDEXABLE=true\n",
    },
    origin: "https://production.example",
    indexable: true,
  },
  {
    name: "custom-mode",
    mode: "staging",
    files: {
      ".env": "PUBLIC_SITE_URL=https://base.example\nPUBLIC_INDEXABLE=true\n",
      ".env.production": "PUBLIC_SITE_URL=https://wrong.example\n",
      ".env.staging":
        "PUBLIC_SITE_URL=https://staging.example\nPUBLIC_INDEXABLE=false\n",
      ".env.staging.local": "PUBLIC_SITE_URL=https://staging-local.example\n",
    },
    origin: "https://staging-local.example",
    indexable: false,
  },
];
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? htmlFiles(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  )
    .flat()
    .filter((file) => file.endsWith(".html"));
}
try {
  for (const test of cases) {
    const directory = path.join(temporary, test.name);
    for (const entry of [
      "src",
      "public",
      "astro.config.mjs",
      "package.json",
      "tsconfig.json",
    ]) {
      await cp(path.join(root, entry), path.join(directory, entry), {
        recursive: true,
      });
    }
    await symlink(
      path.join(root, "node_modules"),
      path.join(directory, "node_modules"),
      "dir",
    );
    for (const [name, content] of Object.entries(test.files))
      await writeFile(path.join(directory, name), content);
    const result = spawnSync(
      process.execPath,
      [
        path.join(root, "node_modules/astro/bin/astro.mjs"),
        "build",
        ...(test.mode ? ["--mode", test.mode] : []),
      ],
      {
        cwd: directory,
        env: { ...environment, ...test.env },
        encoding: "utf8",
      },
    );
    assert.equal(
      result.status,
      0,
      `${test.name}: isolated build failed\n${result.stderr}\n${result.stdout}`,
    );
    const publicDirectory = path.join(directory, "public");
    const distDirectory = path.join(directory, "dist");
    const staticHTML = new Set(
      (await htmlFiles(publicDirectory)).map((file) =>
        path.relative(publicDirectory, file),
      ),
    );
    const files = (await htmlFiles(distDirectory)).filter(
      (file) => !staticHTML.has(path.relative(distDirectory, file)),
    );
    assert.equal(files.length, 11);
    for (const file of files) {
      const html = await readFile(file, "utf8");
      const tags = [...html.matchAll(/<(?:link|meta)\b[^>]*>/g)].map(
        (match) => match[0],
      );
      const urls = tags.filter((tag) =>
        /rel="canonical"|hreflang=|property="og:(?:url|image)"/.test(tag),
      );
      assert.equal(urls.length, 6);
      for (const tag of urls) {
        const url = tag.match(/(?:href|content)="([^"]+)"/)[1];
        assert.equal(
          new URL(url).origin,
          test.origin,
          `${test.name}: wrong origin in ${path.relative(directory, file)}: ${tag}`,
        );
      }
      assert(
        tags.includes(
          `<meta name="robots" content="${test.indexable ? "index,follow" : "noindex,nofollow"}">`,
        ),
        `${test.name}: wrong robots meta`,
      );
    }
    const sitemap = await readFile(
      path.join(directory, "dist/sitemap.xml"),
      "utf8",
    );
    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
      (match) => match[1],
    );
    assert.equal(locations.length, 10);
    for (const location of locations)
      assert.equal(new URL(location).origin, test.origin);
    const robots = await readFile(
      path.join(directory, "dist/robots.txt"),
      "utf8",
    );
    assert.equal(
      robots,
      test.indexable
        ? `User-agent: *\nAllow: /\nSitemap: ${test.origin}/sitemap.xml\n`
        : "User-agent: *\nDisallow: /\n",
    );
    console.log(
      `PASS ${test.name}: 11 pages, all SEO origins, 10 sitemap URLs and indexing policy`,
    );
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
