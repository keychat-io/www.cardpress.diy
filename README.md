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
areas intentionally show status rather than unverified store links. Verify official
channels before replacing those statuses. Android remains a development preview;
software implementation is distinct from physical-card qualification.

The `17e` video and three approved, localized app screenshots have not been supplied.
The site labels placeholders explicitly; they are not fabricated app UI or working
playback. `Media.astro` accepts a local MP4 `src` plus a localized WebVTT `captions`
file before it enables native playback. `Gallery.astro` accepts localized
`screenshots` entries (`src`, `alt`) for actual captures, including modal enlargement.
Verify capture build, language, consent and absence of keys, PINs, recovery material
and private data before adding any screenshots. Keep the placeholder disclosure in
sync when replacing media. No test recordings were copied or published.

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
Explorer pages and JCAlgTest could not be fetched through the research browser at
implementation time, so they are offered as further-reading destinations rather
than evidence for detailed model or algorithm claims.
