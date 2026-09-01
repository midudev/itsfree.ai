import { modelsOf } from './models'

export type Category = 'api' | 'local' | 'coding' | 'chat' | 'tool'

/**
 * `access`: someone else's hardware serves you a model.
 * `local`: the model runs on your own machine.
 * `toolbox`: everything around the model (clients, benchmarks, utilities).
 */
export type Group = 'access' | 'local' | 'toolbox'

export interface Resource {
	/** Stable slug, used for deep links and sharing */
	id: string
	name: string
	url: string
	description: string
	category: Category
	/** Headline quota of the free plan */
	quota: string
	/** Secondary limits: rate, context window, catalogue size... */
	limits?: string[]
	/** Slugs from src/data/models.ts */
	models?: string[]
	noCard: boolean
	noSignup?: boolean
	openaiCompatible?: boolean
	/** For local runtimes: CLI, Desktop app, Engine, Python library */
	kind?: string
	/** Shared by midudev on X */
	pick?: boolean
}

export const CATEGORIES: { id: Category; label: string; hint: string; group: Group }[] = [
	{ id: 'api', label: 'APIs', hint: 'Call the model straight from your code', group: 'access' },
	{ id: 'local', label: 'Runtimes', hint: 'Serve a model from your own machine', group: 'local' },
	{
		id: 'chat',
		label: 'Chat & playground',
		hint: 'Try models without writing code',
		group: 'toolbox'
	},
	{
		id: 'coding',
		label: 'Coding agents',
		hint: 'AI inside your editor or terminal',
		group: 'toolbox'
	},
	{ id: 'tool', label: 'Tools', hint: 'Utilities around the models', group: 'toolbox' }
]

export const GROUPS: { id: Group; label: string; hint: string }[] = [
	{
		id: 'access',
		label: 'Model access',
		hint: 'Providers that hand you a model to run inference on'
	},
	{
		id: 'local',
		label: 'Run models locally',
		hint: 'No quotas, no network, nothing leaves your machine'
	},
	{
		id: 'toolbox',
		label: 'Around the models',
		hint: 'Clients, benchmarks and utilities that make those models usable'
	}
]

const GROUP_BY_CATEGORY = Object.fromEntries(
	CATEGORIES.map((category) => [category.id, category.group])
) as Record<Category, Group>

export function groupOf(resource: Resource): Group {
	return GROUP_BY_CATEGORY[resource.category]
}

export function resourcesOf(group: Group): Resource[] {
	return RESOURCES.filter((resource) => groupOf(resource) === group)
}

