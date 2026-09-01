export type VendorId =
	| 'google'
	| 'openai'
	| 'meta'
	| 'deepseek'
	| 'alibaba'
	| 'mistral'
	| 'zai'
	| 'moonshot'
	| 'nvidia'
	| 'microsoft'
	| 'ai21'
	| 'cohere'
	| 'xai'
	| 'poolside'
	| 'groq'

export interface Vendor {
	id: VendorId
	name: string
	/** Site the logo is pulled from by scripts/fetch-favicons.mjs */
	site: string
}

export const VENDORS: Record<VendorId, Vendor> = {
	google: { id: 'google', name: 'Google', site: 'https://gemini.google.com' },
	openai: { id: 'openai', name: 'OpenAI', site: 'https://openai.com' },
	meta: { id: 'meta', name: 'Meta', site: 'https://llama.com' },
	deepseek: { id: 'deepseek', name: 'DeepSeek', site: 'https://deepseek.com' },
	alibaba: { id: 'alibaba', name: 'Alibaba', site: 'https://qwen.ai' },
	mistral: { id: 'mistral', name: 'Mistral AI', site: 'https://mistral.ai' },
	zai: { id: 'zai', name: 'Z.ai', site: 'https://z.ai' },
	moonshot: { id: 'moonshot', name: 'Moonshot AI', site: 'https://moonshot.ai' },
	nvidia: { id: 'nvidia', name: 'NVIDIA', site: 'https://nvidia.com' },
	microsoft: { id: 'microsoft', name: 'Microsoft', site: 'https://microsoft.com' },
	ai21: { id: 'ai21', name: 'AI21 Labs', site: 'https://ai21.com' },
	cohere: { id: 'cohere', name: 'Cohere', site: 'https://cohere.com' },
	xai: { id: 'xai', name: 'xAI', site: 'https://x.ai' },
	poolside: { id: 'poolside', name: 'Poolside', site: 'https://poolside.ai' },
	groq: { id: 'groq', name: 'Groq', site: 'https://groq.com' }
}

export interface Model {
	/** URL slug: /model/<slug> */
	slug: string
	name: string
	vendor: VendorId
	description: string
	/** Identifier exactly as the API expects it */
	apiId?: string
	context?: string
	openWeights: boolean
	tags: string[]
}

