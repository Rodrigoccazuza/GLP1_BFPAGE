import { defineConfig } from 'astro/config';
export default defineConfig({ site: process.env.PUBLIC_SITE_URL || undefined, base: process.env.GITHUB_PAGES === 'true' ? '/GLP1_BFPAGE/' : '/', output: 'static', devToolbar: { enabled: false } });
