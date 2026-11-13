import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4322";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400)
    errors.push(`${response.status()} ${response.url()}`);
});
await mkdir("docs_local/media-check", { recursive: true });
try {
  for (const lang of ["zh", "en"]) {
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${base}/${lang}/`);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${lang}/${width}: page overflow`,
      );
      const hero = page.locator("#hero-video");
      assert(
        await hero.evaluate(
          (video) =>
            video.paused &&
            !video.autoplay &&
            !video.loop &&
            video.preload === "none",
        ),
      );
      assert.equal(
        await page.locator(".media-toggle").textContent(),
        lang === "zh" ? "播放短片 · 约 9 秒" : "Play clip · ~9s",
      );
      await page.locator(".media-toggle").focus();
      await page.keyboard.press("Enter");
      await page.waitForFunction(
        () => document.querySelector("#hero-video").currentTime > 0.1,
      );
      assert.equal(
        await page.locator(".media-toggle").textContent(),
        lang === "zh" ? "暂停短片" : "Pause short clip",
      );
      assert(
        await hero.evaluate(
          (video) =>
            video instanceof HTMLVideoElement &&
            !video.error &&
            video.videoWidth === 720 &&
            video.videoHeight === 1558,
        ),
      );
      assert.equal(
        await hero.locator("track[default]").getAttribute("srclang"),
        lang,
      );
      await page.locator(".media-toggle").click();
      assert(await hero.evaluate((video) => video.paused));
      await page.locator(".demo-open").click();
      const dialog = page.locator(".video-dialog");
      const demo = dialog.locator("video");
      assert(await hero.evaluate((video) => video.paused));
      assert(
        await demo.evaluate(
          (video) => video.controls && video.paused && !video.autoplay,
        ),
      );
      await demo.evaluate((video) => video.play());
      await page.waitForFunction(
        () => document.querySelector(".video-dialog video").currentTime > 0.1,
      );
      assert(
        await demo.evaluate(
          (video) =>
            video instanceof HTMLVideoElement &&
            !video.error &&
            video.videoWidth === 720 &&
            video.videoHeight === 1558,
        ),
      );
      assert.equal(
        await demo.locator("track[default]").getAttribute("srclang"),
        lang,
      );
      for (const video of [hero, demo]) {
        assert.equal(
          await video.evaluate(
            (element) =>
              [...element.textTracks].find((track) => track.mode === "showing")
                ?.language,
          ),
          lang,
        );
        await video.evaluate((element) => {
          for (const track of element.textTracks) track.mode = "hidden";
        });
        await page.waitForFunction(
          (selector) =>
            [...document.querySelector(selector).textTracks].every(
              (track) => track.cues?.length > 0,
            ),
          video === hero ? "#hero-video" : ".video-dialog video",
        );
        assert.deepEqual(
          await video.evaluate((element) =>
            [...element.textTracks].map((track) => track.language).sort(),
          ),
          ["en", "zh"],
        );
      }
      await page.keyboard.press("Escape");
      assert.equal(await page.locator(".video-dialog[open]").count(), 0);
      await page.waitForFunction(
        () => document.querySelector(".video-dialog video").paused,
      );
      assert(
        await page
          .locator(".demo-open")
          .evaluate((button) => button === document.activeElement),
      );
      await page.locator(".demo-open").click();
      await demo.evaluate((video) => video.play());
      await dialog.locator(".dialog-close").click();
      await page.waitForFunction(
        () => document.querySelector(".video-dialog video").paused,
      );
      for (let index = 0; index < 3; index++) {
        const button = page.locator(`[data-preview="${index}"]`);
        await button.scrollIntoViewIfNeeded();
        const capture = button.locator("img");
        await capture.evaluate((image) => image.decode());
        assert(
          await capture.evaluate((image) => {
            const rect = image.getBoundingClientRect();
            return (
              image.naturalWidth === 1170 &&
              image.naturalHeight === 2532 &&
              Math.abs(rect.width / rect.height - 1170 / 2532) < 0.001 &&
              getComputedStyle(image).objectFit === "contain"
            );
          }),
          `${lang}/${width}: screenshot ${index} aspect ratio`,
        );
        await button.click();
        const enlarged = page.locator(".gallery .dialog-capture");
        await enlarged.evaluate((image) => image.decode());
        assert(
          await enlarged.evaluate((image) => {
            const rect = image.getBoundingClientRect();
            return Math.abs(rect.width / rect.height - 1170 / 2532) < 0.001;
          }),
          "Enlarged screenshot aspect ratio",
        );
        assert.equal(
          await enlarged.getAttribute("alt"),
          await capture.getAttribute("alt"),
        );
        await page.keyboard.press("Escape");
      }
      if (width < 680) await page.locator('[data-page="0"]').click();
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({
        path: `docs_local/media-check/${lang}-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.reload();
      assert(await hero.evaluate((video) => video.paused && !video.autoplay));
      assert.equal(
        await page
          .locator(".hero-orbit")
          .evaluate((el) => getComputedStyle(el).animationName),
        "none",
      );
      assert.equal(
        await page
          .locator('a[href*="apps.apple.com"], a[href*="play.google.com"]')
          .count(),
        0,
      );
      assert.equal(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        "noindex,nofollow",
      );
      console.log(
        `PASS ${lang}/${width}: playback, both caption tracks, modal stop/focus, screenshot ratios, no overflow, reduced motion and noindex`,
      );
    }
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".media-toggle").click();
  await page.waitForFunction(
    () => !document.querySelector("#hero-video").paused,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () => document.querySelector("#hero-video").paused,
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS live reduced-motion change pauses playback; no browser/media HTTP errors.",
  );
} finally {
  await browser.close();
}
