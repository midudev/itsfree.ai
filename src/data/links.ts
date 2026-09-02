import { MODELS } from './models'
import { RESOURCES, resourcesForModel } from './resources'
import { PROVIDERS } from './providers'

export interface LinkGroup {
	title: string
	links: { href: string; label: string }[]
}

/** Most-served models first — the ones worth an internal link from every page */
function topModels(limit: number) {
	return [...MODELS]
		.map((model) => ({
			model,
			routes: resourcesForModel(model.slug).length
		}))
		.sort((a, b) => b.routes - a.routes)
		.slice(0, limit)
		.map(({ model }) => ({ href: `/model/${model.slug}/`, label: `${model.name} for free` }))
}

/** Providers with the most free models behind them */
function topProviders(limit: number) {
	return RESOURCES.filter((resource) => PROVIDERS[resource.id] && resource.category === 'api')
		.sort((a, b) => (PROVIDERS[b.id].freeModels ?? 0) - (PROVIDERS[a.id].freeModels ?? 0))
		.slice(0, limit)
		.map((resource) => ({ href: `/provider/${resource.id}/`, label: `${resource.name} free tier` }))
}

/**
 * The internal link mesh under the footer. Every destination is a route that
 * exists — the homepage reads `cat` and `f` back out of the query string.
 */
export const LINK_GROUPS: LinkGroup[] = [
	{ title: 'By model', links: topModels(7) },
	{ title: 'By provider', links: topProviders(7) },
	{
		title: 'By need',
		links: [
			{ href: '/free-ai-apis-without-credit-card/', label: 'Free APIs with no credit card' },
			{ href: '/free-ai-apis-without-signup/', label: 'Free APIs with no sign-up' },
			{ href: '/openai-compatible-free-apis/', label: 'OpenAI-compatible endpoints' },
			{ href: '/run-ai-models-locally/', label: 'Run a model on your own machine' },
			{ href: '/free-ai-coding-agents/', label: 'Free AI coding agents' }
		]
	},
	{
		title: 'Browse',
		links: [
			{ href: '/models/', label: 'Every free model' },
			{ href: '/?cat=api', label: 'Every free API' },
			{ href: '/?cat=tool', label: 'Tools and benchmarks' },
			{ href: '/?cat=chat', label: 'Chat and playgrounds' }
		]
	}
]
