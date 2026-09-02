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
	| 'anthropic'
	| 'minimax'
	| 'liquid'
	| 'inclusionai'
	| 'yi'
	| 'ibm'
	| 'adept'
	| 'dots'

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
	groq: { id: 'groq', name: 'Groq', site: 'https://groq.com' },
	anthropic: { id: 'anthropic', name: 'Anthropic', site: 'https://www.anthropic.com' },
	minimax: { id: 'minimax', name: 'MiniMax', site: 'https://www.minimaxi.com' },
	liquid: { id: 'liquid', name: 'Liquid AI', site: 'https://www.liquid.ai' },
	inclusionai: { id: 'inclusionai', name: 'InclusionAI', site: 'https://www.ant-ling.com' },
	yi: { id: 'yi', name: '01.AI', site: 'https://www.lingyiwanwu.com' },
	ibm: { id: 'ibm', name: 'IBM', site: 'https://www.ibm.com' },
	adept: { id: 'adept', name: 'Adept', site: 'https://www.adept.ai' },
	dots: { id: 'dots', name: 'Dots Studio', site: 'https://studio.dots.ai' }
}

export interface Model {
	/** URL slug: /model/<slug> */
	slug: string
	name: string
	vendor: VendorId
	description: string
	/** Identifier exactly as the API expects it */
	apiId?: string
	/** Parent family slug; hosts of this weight also show on that family page */
	family?: string
	context?: string
	openWeights: boolean
	tags: string[]
}