export const MODELS: Model[] = [
	{
		slug: 'gemini-3-flash',
		name: 'Gemini 3 Flash',
		vendor: 'google',
		apiId: 'gemini-3.6-flash',
		description:
			'Google’s fast multimodal workhorse. Text, image, audio and video in, 1M of context, and a free tier you can actually build on.',
		context: '1M',
		openWeights: false,
		tags: ['multimodal', 'fast', 'long context']
	},
	{
		slug: 'gemini-3-flash-lite',
		name: 'Gemini 3 Flash Lite',
		vendor: 'google',
		apiId: 'gemini-3.5-flash-lite',
		description:
			'The cheapest Gemini. Built for classification, extraction and anything you run thousands of times a day.',
		context: '1M',
		openWeights: false,
		tags: ['cheap', 'high volume']
	},
	{
		slug: 'kimi-k2',
		name: 'Kimi K2',
		vendor: 'moonshot',
		apiId: 'moonshotai/kimi-k2-instruct',
		description:
			'Moonshot’s open MoE model, strong at agentic tool use and coding. Free on Groq at absurd speed.',
		context: '262K',
		openWeights: true,
		tags: ['open weights', 'agents', 'coding']
	},
	{
		slug: 'gpt-oss-120b',
		name: 'GPT-OSS 120B',
		vendor: 'openai',
		apiId: 'gpt-oss-120b',
		description:
			'OpenAI’s open-weights release. Runs on your own hardware, or free on Cerebras and Groq.',
		context: '131K',
		openWeights: true,
		tags: ['open weights', 'reasoning']
	},
	{
		slug: 'llama-3-3-70b',
		name: 'Llama 3.3 70B',
		vendor: 'meta',
		apiId: 'llama-3.3-70b',
		description:
			'Meta’s classic open model. Nearly every free provider here serves it, which makes it the safest default.',
		context: '128K',
		openWeights: true,
		tags: ['open weights', 'general purpose']
	},
	{
		slug: 'deepseek-r1',
		name: 'DeepSeek R1',
		vendor: 'deepseek',
		apiId: 'deepseek-reasoner-r1',
		description:
			'The reasoning model that made chain-of-thought open. Slow but thorough, and free in several places.',
		context: '128K',
		openWeights: true,
		tags: ['open weights', 'reasoning']
	},
	{
		slug: 'deepseek-v3',
		name: 'DeepSeek V3',
		vendor: 'deepseek',
		apiId: 'deepseek-chat-v3-2',
		description:
			'The conversational half of DeepSeek: fast, cheap and good enough for most day-to-day work.',
		context: '128K',
		openWeights: true,
		tags: ['open weights', 'general purpose']
	},
	{
		slug: 'glm-5',
		name: 'GLM 5',
		vendor: 'zai',
		apiId: 'z-ai/glm-5.2',
		description:
			'Z.ai’s flagship. Excellent at coding and tool calling, and the Flash variants stay free forever.',
		context: '200K',
		openWeights: true,
		tags: ['open weights', 'coding', 'agents']
	},
	{
		slug: 'qwen3',
		name: 'Qwen 3',
		vendor: 'alibaba',
		apiId: 'qwen3',
		description:
			'Alibaba’s family, from 0.6B you can run on a laptop to MoE giants. The best open models size for size.',
		context: '128K',
		openWeights: true,
		tags: ['open weights', 'local', 'multilingual']
	},
	{
		slug: 'qwen-coder',
		name: 'Qwen Coder',
		vendor: 'alibaba',
		apiId: 'Qwen2.5-Coder-7B',
		description:
			'The coding branch of Qwen. Small enough to run locally, good enough to power editor autocomplete.',
		context: '128K',
		openWeights: true,
		tags: ['open weights', 'coding', 'local']
	},
	{
		slug: 'mistral-medium',
		name: 'Mistral Medium',
		vendor: 'mistral',
		apiId: 'mistral-medium-3-5',
		description:
			'Mistral’s balanced model: European hosting, 256K of context and a free experiment tier.',
		context: '256K',
		openWeights: false,
		tags: ['long context', 'eu hosted']
	},
	{
		slug: 'mixtral-8x7b',
		name: 'Mixtral 8x7B',
		vendor: 'mistral',
		apiId: 'open-mixtral-8x7b',
		description:
			'The mixture-of-experts model that proved MoE works in the open. Still a great local pick.',
		context: '32K',
		openWeights: true,
		tags: ['open weights', 'local', 'moe']
	},
	{
		slug: 'command-a',
		name: 'Command A',
		vendor: 'cohere',
		apiId: 'command-a-218b',
		description:
			'Cohere’s enterprise model, built around RAG and citations. The trial key never expires.',
		context: '436K',
		openWeights: false,
		tags: ['rag', 'long context']
	},
	{
		slug: 'phi-4',
		name: 'Phi-4',
		vendor: 'microsoft',
		apiId: 'Phi-4',
		description: 'Microsoft’s small model that punches far above its size on reasoning benchmarks.',
		context: '16K',
		openWeights: true,
		tags: ['open weights', 'small', 'reasoning']
	},
	{
		slug: 'jamba',
		name: 'Jamba 1.5 Large',
		vendor: 'ai21',
		apiId: 'AI21-Jamba-1.5-Large',
		description:
			'A hybrid Mamba-Transformer. Unusually cheap on long documents thanks to its architecture.',
		context: '256K',
		openWeights: true,
		tags: ['open weights', 'long context']
	},
	{
		slug: 'nemotron',
		name: 'Nemotron 3',
		vendor: 'nvidia',
		apiId: 'nvidia-nemotron-3-ultra',
		description:
			'NVIDIA’s own family, tuned for agents and function calling. Free through NIM and OpenRouter.',
		context: '128K',
		openWeights: true,
		tags: ['open weights', 'agents']
	},
	{
		slug: 'grok-4',
		name: 'Grok 4',
		vendor: 'xai',
		apiId: 'grok-4-3',
		description: 'xAI’s frontier model, with up to 2M of context and live access to posts on X.',
		context: '2M',
		openWeights: false,
		tags: ['long context', 'realtime']
	},
	{
		slug: 'laguna',
		name: 'Laguna',
		vendor: 'poolside',
		apiId: 'poolside/laguna-xs-2.1',
		description:
			'Poolside’s coding model, trained on real software engineering work. Free through NVIDIA NIM.',
		context: '256K',
		openWeights: false,
		tags: ['coding']
	},
	{
		slug: 'groq-compound',
		name: 'Groq Compound',
		vendor: 'groq',
		apiId: 'groq/compound',
		description:
			'Not one model but a system: Groq routes your request across models and built-in tools like web search.',
		context: '131K',
		openWeights: false,
		tags: ['agents', 'tools', 'fast']
	}
]

export const MODEL_BY_SLUG = new Map(MODELS.map((model) => [model.slug, model]))

export function modelsOf(slugs: string[] = []): Model[] {
	return slugs
		.map((slug) => MODEL_BY_SLUG.get(slug))
		.filter((model): model is Model => Boolean(model))
}
