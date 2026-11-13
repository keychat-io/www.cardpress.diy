import { chromium } from "@playwright/test";
import assert from "node:assert/strict";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4322";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];

async function createPage(options = {}) {
  const { languages, preference, blocked, ...contextOptions } = options;
  const context = await browser.newContext(contextOptions);
  await context.addInitScript(
    ({ languages, preference, blocked }) => {
      if (languages) {
        Object.defineProperty(navigator, "languages", {
          get: () => languages,
        });
      }
      if (blocked) {
        Storage.prototype.getItem = Storage.prototype.setItem = () => {
          throw new DOMException("Storage blocked", "SecurityError");
        };
      } else if (preference !== undefined) {
        try {
          localStorage.setItem("cardpress-language", preference);
        } catch {
          // The initial about:blank document may have an opaque origin.
        }
      }
    },
    { languages, preference, blocked },
  );
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  return { context, page };
}

try {
  const cases = [
    { locale: "zh-CN", expected: "zh" },
    { locale: "zh-TW", expected: "zh" },
    { locale: "en-US", expected: "en" },
    { locale: "ja-JP", languages: ["ja-JP"], expected: "en" },
    { languages: ["fr-FR", "zh-HK", "en-US"], expected: "zh" },
    { languages: ["fr-FR", "en-GB", "zh-CN"], expected: "en" },
    { locale: "zh-CN", preference: "en", expected: "en" },
    { locale: "en-US", preference: "zh", expected: "zh" },
    { locale: "zh-CN", preference: "invalid", expected: "zh" },
    { locale: "zh-CN", languages: [], expected: "zh" },
    { locale: "zh-CN", blocked: true, expected: "zh" },
  ];
  for (const { expected, ...options } of cases) {
    const { context, page } = await createPage(options);
    try {
      await page.goto(`${base}/?campaign=language#app`);
      await page.waitForURL((url) => url.pathname === `/${expected}/`);
      assert.equal(new URL(page.url()).search, "?campaign=language");
      assert.equal(new URL(page.url()).hash, "#app");
      assert.equal(
        await page.locator("html").getAttribute("lang"),
        expected === "zh" ? "zh-Hans" : "en",
      );
      if (options.blocked) {
        await page.locator(".language").click();
        await page.waitForURL(`${base}/en/`);
      }
    } finally {
      await context.close();
    }
  }

  const { context, page } = await createPage({ locale: "zh-CN" });
  try {
    await page.goto(`${base}/zh/learn/explore/`);
    await page.locator(".language").click();
    await page.waitForURL(`${base}/en/learn/explore/`);
    assert.equal(
      await page.evaluate(() => localStorage.getItem("cardpress-language")),
      "en",
    );
    await page.goto(`${base}/`);
    await page.waitForURL(`${base}/en/`);
    await page.goto(`${base}/zh/learn/java-card/`);
    assert.equal(new URL(page.url()).pathname, "/zh/learn/java-card/");
    assert.equal(await page.locator("html").getAttribute("lang"), "zh-Hans");
  } finally {
    await context.close();
  }

  const fallback = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await fallback.newPage();
    await page.goto(`${base}/`);
    assert.equal(new URL(page.url()).pathname, "/");
    await page.getByRole("link", { name: "简体中文", exact: true }).click();
    assert.equal(new URL(page.url()).pathname, "/zh/");
  } finally {
    await fallback.close();
  }
  assert.deepEqual(errors, []);
  console.log(
    "Language checks passed: browser preference order, Chinese variants, English fallback, saved choices, explicit URLs, query/hash preservation, blocked storage, manual switching and no-JavaScript fallback.",
  );
} finally {
  await browser.close();
}
