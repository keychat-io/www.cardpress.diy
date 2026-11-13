import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4321';
await mkdir('docs_local/browser',{recursive:true});
for(const lang of ['zh','en'])for(const width of [1440,390,320]){
 await page.setViewportSize({width,height:900});await page.goto(`${base}/${lang}/`);
 await page.locator('.screen-preview').first().waitFor();
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${lang} overflows at ${width}`);
 await page.locator('[data-preview="0"]').click();await page.locator('dialog[open]').waitFor();await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
 await page.locator('[data-preview="0"]').focus();await page.keyboard.press('Enter');await page.locator('dialog[open]').waitFor();await page.locator('.dialog-close').click();
 assert(await page.locator('[data-preview="0"]').evaluate(el=>el===document.activeElement));
 await page.locator('[data-page="2"]').click();if(width<680)await page.waitForFunction(()=>document.querySelector('.screen-track').scrollLeft>100);
 await page.locator('summary').first().click();assert(await page.locator('details').first().evaluate(el=>el.open));
 await page.locator('.nav-download').click();assert(page.url().endsWith('#download'));
 await page.locator('.language').click();assert(page.url().includes(lang==='zh'?'/en/':'/zh/'));
 await page.goto(`${base}/${lang}/`);await page.screenshot({path:`docs_local/browser/${lang}-${width}.png`,fullPage:true,animations:'disabled'});
}
for(const lang of ['zh','en'])for(const slug of ['java-card','getting-started','explore']){
 await page.goto(`${base}/${lang}/learn/${slug}/`);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.locator('.language').click();assert(page.url().endsWith(`/learn/${slug}/`));
}
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(`${base}/zh/`);
assert.equal(await page.locator('.hero-orbit').evaluate(el=>getComputedStyle(el).animationName),'none');
assert.equal(await page.locator('html').evaluate(el=>getComputedStyle(el).scrollBehavior),'auto');
assert.equal(await page.locator('video').count(),0);
assert.equal(await page.locator('a[href*="apps.apple.com"],a[href*="play.google.com"]').count(),0);
assert.deepEqual(errors,[]);await browser.close();console.log('Browser checks passed: zh/en at 1440, 390, 320px; navigation, localized article switching, dialog keyboard/focus, manual paging, FAQ, reduced motion and truthful media/download states.');
