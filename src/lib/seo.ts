export const SITE = 'https://itsfree.ai'
export const SITE_NAME = "it's free*"
export const AUTHOR = '@midudev'

/**
 * Canonical URLs are directory-style with a trailing slash, so `/models` and
 * `/models/` never both get indexed.
 */
export function canonicalUrl(pathname: string): string {
	const path = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`
	return new URL(path, SITE).href
}

export interface Crumb {
	name: string
	path: string
}

export function breadcrumbSchema(crumbs: Crumb[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: canonicalUrl(crumb.path)
		}))
	}
}

export function itemListSchema(name: string, items: { name: string; path: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name,
		numberOfItems: items.length,
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			url: canonicalUrl(item.path)
		}))
	}
}
