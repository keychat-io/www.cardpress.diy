import { defineConfig } from 'astro/config';
const site = process.env.PUBLIC_SITE_URL || 'https://cardpress.invalid';
export default defineConfig({ site, trailingSlash: 'always', output: 'static', devToolbar: { enabled: false } });
