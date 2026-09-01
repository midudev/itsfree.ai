import { RESOURCES, type Resource } from './resources'
import { PROVIDERS } from './providers'
import type { FaqEntry } from './faq'

/** How the entries are rendered; each maps to an existing component */
export type CollectionLayout = 'table' | 'grid' | 'list'

export interface Collection {
	slug: string
	title: string
	description: string
	heading: string
	/** Two short paragraphs of copy specific to this page */
	intro: string[]
	layout: CollectionLayout
	filter: (resource: Resource) => boolean
	faq: FaqEntry[]
}

const isProvider = (resource: Resource) =>
	Boolean(PROVIDERS[resource.id]) && resource.category === 'api'

export const COLLECTIONS: Collection[] = [
	{
		slug: 'free-ai-apis-without-credit-card',
		title: 'Free AI APIs with no credit card required',
		description:
			'Every AI API you can call for free without handing over a card: rate limits, context windows and base URLs, checked against each provider.',
		heading: 'Free AI APIs that never ask for a card',
		intro: [
			'None of the providers below take payment details to get started. Most want an email address; a couple want nothing at all. The one exception worth knowing is NVIDIA NIM, which asks for a phone number instead — still no card.',
			'They are sorted by how much they actually give you. If you only try one, start with Groq: 14,400 requests a day on an email address, and the fastest tokens per second on this page.'
		],
		layout: 'table',
		filter: (resource) => isProvider(resource) && resource.noCard,
		faq: [
			{
				question: 'Why do some free APIs still ask for a card?',
				answer:
					'Usually to stop one person opening a hundred accounts. Providers that skip it lean on other limits instead — a phone number, a low requests-per-minute ceiling, or a shared daily pool.'
			},
			{
				question: 'Will I get charged if I go over the free limit?',
				answer:
					'Not on these. With no card on file the request simply fails with a 429 once you hit the ceiling, which is what makes them safe for experiments you might forget about.'
			}
		]
	},
	{
		slug: 'free-ai-apis-without-signup',
		title: 'Free AI APIs with no sign-up at all',
		description:
			'AI APIs you can call right now without an account: no email, no key, no dashboard. Base URLs and limits for every option.',
		heading: 'Free AI APIs with no account needed',
		intro: [
			'A short list, because almost nobody does this. These endpoints answer without a key, or with a placeholder one — you can paste the base URL into a terminal and get a completion back before you finish reading this sentence.',
			'The trade is a low ceiling and no guarantees. Fine for a first test or a throwaway script; anything you rely on wants an account somewhere else on this site.'
		],
		layout: 'table',
		filter: (resource) => isProvider(resource) && Boolean(resource.noSignup),
		faq: [
			{
				question: 'How can an API be free with no account?',
				answer:
					'The provider rate-limits by IP instead of by key. That is why the ceilings are low — LLM7.io allows 30 requests a minute anonymously, OVHcloud just 2.'
			},
			{
				question: 'Is anonymous access private?',
				answer:
					'No. Your prompts still reach the provider, and without an account you have no terms telling you what happens to them. For anything sensitive, run a model locally instead.'
			}
		]
	},
	{
		slug: 'openai-compatible-free-apis',
		title: 'Free OpenAI-compatible API endpoints',
		description:
			'Free AI providers that speak the OpenAI API, so you swap a base URL and a key and the rest of your code stays exactly as it is.',
		heading: 'Free APIs that speak the OpenAI protocol',
		intro: [
			'Every provider here accepts the same request shape as the OpenAI SDK. Point `baseURL` at their endpoint, swap the key, keep the rest of your code — the same two lines work in the official SDKs for TypeScript and Python, and in Cursor, Claude Code, Aider and Cline.',
			'That makes them interchangeable in practice: when one free tier runs dry, you move to the next row in this table without touching your application.'
		],
		layout: 'table',
		filter: (resource) => isProvider(resource) && Boolean(resource.openaiCompatible),
		faq: [
			{
				question: 'What exactly has to match?',
				answer:
					'The /chat/completions path, the messages array and the response envelope. Extras vary — tool calling, structured output and vision are supported unevenly, so check the provider page before you depend on one.'
			},
			{
				question: 'Can I fall back to another provider automatically?',
				answer:
					'Yes, and it is the main reason to prefer compatible endpoints. Catch the 429, swap the client to the next base URL and retry; nothing else in your code needs to know.'
			}
		]
	},
	{
		slug: 'run-ai-models-locally',
		title: 'Run AI models locally, free and offline',
		description:
			'Nine ways to run a language model on your own machine: no quota, no key, no request leaving the laptop. What each runtime is for and how to start it.',
		heading: 'Run AI models on your own machine',
		intro: [
			'No rate limit to hit, no key to rotate, and nothing leaving the laptop — the only ceiling is your hardware. These are the runtimes worth knowing, from a one-line CLI to the server production actually uses.',
			'Pick by shape rather than by benchmark: Ollama if you want it working in a minute, LM Studio if you would rather not touch a terminal, MLX on an M-series Mac, vLLM when you are serving other people.'
		],
		layout: 'grid',
		filter: (resource) => resource.category === 'local',
		faq: [
			{
				question: 'How much RAM do I need?',
				answer:
					'A 7B model quantised to 4-bit fits in about 5 GB, so 8 GB of RAM runs one comfortably. 70B models want 40 GB or more. Can I Run AI will score your specific machine.'
			},
			{
				question: 'Is a local model as good as a free API?',
				answer:
					'Not usually. The models you can run at home are smaller than the ones NVIDIA or Groq serve for free. Local wins on privacy, offline use and having no limits at all.'
			}
		]
	},
	{
		slug: 'free-ai-coding-agents',
		title: 'Free AI coding agents and editor tools',
		description:
			'Open source coding agents you can point at any free API key: terminal agents, VS Code extensions and editor autocomplete, all at no cost.',
		heading: 'Free AI coding agents',
		intro: [
			'None of these charge for the tool itself. They expect you to bring a key, which is what the rest of this site is for — pair any of them with a free provider and the whole setup costs nothing.',
			'They differ in where they live: in the terminal, inside VS Code, or as autocomplete in whatever editor you already use. Kilo Code is the outlier, shipping free models of its own.'
		],
		layout: 'list',
		filter: (resource) => resource.category === 'coding',
		faq: [
			{
				question: 'Which free model is good enough to code with?',
				answer:
					'GLM 5 and Kimi K2 are the strongest free options for agentic work, and both are free through NVIDIA NIM and Groq. Qwen Coder is the best small model if you are running locally.'
			},
			{
				question: 'Will a free tier survive an agent?',
				answer:
					'Agents are token-hungry — a single task can run dozens of calls. A 14,400 requests-a-day tier holds up; a 5-requests-a-minute one will not. Check the rate limit, not just the daily total.'
			}
		]
	}
]

export function entriesOf(collection: Collection): Resource[] {
	return RESOURCES.filter(collection.filter)
}