export const MODELS: Model[] = [
	{
		slug: 'gemini-3-flash',
		name: 'Gemini 3.7 Flash',
		vendor: 'google',
		apiId: 'gemini-3.7-flash',
		description:
			'Google’s current Flash workhorse — coding, agents and multimodal input, 1M of context, free to try in AI Studio.',
		context: '1M',
		openWeights: false,
		tags: ['multimodal', 'fast', 'long context']
	},
	{
		slug: 'gemini-3-flash-lite',
		name: 'Gemini 3.5 Flash Lite',
		vendor: 'google',
		apiId: 'gemini-3.5-flash-lite',
		description:
			'The cheapest current Gemini. Built for classification, extraction and anything you run thousands of times a day.',
		context: '1M',
		openWeights: false,
		tags: ['cheap', 'high volume']
	},
	{
		slug: 'kimi-k2',
		name: 'Kimi K3',
		vendor: 'moonshot',
		apiId: 'moonshotai/kimi-k3',
		description:
			'Moonshot’s current open MoE. Strong at agentic tool use and coding. Free on NVIDIA NIM; Groq retired the old K2 ids.',
		context: '1M',
		openWeights: true,
		tags: ['open weights', 'agents', 'coding']
	},
	{
		slug: 'gpt-oss-120b',
		name: 'GPT-OSS 120B',
		vendor: 'openai',
		apiId: 'gpt-oss-120b',
		description:
			'OpenAI’s open-weights release. Runs on your own hardware, or free on Groq. Cerebras still serves it on a $5 signup credit.',
		context: '131K',
		openWeights: true,
		tags: ['open weights', 'reasoning']
	},
	{
		slug: 'gpt-oss-20b',
		name: 'GPT-OSS 20B',
		vendor: 'openai',
		apiId: 'openai/gpt-oss-20b',
		description:
			'The smaller open-weights GPT-OSS. Faster than 120B on Groq, same 131K window and 1,000 requests a day.',
		context: '131K',
		openWeights: true,
		tags: ['open weights', 'fast', 'reasoning']
	},
	{
		slug: 'gpt-oss-safeguard',
		name: 'GPT-OSS Safeguard 20B',
		vendor: 'openai',
		apiId: 'openai/gpt-oss-safeguard-20b',
		description:
			'The safety classifier in the GPT-OSS line. Groq serves it on the same free chat quota as the other 20B.',
		context: '131K',
		openWeights: true,
		tags: ['open weights', 'safety']
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
		slug: 'deepseek-v4',
		name: 'DeepSeek V4',
		vendor: 'deepseek',
		apiId: 'deepseek-v4-flash',
		description:
			'The current DeepSeek family: V4 Flash and V4 Pro, 1M of context, thinking as a switch rather than a second model.',
		context: '1M',
		openWeights: true,
		tags: ['open weights', 'reasoning', 'long context']
	},
	{
		slug: 'deepseek-v4-flash',
		name: 'DeepSeek V4 Flash',
		vendor: 'deepseek',
		apiId: 'deepseek-v4-flash',
		family: 'deepseek-v4',
		description:
			'The current DeepSeek workhorse: 1M of context, thinking as a switch. Official id deepseek-v4-flash; AMD serves DeepSeek-V4-Flash-0731.',
		context: '1M',
		openWeights: true,
		tags: ['open weights', 'reasoning', 'long context']
	},
	{
		slug: 'deepseek-v3',
		name: 'DeepSeek V3.1',
		vendor: 'deepseek',
		apiId: 'DeepSeek-V3.1',
		description:
			'The previous DeepSeek generation. Retired from the official API; SambaNova still hosts V3.1 on the free tier.',
		context: '128K',
		openWeights: true,
		tags: ['open weights', 'general purpose']
	},
	{
		slug: 'deepseek-r1',
		name: 'DeepSeek R1',
		vendor: 'deepseek',
		apiId: 'deepseek-ai/DeepSeek-R1',
		description:
			'The 2025 reasoner that made chain-of-thought open. Gone from DeepSeek’s own API; still free on a few hosts and as local weights.',
		context: '128K',
		openWeights: true,
		tags: ['open weights', 'reasoning']
	},
	{
		slug: 'glm-5',
		name: 'GLM 5.2',
		vendor: 'zai',
		apiId: 'z-ai/glm-5.2',
		description:
			'Z.ai’s current flagship. Excellent at coding and tool calling. Free on OpenRouter (`z-ai/glm-5.2:free`); on Z.ai itself GLM-5 bills per token.',
		context: '200K',
		openWeights: true,
		tags: ['open weights', 'coding', 'agents']
	},
	{
		slug: 'glm-4-7-flash',
		name: 'GLM 4.7 Flash',
		vendor: 'zai',
		apiId: 'glm-4.7-flash',
		description:
			'The permanent free line on Z.ai. 200K of context. glm-4.7, glm-5 and glm-5.2 on that host bill per token.',
		context: '200K',
		openWeights: true,
		tags: ['open weights', 'coding', 'fast']
	},
	{
		slug: 'qwen-3-8-27b',
		name: 'Qwen 3.8 27B',
		vendor: 'alibaba',
		apiId: 'qwen/qwen3.8-27b',
		family: 'qwen3',
		description:
			'Alibaba’s current 27B: thinking or instruct in one id, images in. Groq serves it at 131K; Cloudflare’s free window reaches 262K.',
		context: '262K',
		openWeights: true,
		tags: ['open weights', 'multimodal', 'reasoning']
	},
	{
		slug: 'qwen-3-6-27b',
		name: 'Qwen 3.6 27B',
		vendor: 'alibaba',
		apiId: 'qwen/qwen3.6-27b',
		family: 'qwen3',
		description:
			'The previous 27B Qwen still on Groq’s free list. Same 131K window and 30 requests a minute as 3.8.',
		context: '131K',
		openWeights: true,
		tags: ['open weights', 'multimodal', 'reasoning']
	},
	{
		slug: 'qwen-3-8-flash-next',
		name: 'Qwen3.8-Flash-Next',
		vendor: 'alibaba',
		apiId: 'Qwen3.8-Flash-Next',
		family: 'qwen3',
		description:
			'The Flash-Next 3.8 checkpoint. AMD Radeon Cloud serves this exact id on the $10/day Token Factory quota.',
		context: '262K',
		openWeights: true,
		tags: ['open weights', 'fast', 'multilingual']
	},
	{
		slug: 'qwen-3-7-plus',
		name: 'Qwen 3.7 Plus',
		vendor: 'alibaba',
		apiId: 'qwen3.7-plus',
		family: 'qwen3',
		description:
			'The current plus id on Alibaba Model Studio (Singapore / intl). 1M of context, 1M free tokens for 90 days. qwen3-plus is not a current id.',
		context: '1M',
		openWeights: false,
		tags: ['long context', 'multilingual']
	},
	{
		slug: 'qwen-3-30b-a3b',
		name: 'Qwen 3 30B-A3B',
		vendor: 'alibaba',
		apiId: 'Qwen/Qwen3-30B-A3B',
		family: 'qwen3',
		description:
			'The 30B MoE (3B active). Cloudflare serves @cf/qwen/qwen3-30b-a3b-fp8 on the free Workers AI pool.',
		context: '128K',
		openWeights: true,
		tags: ['open weights', 'moe']
	},
	{
		slug: 'qwen-3-5-397b',
		name: 'Qwen 3.5 397B',
		vendor: 'alibaba',
		apiId: 'qwen3.5:397b',
		family: 'qwen3',
		description:
			'The 397B-A17B Qwen 3.5. Ollama Cloud’s current Qwen id is qwen3.5:397b.',
		context: '256K',
		openWeights: true,
		tags: ['open weights', 'moe', 'long context']
	},
	{
		slug: 'qwen-3-8b',
		name: 'Qwen 3 8B',
		vendor: 'alibaba',
		apiId: 'Qwen/Qwen3-8B',
		family: 'qwen3',
		description:
			'The 8B Qwen 3 instruct. SiliconFlow’s free-tier example id; small enough to run locally too.',
		context: '131K',
		openWeights: true,
		tags: ['open weights', 'local', 'small']
	},
	{
		slug: 'qwen3',
		name: 'Qwen 3',
		vendor: 'alibaba',
		apiId: 'qwen3',
		description:
			'Alibaba’s family, from 0.6B you can run on a laptop to MoE giants. Hosted APIs name the exact weight; this page is the family.',
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
		slug: 'mistral-small',
		name: 'Mistral Small',
		vendor: 'mistral',
		apiId: 'mistral-small-latest',
		description:
			'Mistral’s current small line. Free mode on La Plateforme uses this id; Labs models (labs- prefix) are also free of charge.',
		context: '128K',
		openWeights: false,
		tags: ['fast', 'eu hosted']
	},
	{
		slug: 'mistral-medium',
		name: 'Mistral Medium 3.5',
		vendor: 'mistral',
		apiId: 'mistral-medium-3-5',
		description:
			'Mistral’s balanced model: European hosting and 256K of context. Paid on La Plateforme; not the free-tier chip.',
		context: '256K',
		openWeights: false,
		tags: ['long context', 'eu hosted']
	},
	{
		slug: 'gemma-4-31b',
		name: 'Gemma 4 31B',
		vendor: 'google',
		apiId: 'gemma-4-31b',
		description:
			'Google’s open 31B. Cerebras serves gemma-4-31b on a $5 signup credit; Requesty lists google/gemma-4-31b-it at $0.',
		context: '262K',
		openWeights: true,
		tags: ['open weights', 'multimodal']
	},
	{
		slug: 'mixtral-8x7b',
		name: 'Mixtral 8x7B',
		vendor: 'mistral',
		apiId: 'open-mixtral-8x7b',
		description:
			'The mixture-of-experts model that proved MoE works in the open. Retired from Mistral’s own API; still a great local pick.',
		context: '32K',
		openWeights: true,
		tags: ['open weights', 'local', 'moe']
	},
	{
		slug: 'command-a',
		name: 'Command A',
		vendor: 'cohere',
		apiId: 'command-a-03-2025',
		description:
			'Cohere’s enterprise model, built around RAG and citations. The trial key never expires.',
		context: '256K',
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
		name: 'Nemotron 3 Ultra',
		vendor: 'nvidia',
		apiId: 'nvidia/nemotron-3-ultra-550b-a55b',
		description:
			'NVIDIA’s 550B Ultra, tuned for agents and function calling. Free on NIM, OpenRouter (`:free`) and Requesty.',
		context: '1M',
		openWeights: true,
		tags: ['open weights', 'agents']
	},
	{
		slug: 'nemotron-3-super',
		name: 'Nemotron 3 Super',
		vendor: 'nvidia',
		apiId: 'nvidia/nemotron-3-super-120b-a12b',
		family: 'nemotron',
		description:
			'The 120B Super. Requesty’s docs example and a $0 id on that gateway; also `:free` on OpenRouter.',
		context: '1M',
		openWeights: true,
		tags: ['open weights', 'agents']
	},
	{
		slug: 'laguna',
		name: 'Laguna XS',
		vendor: 'poolside',
		apiId: 'poolside/laguna-xs-2.1',
		description:
			'Poolside’s small coding model. OpenRouter’s free id is poolside/laguna-xs-2.1; Requesty serves poolside/laguna-xs.2 at 33K.',
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
	},
	{
		slug: 'groq-compound-mini',
		name: 'Groq Compound Mini',
		vendor: 'groq',
		apiId: 'groq/compound-mini',
		description:
			'The lighter Compound system on Groq. Same tool-routing idea, smaller default stack.',
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
