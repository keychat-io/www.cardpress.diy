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
      await page.waitForFunction(
        () => document.querySelector("#hero-video").currentTime > 0.1,
      );
      assert(
        await hero.evaluate(
          (video) =>
            video instanceof HTMLVideoElement &&
            video.autoplay &&
            video.muted &&
            video.loop &&
            video.playsInline &&
            video.controls &&
            !video.paused &&
            !video.error &&
            video.videoWidth === 720 &&
            video.videoHeight === 1558,
        ),
      );
      assert.equal(await page.locator(".real-media video").count(), 1);
      assert.equal(
        await page
          .locator(".media-actions, .video-dialog, #media-disclosure")
          .count(),
        0,
      );
      assert.equal(
        await hero.locator("track[default]").getAttribute("srclang"),
        lang,
      );
      assert.equal(
        await hero.evaluate(
          (video) =>
            [...video.textTracks].find((track) => track.mode === "showing")
              ?.language,
        ),
        lang,
      );
      await hero.evaluate((video) => {
        for (const track of video.textTracks) track.mode = "hidden";
      });
      await page.waitForFunction(
        () =>
          [...document.querySelector("#hero-video").textTracks].every(
            (track) => track.cues?.length > 0,
          ),
      );
      assert.deepEqual(
        await hero.evaluate((video) =>
          [...video.textTracks].map((track) => track.language).sort(),
        ),
        ["en", "zh"],
      );
      await hero.evaluate((video) => {
        video.currentTime = video.duration - 0.2;
      });
      await page.waitForFunction(() => {
        const video = document.querySelector("#hero-video");
        return !video.paused && video.currentTime < 1;
      });
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
        `PASS ${lang}/${width}: muted autoplay, looping, both caption tracks, screenshot ratios, no overflow, reduced motion and noindex`,
      );
    }
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
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
