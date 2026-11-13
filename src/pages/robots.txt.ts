import type { APIRoute } from 'astro';
export const GET: APIRoute = ({site}) => new Response(import.meta.env.PUBLIC_INDEXABLE==='true' && site?.hostname!=='cardpress.invalid' ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml',site)}\n` : 'User-agent: *\nDisallow: /\n');
