// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * How often each kind of page really changes, and which the crawler should
 * reach first. Checked in order, so the exact matches come before the prefixes.
 */
function rank(pathname) {
	if (pathname === '/') return { priority: 1.0, changefreq: 'daily' };
	if (pathname === '/models/') return { priority: 0.9, changefreq: 'weekly' };
	if (pathname.startsWith('/provider/')) return { priority: 0.9, changefreq: 'daily' };
	if (pathname.startsWith('/model/')) return { priority: 0.8, changefreq: 'weekly' };
	// The collection pages: fewer, but each one targets a real query
	return { priority: 0.8, changefreq: 'weekly' };
}

// https://astro.build/config
export default defineConfig({
	site: 'https://itsfree.ai',
	trailingSlash: 'ignore',
	integrations: [
		sitemap({
			filter: (page) => !page.includes('/404'),
			serialize(item) {
				return { ...item, lastmod: new Date().toISOString(), ...rank(new URL(item.url).pathname) };
			}
		})
	]
});
