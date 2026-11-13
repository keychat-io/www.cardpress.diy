# CardPress website

A bilingual, statically generated product website and three short Learn articles.
Built with Astro and TypeScript. Native HTML handles disclosure and dialog behavior;
no client framework, analytics, forms, remote fonts or third-party media embeds are needed.

## Run locally

Node 22.23.4 or later and npm 9.6.5 or later are required.

```sh
npm ci
npm run dev -- --port 4321
npm run check
npm run build
npm run verify
npm run verify:config
npm run preview -- --port 4322
```

Open `/zh/` or `/en/`. `/` is a language chooser. Browser acceptance can be repeated
with `node scripts/browser-check.mjs` (requires a locally installed Google Chrome).
Set `PREVIEW_URL` to test a different running preview. Evidence images are written
to ignored `docs_local/browser/`. The browser check covers both languages at
1440, 390 and 320 pixels, navigation, article language pairing, manual gallery
paging, dialog keyboard/focus, FAQ disclosure and reduced motion.

## Content and media boundaries

Product copy is centralized in `src/data/content.ts`. The iOS and Android download
buttons are disabled until verified store links are available. Verify official
channels before enabling them. Android remains a development preview;
software implementation is distinct from physical-card qualification. The Android
baseline is Android 8.0 with NFC / IsoDep; a Pixel 8 basic card read reached Save
Card, while authenticated inventory and writes still require designated-card
acceptance. This engineering qualification detail is kept here rather than in the
landing page's download requirements.

Real iPhone 17e screenshots and a user-supplied screen recording were captured on
2026-11-13. The approved `cards-en.png`, `card-detail-en.png` and `applets-en.png`
are genuine English UI captures (1170 × 2532), displayed without cropping on both
locales with localized descriptions and an explicit English-interface label.
No translated or AI-generated app UI is presented. The supplied assets were copied
from the app repository's `.build/website-media-17e/` directory without modifying it.

The locally edited silent H.264 clips are 720 × 1558, 30 fps, yuv420p and faststart:
`cardpress-17e-hero.mp4` (8.5667 seconds) and `cardpress-17e-demo.mp4` (15.2667 seconds).
Both provide English and Chinese WebVTT tracks. The hero clip plays muted in a
loop, with `preload="metadata"`, native pause controls and the page locale's
captions selected by default. Reduced motion disables autoplay and pauses playback.
The separate action buttons, expanded demo dialog and visible editing note have
been removed; the longer edited clip remains available as a bundled asset.
The demo shows browsing, Passkey installation confirmation, NFC installation and
verified Installed status, card capabilities and card styling—not website login.
Waiting time was shortened; the edited durations are not performance claims.

Source ranges in seconds (start inclusive, end exclusive):

- Demo: `[(0,.8),(14,16.5),(19,22),(23,24.5),(35.7,37.2),(50.8,53),(67.5,70),(72.4,73.7)]`.
- Hero: `[(0,.8),(15.2,16.5),(35.7,37.2),(50.8,52.5),(68,70),(72.4,73.7)]`.

The original user recording remains unchanged and uncommitted in ignored
`docs_local/ScreenRecording_11-13-2026 10-00-25_1.MP4`. Only approved cuts, their
poster, subtitle tracks and the three named screenshots are bundled. Candidate
captures, technical reports and full card-ID settings are excluded. The coordinator
reviewed the supplied final captures; website integration performed no phone or NFC
operations. The separate AI card-example permission question below remains open.
Download channels remain placeholders by user instruction.

Run `PREVIEW_URL=http://127.0.0.1:4322 node scripts/media-check.mjs` for focused
Chrome checks of localized media, aspect ratios, autoplay, looping, captions
and reduced motion at desktop and narrow widths. Evidence is written to ignored
`docs_local/media-check/`.

## Sources and asset provenance

Product facts were read from the CardPress app repository at
`6eec2f4f59366a30d8809965543192d953276dbe`: `ARCHITECTURE.md`,
`android/README.md`, `Design/JavaCardLearning.md`, `Design/LearningAssets.md`,
`Design/VisualSystem.md`, `catalog/bundled.json`, and English/Simplified Chinese
localization. System minima were checked against native project configuration.
That repository was read only. App catalog inclusion, installation support and
built-in app operations are described separately. Referenced organizations are not
presented as partners or certification bodies for CardPress.

| Local asset | Source | Status |
| --- | --- | --- |
| `public/media/logo.png` | App repository `ios/CardPress/Assets.xcassets/Logo.imageset/Logo.png` | Existing CardPress brand artwork, copied unchanged |
| `public/media/card-example.png` | App repository `JavaCardJ3R180.imageset/JavaCardJ3R180.png` | AI-processed appearance example; not a verified model photograph |

The card example derives from the [FUTAKO supplier photograph](https://www.javacardsdk.com/wp-content/uploads/2016/08/JAVA-CARD-600x600.jpg),
retrieved by the app project on November 5, 2026 and processed November 6, 2026.
Original derivative SHA-256: `087bea1ba37940b8f45cad0ce2d26aabc2e8b9ce1dfb16563977251a5d3c8260`.
No explicit redistribution license was found in the app's attribution record;
confirm permission before public publication or replace with owned photography.
No ownership or new license is asserted over third-party artwork.

Learn pages provide contextual links to Oracle, GlobalPlatform, FIDO Alliance,
Apple Core NFC, Java Card Explorer, JCAlgTest and the CROCS curated list. Text is
original concise paraphrase, not reproduced documentation. External references
retain their own terms and licenses; no upstream code or course content is bundled.
The homepage card introduction follows the model/standards/OS/chip distinctions
in [Java Card Explorer's cards page](https://java-card-explorer.vercel.app/cards),
read in Chrome on November 13, 2026. Its scope is condensed to two educational
examples, not a complete catalog or a CardPress compatibility allowlist. JCOP
background was checked against the [NXP JCOP 4 overview](https://www.nxp.com/docs/en/brochure/JCOP4SECIDAPPA4.pdf)
and the [JCOP 4.5 P71 security target](https://www.commoncriteriaportal.org/nfs/ccpfiles/files/epfiles/NSCIB-CC-0313985-STlite_v2.1.pdf).
The J3R452 / JCOP 4.5 example was also checked against the
[supplier's product page](https://www.javacardsdk.com/product/j3r452smartcard/).
No memory capacity, algorithm guarantees or certification claims are inferred
from a model name or appearance. Other Explorer pages and JCAlgTest remain
further-reading destinations, not evidence for detailed model or algorithm claims.
