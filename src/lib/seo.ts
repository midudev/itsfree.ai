export const SITE = 'https://itsfree.ai'
export const SITE_NAME = "it's free*"
export const AUTHOR = '@midudev'

/** OpenGraph.to: 1200×630 (1.91:1) is the size every platform renders well. */
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_TYPE = 'image/png'
export const OG_IMAGE_ALT = "it's free* — every free way to run an AI model"

const TITLE_MAX = 60
const DESCRIPTION_MIN = 110
const DESCRIPTION_MAX = 160

/**
 * Canonical URLs are directory-style with a trailing slash, so `/models` and
 * `/models/` never both get indexed.
 */
export function canonicalUrl(pathname: string): string {
	const path = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`
	return new URL(path, SITE).href
}

export function ogImageUrl(path = '/og.png'): string {
	return new URL(path, SITE).href
}

/**
 * Home stays at `/og.png`. Everything else lives under `/og/…`, matching the
 * page path so a missing card is obvious in the built output.
 */
export function shareImage(pathname: string): string {
	const path = pathname.replace(/\/+$/, '') || '/'
	if (path === '/' || path === '/404') return '/og.png'
	if (path === '/models') return '/og/models.png'
	if (path.startsWith('/provider/')) return `/og/provider/${path.slice('/provider/'.length)}.png`
	if (path.startsWith('/model/')) return `/og/model/${path.slice('/model/'.length)}.png`
	return `/og${path}.png`
}

export function shareImageAlt(title: string, pathname: string): string {
	const path = pathname.replace(/\/+$/, '') || '/'
	if (path === '/' || path === '/404') return OG_IMAGE_ALT
	return `${title} — ${SITE_NAME}`
}

/** OpenGraph.to: HTML and og:title truncate around 60 characters. */
export function fitTitle(text: string, max = TITLE_MAX): string {
	const value = text.replace(/\s+/g, ' ').trim()
	if (value.length <= max) return value
	const cut = value.slice(0, max - 1)
	const space = cut.lastIndexOf(' ')
	return `${(space > 24 ? cut.slice(0, space) : cut).trimEnd()}…`
}

/**
 * OpenGraph.to: 110–160 characters, no raw URLs, and not a repeat of the title.
 * Google's snippet is ~150–160; social cards warn past 160.
 */
export function fitDescription(
	text: string,
	options: { title?: string; extra?: string; min?: number; max?: number } = {}
): string {
	const min = options.min ?? DESCRIPTION_MIN
	const max = options.max ?? DESCRIPTION_MAX
	let value = stripUrls(text)

	if (options.title && value === options.title && options.extra) {
		value = `${value} ${options.extra}`.trim()
	}
	if (value.length < min && options.extra) {
		value = `${value} ${options.extra}`.trim()
	}

	if (value.length <= max) return value
	const cut = value.slice(0, max - 1)
	const space = cut.lastIndexOf(' ')
	return `${(space >= min - 1 ? cut.slice(0, space) : cut).trimEnd()}…`
}

function stripUrls(text: string): string {
	return text
		.replace(/https?:\/\/\S+/gi, '')
		.replace(/\s+/g, ' ')
		.trim()
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