export const RESOURCES: Resource[] = [
	{
		id: 'google-ai-studio',
		name: 'Google AI Studio',
		url: 'https://aistudio.google.com/app/apikey',
		description: 'Gemini API with a generous free quota and 1M of context.',
		category: 'api',
		quota: '1,500 requests per day',
		limits: ['15 requests/minute', '1M context', '17 models'],
		models: ['gemini-3-flash', 'gemini-3-flash-lite'],
		noCard: true,
		openaiCompatible: true,
		pick: true
	},
	{
		id: 'groq',
		name: 'Groq',
		url: 'https://console.groq.com/keys',
		description: 'The fastest inference on the market. No credit card.',
		category: 'api',
		quota: '14,400 requests per day',
		limits: ['30 requests/minute', '262K context', '12 models'],
		models: ['kimi-k2', 'groq-compound', 'llama-3-3-70b', 'gpt-oss-120b'],
		noCard: true,
		openaiCompatible: true,
		pick: true
	},
	{
		id: 'nvidia-nim',
		name: 'NVIDIA NIM',
		url: 'https://build.nvidia.com/settings/api-keys',
		description: 'The biggest free catalog: 126 open models over API.',
		category: 'api',
		quota: '40 requests per minute',
		limits: ['1M context', '126 models', 'Phone verification'],
		models: ['glm-5', 'deepseek-v3', 'laguna', 'nemotron'],
		noCard: true,
		openaiCompatible: true,
		pick: true
	},
	{
		id: 'openrouter',
		name: 'OpenRouter',
		url: 'https://openrouter.ai/workspaces/default/keys',
		description: 'One endpoint for hundreds of models. The openrouter/free alias costs $0 in and $0 out.',
		category: 'api',
		quota: '28 models at zero cost',
		limits: ['1M context', 'Renewable credits', 'Automatic routing'],
		models: ['nemotron', 'laguna', 'deepseek-r1', 'qwen3'],
		noCard: true,
		openaiCompatible: true,
		pick: true
	},
	{
		id: 'cerebras',
		name: 'Cerebras',
		url: 'https://cloud.cerebras.ai/',
		description: 'Wafer-scale inference. Thousands of tokens per second.',
		category: 'api',
		quota: '1M tokens per day',
		limits: ['5 requests/minute', '30K tokens/minute', '131K context'],
		models: ['gpt-oss-120b', 'llama-3-3-70b'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'cloudflare-workers-ai',
		name: 'Cloudflare Workers AI',
		url: 'https://dash.cloudflare.com/profile/api-tokens',
		description: 'Models at the edge, one fetch away from your Worker.',
		category: 'api',
		quota: '10,000 neurons per day',
		limits: ['10M context', '40 models'],
		models: ['llama-3-3-70b', 'mixtral-8x7b', 'qwen3'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'mistral',
		name: 'Mistral AI',
		url: 'https://console.mistral.ai/api-keys',
		description: 'The French platform: open models and a free tier to experiment with.',
		category: 'api',
		quota: 'Free experiment tier',
		limits: ['256K context', '12 models'],
		models: ['mixtral-8x7b', 'mistral-medium'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'cohere',
		name: 'Cohere',
		url: 'https://dashboard.cohere.com/api-keys',
		description: 'Trial key with no expiry. Strong at RAG, embeddings and rerank.',
		category: 'api',
		quota: '1,000 requests per month',
		limits: ['20 requests/minute', '436K context', '12 models'],
		models: ['command-a'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'llm7',
		name: 'LLM7.io',
		url: 'https://llm7.io',
		description: 'No sign-up: grab the base URL and start calling the model.',
		category: 'api',
		quota: '30 requests/minute (120 with a token)',
		limits: ['16 models', 'Token opcional'],
		models: ['llama-3-3-70b', 'qwen3'],
		noCard: true,
		noSignup: true,
		openaiCompatible: true
	},
	{
		id: 'deepseek',
		name: 'DeepSeek',
		url: 'https://platform.deepseek.com/api_keys',
		description: 'Serious reasoning at bargain prices, with welcome credits.',
		category: 'api',
		quota: 'Credits on sign-up',
		limits: ['128K context', 'Dynamic limits'],
		models: ['deepseek-v3', 'deepseek-r1'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'huggingface',
		name: 'Hugging Face',
		url: 'https://huggingface.co/settings/tokens',
		description: 'Inference Providers: thousands of open models with monthly credits.',
		category: 'api',
		quota: 'Free monthly credits',
		limits: ['131K context', 'Multi-provider'],
		models: ['llama-3-3-70b', 'qwen-coder', 'qwen3'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'cloud-modelscope',
		name: 'ModelScope',
		url: 'https://modelscope.cn',
		description: 'Alibaba\u2019s hub: 58 free models over API, many of them frontier Chinese ones.',
		category: 'api',
		quota: '2,000 requests per day',
		limits: ['58 models'],
		models: ['qwen3', 'qwen-coder', 'glm-5'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'zai',
		name: 'Z.ai (Zhipu)',
		url: 'https://bigmodel.cn',
		description: 'The GLM models with a permanent free tier.',
		category: 'api',
		quota: 'GLM Flash models for free',
		limits: ['200K context', '4 models'],
		models: ['glm-5'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'sambanova',
		name: 'SambaNova',
		url: 'https://cloud.sambanova.ai',
		description: 'Llama and DeepSeek at high speed on custom hardware.',
		category: 'api',
		quota: '20 requests per minute',
		limits: ['128K context', '4 models'],
		models: ['llama-3-3-70b', 'deepseek-r1'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'ollama',
		name: 'Ollama',
		url: 'https://ollama.com',
		description: 'One command and the model runs on your machine. No limits, no quotas.',
		category: 'local',
		quota: 'Unlimited and private',
		kind: 'CLI + server',
		limits: ['macOS, Linux, Windows', 'OpenAI-compatible API'],
		models: ['llama-3-3-70b', 'qwen3', 'gpt-oss-120b', 'deepseek-r1'],
		noCard: true,
		noSignup: true,
		openaiCompatible: true,
		pick: true
	},
	{
		id: 'lm-studio',
		name: 'LM Studio',
		url: 'https://lmstudio.ai',
		description: 'Ollama with a GUI: discover, download and chat locally.',
		category: 'local',
		quota: 'Unlimited and private',
		kind: 'Desktop app',
		limits: ['Local OpenAI server', 'GGUF and MLX'],
		models: ['qwen3', 'gpt-oss-120b', 'mixtral-8x7b'],
		noCard: true,
		noSignup: true,
		openaiCompatible: true
	},
	{
		id: 'llama-cpp',
		name: 'llama.cpp',
		url: 'https://github.com/ggml-org/llama.cpp',
		description: 'The engine almost everything else runs on. Plain C++, no dependencies.',
		category: 'local',
		quota: 'Unlimited and private',
		kind: 'Engine',
		limits: ['CPU and GPU', 'GGUF quantization'],
		models: ['llama-3-3-70b', 'qwen3'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'jan',
		name: 'Jan',
		url: 'https://jan.ai',
		description: 'Open source ChatGPT alternative that works 100% offline.',
		category: 'local',
		quota: 'Unlimited and private',
		kind: 'Desktop app',
		limits: ['Open source', 'Cross-platform'],
		models: ['llama-3-3-70b', 'qwen3'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'gpt4all',
		name: 'GPT4All',
		url: 'https://gpt4all.io',
		description: 'Chat with your documents locally, nothing ever leaves the laptop.',
		category: 'local',
		quota: 'Unlimited and private',
		kind: 'Desktop app',
		limits: ['Local RAG', 'No GPU required'],
		models: ['mixtral-8x7b', 'llama-3-3-70b'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'opencode',
		name: 'OpenCode',
		url: 'https://opencode.ai',
		description: 'Coding agent in your terminal. Point it at any free API on this list.',
		category: 'coding',
		quota: 'Free models via OpenCode Zen',
		limits: ['1M context', 'Open source', 'Bring your own key'],
		models: ['glm-5', 'kimi-k2'],
		noCard: true
	},
	{
		id: 'cline',
		name: 'Cline',
		url: 'https://cline.bot',
		description: 'Autonomous agent inside VS Code. Bring your own free API key.',
		category: 'coding',
		quota: 'Free extension',
		limits: ['VS Code', 'Open source', 'Bring your own key'],
		noCard: true
	},
	{
		id: 'kilo-code',
		name: 'Kilo Code',
		url: 'https://kilocode.ai',
		description: 'A Cline fork that ships with free models included.',
		category: 'coding',
		quota: '~200 requests per hour',
		limits: ['12 models', 'VS Code and JetBrains'],
		models: ['glm-5', 'qwen-coder'],
		noCard: true
	},
	{
		id: 'continue',
		name: 'Continue',
		url: 'https://continue.dev',
		description: 'Autocomplete and chat in your editor, pointed at your local or free model.',
		category: 'coding',
		quota: 'Open source, zero cost',
		limits: ['VS Code and JetBrains', 'Works with Ollama'],
		models: ['qwen-coder', 'llama-3-3-70b'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'aider',
		name: 'Aider',
		url: 'https://aider.chat',
		description: 'Pair programming in the terminal, with automatic git commits.',
		category: 'coding',
		quota: 'Open source, zero cost',
		limits: ['CLI', 'Bring your own key'],
		models: ['deepseek-v3', 'qwen-coder'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'google-colab',
		name: 'Google Colab',
		url: 'https://colab.research.google.com',
		description: 'Free GPU in the browser for fine-tuning and experiments.',
		category: 'chat',
		quota: 'Free T4 GPU',
		limits: ['Limited sessions', 'Python notebooks'],
		noCard: true
	},
	{
		id: 'ai-studio-playground',
		name: 'AI Studio Playground',
		url: 'https://aistudio.google.com',
		description: 'Try Gemini with audio, video and images before writing a line of code.',
		category: 'chat',
		quota: 'Free interactive use',
		limits: ['Multimodal', 'Exports to code'],
		models: ['gemini-3-flash'],
		noCard: true
	},
	{
		id: 'lmarena',
		name: 'LMArena',
		url: 'https://lmarena.ai',
		description: 'Compare two models blind and vote. The most honest way to pick one.',
		category: 'tool',
		quota: 'Free access',
		limits: ['Frontier models', 'Elo ranking'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'huggingface-spaces',
		name: 'Hugging Face Spaces',
		url: 'https://huggingface.co/spaces',
		description: 'Thousands of open-model demos ready to try in the browser.',
		category: 'chat',
		quota: 'Free access',
		limits: ['Community demos'],
		models: ['qwen3', 'llama-3-3-70b'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'can-i-run-ai',
		name: 'Can I Run AI',
		url: 'https://canirun.ai',
		description: 'Scans your machine from the web and tells you which models you can run locally.',
		category: 'tool',
		quota: 'Free, nothing to install',
		limits: ['No sign-up', '100% in your browser'],
		noCard: true,
		noSignup: true,
		pick: true
	},
	{
		id: 'openrouter-rankings',
		name: 'OpenRouter Rankings',
		url: 'https://openrouter.ai/rankings',
		description: 'Which models people actually use, by tokens and by use case.',
		category: 'tool',
		quota: 'Public data',
		limits: ['Updated daily'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'artificial-analysis',
		name: 'Artificial Analysis',
		url: 'https://artificialanalysis.ai',
		description: 'Independent benchmarks of quality, speed and price per model.',
		category: 'tool',
		quota: 'Free access',
		limits: ['Provider comparison'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'tokenizer',
		name: 'Tiktokenizer',
		url: 'https://tiktokenizer.vercel.app',
		description: 'Count tokens before you spend them. Handy for staying inside a free quota.',
		category: 'tool',
		quota: 'Free access',
		limits: ['Several tokenizers'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'vllm',
		name: 'vLLM',
		url: 'https://docs.vllm.ai',
		description: 'The serving engine production runs on. PagedAttention and continuous batching, on your own GPU.',
		category: 'local',
		quota: 'Unlimited and private',
		kind: 'Inference server',
		limits: ['OpenAI-compatible server', 'NVIDIA, AMD, TPU', 'Tensor parallelism'],
		models: ['qwen3', 'llama-3-3-70b', 'gpt-oss-120b', 'deepseek-r1'],
		noCard: true,
		noSignup: true,
		openaiCompatible: true
	},
	{
		id: 'mlx',
		name: 'MLX',
		url: 'https://github.com/ml-explore/mlx-lm',
		description: 'Apple’s array framework. On an M-series Mac it is the fastest way to run a model locally.',
		category: 'local',
		quota: 'Unlimited and private',
		kind: 'Apple Silicon',
		limits: ['Unified memory', 'OpenAI-compatible server', 'Quantised weights'],
		models: ['qwen3', 'qwen-coder', 'gpt-oss-120b'],
		noCard: true,
		noSignup: true,
		openaiCompatible: true
	},
	{
		id: 'llamafile',
		name: 'llamafile',
		url: 'https://github.com/Mozilla-Ocho/llamafile',
		description: 'One file that is both the model and the runtime. Download, chmod +x, run. No install at all.',
		category: 'local',
		quota: 'Unlimited and private',
		kind: 'Single binary',
		limits: ['Runs on six OSes', 'No dependencies', 'Mozilla project'],
		models: ['llama-3-3-70b', 'mixtral-8x7b'],
		noCard: true,
		noSignup: true,
		openaiCompatible: true
	},
	{
		id: 'koboldcpp',
		name: 'KoboldCpp',
		url: 'https://github.com/LostRuins/koboldcpp',
		description: 'A single executable around llama.cpp, tuned for long-form and creative writing.',
		category: 'local',
		quota: 'Unlimited and private',
		kind: 'Single binary',
		limits: ['GGUF', 'Image generation too', 'No install'],
		models: ['mixtral-8x7b', 'llama-3-3-70b'],
		noCard: true,
		noSignup: true
	},
	{
		id: 'ollama-cloud',
		name: 'Ollama Cloud',
		url: 'https://ollama.com/settings/keys',
		description: 'The same models and commands as local Ollama, but running on someone else’s GPU.',
		category: 'api',
		quota: 'Session and weekly limits',
		limits: ['1M context', '13 models', 'Same API as local'],
		models: ['gpt-oss-120b', 'qwen3', 'deepseek-r1'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'ovhcloud',
		name: 'OVHcloud AI Endpoints',
		url: 'https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/',
		description: 'European hosting with an anonymous tier: you can call it before you even have an account.',
		category: 'api',
		quota: '2 requests/minute without an account',
		limits: ['262K context', '14 models', 'EU hosted'],
		models: ['llama-3-3-70b', 'qwen3'],
		noCard: true,
		noSignup: true,
		openaiCompatible: true
	},
	{
		id: 'alibaba',
		name: 'Alibaba Model Studio',
		url: 'https://bailian.console.alibabacloud.com/?apiKey=1',
		description: 'Qwen straight from the source, with a 1M-context tier and free quota to start.',
		category: 'api',
		quota: 'Free quota per model',
		limits: ['1M context', '5 models', 'Qwen3 Max and Plus'],
		models: ['qwen3', 'qwen-coder'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'xai',
		name: 'xAI',
		url: 'https://console.x.ai',
		description: 'Grok with the largest context window on this page: 2M tokens.',
		category: 'api',
		quota: 'Monthly free credits',
		limits: ['2M context', '3 models', 'Live data from X'],
		models: ['grok-4'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'opencode-zen',
		name: 'OpenCode Zen',
		url: 'https://opencode.ai/auth',
		description: 'The model gateway behind OpenCode, with free coding models you can call from anywhere.',
		category: 'api',
		quota: '12 free models',
		limits: ['1M context', 'Coding focused'],
		models: ['deepseek-v3', 'glm-5'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'ai21',
		name: 'AI21 Labs',
		url: 'https://studio.ai21.com/account/api-key',
		description: 'Jamba, the hybrid Mamba-Transformer that stays cheap on very long documents.',
		category: 'api',
		quota: '200 requests/minute',
		limits: ['256K context', '2 models'],
		models: ['jamba'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'siliconflow',
		name: 'SiliconFlow',
		url: 'https://cloud.siliconflow.cn/account/ak',
		description: 'Chinese open models with a permanently free tier, distills included.',
		category: 'api',
		quota: '30 requests/minute',
		limits: ['131K context', '3 models'],
		models: ['deepseek-r1', 'qwen3'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'chutes',
		name: 'Chutes.ai',
		url: 'https://chutes.ai/',
		description: 'Community-run decentralised compute. Full DeepSeek R1 with no published hard cap.',
		category: 'api',
		quota: 'No published hard cap',
		limits: ['131K context', '2 models', 'Decentralised'],
		models: ['deepseek-r1', 'llama-3-3-70b'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'nebius',
		name: 'Nebius AI Studio',
		url: 'https://studio.nebius.com/settings/api-keys',
		description: 'European GPU cloud with free credits and the big Qwen MoE models.',
		category: 'api',
		quota: 'Tier-based free credits',
		limits: ['128K context', 'EU hosted'],
		models: ['qwen3'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'nscale',
		name: 'Nscale',
		url: 'https://console.nscale.com/',
		description: 'Fair-use free inference on Llama and the DeepSeek distills.',
		category: 'api',
		quota: 'Fair-use free tier',
		limits: ['128K context', '2 models'],
		models: ['llama-3-3-70b', 'deepseek-r1'],
		noCard: true,
		openaiCompatible: true
	},
	{
		id: 'isbetter-ai',
		name: 'isbetter.ai',
		url: 'https://isbetter.ai',
		description: 'Send one prompt to every model at once and compare answer, code, preview, speed and cost.',
		category: 'tool',
		quota: 'Free, keys stay in your browser',
		limits: ['Side-by-side runs', 'Local models too', 'Cost per answer'],
		noCard: true,
		noSignup: true,
		pick: true
	},
	{
		id: 'awesome-freellm-apis',
		name: 'awesome-freellm-apis',
		url: 'https://github.com/open-free-llm-api/awesome-freellm-apis',
		description: 'The repo keeping a live table of free providers and their limits.',
		category: 'tool',
		quota: 'Open source',
		limits: ['Community maintained'],
		noCard: true,
		noSignup: true,
		pick: true
	}
]

/** Resources that give free access to a given model, most generous first */
export function resourcesForModel(slug: string): Resource[] {
	return RESOURCES.filter((resource) => resource.models?.includes(slug))
}

/** Lowercase haystack the homepage filter searches against */
export function searchIndex(resource: Resource): string {
	return [
		resource.name,
		resource.description,
		resource.quota,
		resource.kind ?? '',
		...modelsOf(resource.models).map((model) => `${model.name} ${model.apiId ?? ''}`),
		...(resource.limits ?? [])
	]
		.join(' ')
		.toLowerCase()
}
