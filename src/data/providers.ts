/**
 * Technical details for every provider that exposes an API, keyed by the
 * resource id in src/data/resources.ts. This is what powers /provider/<id>.
 *
 * Figures follow the awesome-free-llm-apis directory (freellm.net), which is
 * refreshed daily — see LAST_VERIFIED below.
 */

export const LAST_VERIFIED = '27 Aug 2026'

export type Requirement = 'none' | 'registration' | 'phone' | 'card'

/** Native client library, when the provider ships one worth using */
export interface Sdk {
	/** Template id in src/data/snippets.ts */
	id: string
	name: string
	npm?: string
	pip?: string
}

export interface Provider {
	/** Base URL for the OpenAI-compatible endpoint */
	baseUrl: string
	apiKeyUrl: string
	/** Environment variable the examples read the key from */
	envVar: string
	/** Model id used in the code examples */
	exampleModel: string
	requirement: Requirement
	freeModels?: number
	maxContext?: string
	rateLimit?: string
	modalities?: string[]
	openaiCompatible: boolean
	docsUrl?: string
	sdk?: Sdk
	/** Anything a newcomer would trip over */
	gotchas?: string[]
}

export const PROVIDERS: Record<string, Provider> = {
	'google-ai-studio': {
		baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
		apiKeyUrl: 'https://aistudio.google.com/app/apikey',
		envVar: 'GEMINI_API_KEY',
		exampleModel: 'gemini-3.6-flash',
		requirement: 'registration',
		freeModels: 17,
		maxContext: '1M',
		rateLimit: '15 requests/minute, 1,500 requests/day',
		modalities: ['text', 'image', 'audio', 'video', 'pdf', 'vision', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://ai.google.dev/gemini-api/docs',
		sdk: { id: 'google-genai', name: 'Google GenAI SDK', npm: '@google/genai', pip: 'google-genai' },
		gotchas: [
			'Free-tier prompts and responses may be used to improve Google’s models. Do not send anything confidential.',
			'The OpenAI-compatible path ends in /openai — the native SDK uses a different base URL entirely.'
		]
	},
	groq: {
		baseUrl: 'https://api.groq.com/openai/v1',
		apiKeyUrl: 'https://console.groq.com/keys',
		envVar: 'GROQ_API_KEY',
		exampleModel: 'moonshotai/kimi-k2-instruct',
		requirement: 'registration',
		freeModels: 12,
		maxContext: '262K',
		rateLimit: '30 requests/minute, 14,400 requests/day',
		modalities: ['text', 'image', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://console.groq.com/docs',
		sdk: { id: 'groq', name: 'Groq SDK', npm: 'groq-sdk', pip: 'groq' },
		gotchas: ['Rate limits are per model, not per account — check the dashboard for each one.']
	},
	'nvidia-nim': {
		baseUrl: 'https://integrate.api.nvidia.com/v1',
		apiKeyUrl: 'https://build.nvidia.com/settings/api-keys',
		envVar: 'NVIDIA_API_KEY',
		exampleModel: 'z-ai/glm-5.2',
		requirement: 'phone',
		freeModels: 126,
		maxContext: '1M',
		rateLimit: 'Up to 40 requests/minute',
		modalities: ['text', 'image', 'audio', 'video', 'vision', 'embedding', 'rerank', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://docs.nvidia.com/nim/',
		gotchas: [
			'Phone verification is required, but no credit card.',
			'Meant for evaluation, not production traffic.'
		]
	},
	openrouter: {
		baseUrl: 'https://openrouter.ai/api/v1',
		apiKeyUrl: 'https://openrouter.ai/workspaces/default/keys',
		envVar: 'OPENROUTER_API_KEY',
		exampleModel: 'openrouter/free',
		requirement: 'registration',
		freeModels: 28,
		maxContext: '1M',
		rateLimit: 'Free tier; a $10 top-up raises it to 1,000 requests/day',
		modalities: ['text', 'image', 'audio', 'video', 'speech', 'embeddings', 'rerank', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://openrouter.ai/docs',
		gotchas: [
			'Model ids ending in :free are the zero-cost ones; the same model without the suffix bills you.',
			'Set the HTTP-Referer and X-Title headers to appear on the public leaderboards.'
		]
	},
	cerebras: {
		baseUrl: 'https://api.cerebras.ai/v1',
		apiKeyUrl: 'https://cloud.cerebras.ai/',
		envVar: 'CEREBRAS_API_KEY',
		exampleModel: 'gpt-oss-120b',
		requirement: 'registration',
		freeModels: 8,
		maxContext: '131K',
		rateLimit: '5 requests/minute, 30K tokens/minute, 1M tokens/day',
		modalities: ['text', 'image', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://inference-docs.cerebras.ai/',
		sdk: {
			id: 'cerebras',
			name: 'Cerebras Cloud SDK',
			npm: '@cerebras/cerebras_cloud_sdk',
			pip: 'cerebras_cloud_sdk'
		},
		gotchas: ['5 requests/minute is low — batch your work rather than firing requests in a loop.']
	},
	'cloudflare-workers-ai': {
		baseUrl: 'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1',
		apiKeyUrl: 'https://dash.cloudflare.com/profile/api-tokens',
		envVar: 'CLOUDFLARE_API_TOKEN',
		exampleModel: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
		requirement: 'registration',
		freeModels: 40,
		maxContext: '10M',
		rateLimit: '10K neurons per day (shared across models)',
		modalities: ['text', 'image', 'video', 'code', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://developers.cloudflare.com/workers-ai/',
		gotchas: [
			'Swap {account_id} in the base URL for your own account id.',
			'Inside a Worker, use the AI binding instead — it skips the network hop and the token.'
		]
	},
	mistral: {
		baseUrl: 'https://api.mistral.ai/v1',
		apiKeyUrl: 'https://console.mistral.ai/api-keys',
		envVar: 'MISTRAL_API_KEY',
		exampleModel: 'open-mixtral-8x7b',
		requirement: 'registration',
		freeModels: 12,
		maxContext: '256K',
		rateLimit: '~1 request/second, 500K tokens/minute on the paid models',
		modalities: ['text', 'image', 'code'],
		openaiCompatible: true,
		docsUrl: 'https://docs.mistral.ai/',
		sdk: { id: 'mistral', name: 'Mistral SDK', npm: '@mistralai/mistralai', pip: 'mistralai' }
	},
	cohere: {
		baseUrl: 'https://api.cohere.com/compatibility/v1',
		apiKeyUrl: 'https://dashboard.cohere.com/api-keys',
		envVar: 'COHERE_API_KEY',
		exampleModel: 'command-a-218b',
		requirement: 'registration',
		freeModels: 12,
		maxContext: '436K',
		rateLimit: '20 requests/minute, 1,000 requests/month',
		modalities: ['text', 'image'],
		openaiCompatible: true,
		docsUrl: 'https://docs.cohere.com/',
		sdk: { id: 'cohere', name: 'Cohere SDK', npm: 'cohere-ai', pip: 'cohere' },
		gotchas: [
			'The free key is a trial key: fine for prototypes, not licensed for production.',
			'Cohere’s own v2 endpoint lives at /v2 — /compatibility/v1 is the OpenAI-shaped one.'
		]
	},
	llm7: {
		baseUrl: 'https://api.llm7.io/v1',
		apiKeyUrl: 'https://token.llm7.io',
		envVar: 'LLM7_API_KEY',
		exampleModel: 'deepseek-r1-0528',
		requirement: 'none',
		freeModels: 16,
		maxContext: '1M',
		rateLimit: '30 requests/minute anonymous, 120 requests/minute with a token',
		modalities: ['text', 'image', 'audio', 'video', 'pdf', 'code', 'vision', 'reasoning'],
		openaiCompatible: true,
		gotchas: ['Works with the placeholder key "unused" if you never grab a token.']
	},
	deepseek: {
		baseUrl: 'https://api.deepseek.com/v1',
		apiKeyUrl: 'https://platform.deepseek.com/api_keys',
		envVar: 'DEEPSEEK_API_KEY',
		exampleModel: 'deepseek-chat-v3-2',
		requirement: 'registration',
		freeModels: 2,
		maxContext: '128K',
		rateLimit: 'Dynamic, based on load',
		modalities: ['text'],
		openaiCompatible: true,
		docsUrl: 'https://api-docs.deepseek.com/'
	},
	huggingface: {
		baseUrl: 'https://router.huggingface.co/v1',
		apiKeyUrl: 'https://huggingface.co/settings/tokens',
		envVar: 'HF_TOKEN',
		exampleModel: 'meta-llama/Llama-3.1-8B-Instruct',
		requirement: 'registration',
		freeModels: 7,
		maxContext: '131K',
		rateLimit: 'Credit-metered monthly allowance',
		modalities: ['text', 'code'],
		openaiCompatible: true,
		docsUrl: 'https://huggingface.co/docs/inference-providers',
		sdk: {
			id: 'huggingface',
			name: 'Hugging Face Inference',
			npm: '@huggingface/inference',
			pip: 'huggingface_hub'
		},
		gotchas: ['The router picks a provider for you; append :provider to a model id to pin one.']
	},
	'cloud-modelscope': {
		baseUrl: 'https://api-inference.modelscope.cn/v1',
		apiKeyUrl: 'https://modelscope.cn/my/myaccesstoken',
		envVar: 'MODELSCOPE_API_KEY',
		exampleModel: 'MiniMax/MiniMax-M2.5',
		requirement: 'registration',
		freeModels: 58,
		maxContext: '1M',
		rateLimit: '2,000 requests/day across all models',
		modalities: ['text', 'image', 'audio', 'video', 'vision', 'reasoning'],
		openaiCompatible: true,
		gotchas: ['Registration needs a Chinese phone number for some account types.']
	},
	zai: {
		baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
		apiKeyUrl: 'https://open.bigmodel.cn/usercenter/apikeys',
		envVar: 'ZHIPU_API_KEY',
		exampleModel: 'glm-4.7',
		requirement: 'registration',
		freeModels: 4,
		maxContext: '200K',
		rateLimit: '1 concurrent request on the free models',
		modalities: ['text', 'image', 'video', 'reasoning'],
		openaiCompatible: true,
		gotchas: ['The Flash models are the free ones and stay free; the rest bill per token.']
	},
	sambanova: {
		baseUrl: 'https://api.sambanova.ai/v1',
		apiKeyUrl: 'https://cloud.sambanova.ai/apis',
		envVar: 'SAMBANOVA_API_KEY',
		exampleModel: 'deepseek-v3-1',
		requirement: 'registration',
		freeModels: 4,
		maxContext: '128K',
		rateLimit: '20 requests/minute, 20 requests/day, 200K tokens/day',
		modalities: ['text', 'image', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://docs.sambanova.ai/'
	},
	xai: {
		baseUrl: 'https://api.x.ai/v1',
		apiKeyUrl: 'https://console.x.ai',
		envVar: 'XAI_API_KEY',
		exampleModel: 'grok-4-1-fast',
		requirement: 'registration',
		freeModels: 3,
		maxContext: '2M',
		rateLimit: 'Credit-based',
		modalities: ['text'],
		openaiCompatible: true,
		docsUrl: 'https://docs.x.ai/'
	},
	'ollama-cloud': {
		baseUrl: 'https://api.ollama.com/v1',
		apiKeyUrl: 'https://ollama.com/settings/keys',
		envVar: 'OLLAMA_API_KEY',
		exampleModel: 'gpt-oss:20b',
		requirement: 'registration',
		freeModels: 13,
		maxContext: '1M',
		rateLimit: 'Session and weekly limits',
		modalities: ['text', 'image', 'video', 'code', 'vision', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://docs.ollama.com/cloud',
		sdk: { id: 'ollama', name: 'Ollama SDK', npm: 'ollama', pip: 'ollama' },
		gotchas: ['Same model names as local Ollama, so you can switch by changing the host alone.']
	},
	ovhcloud: {
		baseUrl: 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1',
		apiKeyUrl: 'https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/',
		envVar: 'OVH_AI_ENDPOINTS_ACCESS_TOKEN',
		exampleModel: 'meta-llama-3_3-70b-instruct',
		requirement: 'registration',
		freeModels: 14,
		maxContext: '262K',
		rateLimit: '2 requests/minute anonymous, higher once you register',
		modalities: ['text', 'image', 'audio', 'video', 'code'],
		openaiCompatible: true,
		gotchas: ['Anonymous access works without a key at all, capped at 2 requests/minute.']
	},
	'kilo-code': {
		baseUrl: 'https://api.kilo.ai/api/gateway',
		apiKeyUrl: 'https://kilo.ai',
		envVar: 'KILO_API_KEY',
		exampleModel: 'nvidia/nemotron-3-ultra-550b-a55b:free',
		requirement: 'registration',
		freeModels: 12,
		maxContext: '1M',
		rateLimit: '~200 requests per hour',
		modalities: ['text', 'image', 'audio', 'video', 'code', 'reasoning'],
		openaiCompatible: true
	},
	'opencode-zen': {
		baseUrl: 'https://opencode.ai/zen/v1',
		apiKeyUrl: 'https://opencode.ai/auth',
		envVar: 'OPENCODE_API_KEY',
		exampleModel: 'deepseek-v4-flash-free',
		requirement: 'registration',
		freeModels: 12,
		maxContext: '1M',
		modalities: ['text', 'audio', 'vision', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://opencode.ai/docs/zen/'
	},
	'aion-labs': {
		baseUrl: 'https://api.aionlabs.ai/v1',
		apiKeyUrl: 'https://www.aionlabs.ai',
		envVar: 'AION_API_KEY',
		exampleModel: 'aion-2-5',
		requirement: 'registration',
		freeModels: 7,
		maxContext: '131K',
		rateLimit: '15 requests/minute, 20K tokens/day',
		modalities: ['text'],
		openaiCompatible: true
	},
	'agnes-ai': {
		baseUrl: 'https://apihub.agnes-ai.com/v1',
		apiKeyUrl: 'https://platform.agnes-ai.com/settings/apiKeys',
		envVar: 'AGNES_API_KEY',
		exampleModel: 'agnes-2.0-flash',
		requirement: 'registration',
		freeModels: 5,
		maxContext: '256K',
		rateLimit: '30 requests/minute',
		modalities: ['text', 'image', 'video', 'vision'],
		openaiCompatible: true
	},
	alibaba: {
		baseUrl: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
		apiKeyUrl: 'https://bailian.console.alibabacloud.com/?apiKey=1',
		envVar: 'DASHSCOPE_API_KEY',
		exampleModel: 'qwen3-plus',
		requirement: 'registration',
		freeModels: 5,
		maxContext: '1M',
		rateLimit: 'Tiered by region',
		modalities: ['text', 'image', 'code'],
		openaiCompatible: true,
		docsUrl: 'https://www.alibabacloud.com/help/en/model-studio/',
		sdk: { id: 'dashscope', name: 'DashScope SDK', pip: 'dashscope' },
		gotchas: ['Use the -intl host outside mainland China; the domestic one rejects foreign accounts.']
	},
	siliconflow: {
		baseUrl: 'https://api.siliconflow.cn/v1',
		apiKeyUrl: 'https://cloud.siliconflow.cn/account/ak',
		envVar: 'SILICONFLOW_API_KEY',
		exampleModel: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
		requirement: 'registration',
		freeModels: 3,
		maxContext: '131K',
		rateLimit: '30 requests/minute, 60K tokens/minute',
		modalities: ['text'],
		openaiCompatible: true
	},
	chutes: {
		baseUrl: 'https://llm.chutes.ai/v1',
		apiKeyUrl: 'https://chutes.ai/',
		envVar: 'CHUTES_API_KEY',
		exampleModel: 'deepseek-ai/DeepSeek-R1',
		requirement: 'registration',
		freeModels: 2,
		maxContext: '131K',
		rateLimit: 'Community-powered, no hard cap published',
		modalities: ['text', 'reasoning'],
		openaiCompatible: true
	},
	glhf: {
		baseUrl: 'https://glhf.chat/api/openai/v1',
		apiKeyUrl: 'https://glhf.chat/',
		envVar: 'GLHF_API_KEY',
		exampleModel: 'hf:meta-llama/Meta-Llama-3.1-70B-Instruct',
		requirement: 'registration',
		freeModels: 2,
		maxContext: '131K',
		rateLimit: 'Unlimited on the free models',
		modalities: ['text'],
		openaiCompatible: true,
		gotchas: ['Model ids are prefixed with hf: and point straight at a Hugging Face repo.']
	},
	ai21: {
		baseUrl: 'https://api.ai21.com/studio/v1',
		apiKeyUrl: 'https://studio.ai21.com/account/api-key',
		envVar: 'AI21_API_KEY',
		exampleModel: 'jamba-mini-2',
		requirement: 'registration',
		freeModels: 2,
		maxContext: '256K',
		rateLimit: '200 requests/minute, 10 requests/second',
		modalities: ['text'],
		openaiCompatible: true,
		sdk: { id: 'ai21', name: 'AI21 SDK', pip: 'ai21' }
	},
	nscale: {
		baseUrl: 'https://inference.api.nscale.com/v1',
		apiKeyUrl: 'https://console.nscale.com/',
		envVar: 'NSCALE_API_KEY',
		exampleModel: 'llama-3-3-70b-instruct',
		requirement: 'registration',
		freeModels: 2,
		maxContext: '128K',
		rateLimit: 'Fair use',
		modalities: ['text'],
		openaiCompatible: true
	},
	nebius: {
		baseUrl: 'https://api.studio.nebius.com/v1',
		apiKeyUrl: 'https://studio.nebius.com/settings/api-keys',
		envVar: 'NEBIUS_API_KEY',
		exampleModel: 'Qwen/Qwen3-235B-A22B',
		requirement: 'registration',
		freeModels: 1,
		maxContext: '128K',
		rateLimit: 'Tier-based',
		modalities: ['text'],
		openaiCompatible: true
	},

	vllm: {
		baseUrl: 'http://localhost:8000/v1',
		apiKeyUrl: 'https://docs.vllm.ai/en/latest/getting_started/installation.html',
		envVar: 'VLLM_API_KEY',
		exampleModel: 'Qwen/Qwen3-8B',
		requirement: 'none',
		maxContext: 'Set with --max-model-len',
		rateLimit: 'None — it is your machine',
		modalities: ['text', 'vision'],
		openaiCompatible: true,
		docsUrl: 'https://docs.vllm.ai/',
		gotchas: [
			'Start the server first: `vllm serve Qwen/Qwen3-8B`.',
			'Needs a CUDA or ROCm GPU; on a Mac reach for MLX instead.'
		]
	},
	mlx: {
		baseUrl: 'http://localhost:8080/v1',
		apiKeyUrl: 'https://github.com/ml-explore/mlx-lm',
		envVar: 'MLX_API_KEY',
		exampleModel: 'mlx-community/Qwen3-8B-4bit',
		requirement: 'none',
		maxContext: 'Whatever your unified memory allows',
		rateLimit: 'None — it is your machine',
		modalities: ['text', 'vision'],
		openaiCompatible: true,
		docsUrl: 'https://github.com/ml-explore/mlx-lm',
		sdk: { id: 'mlx', name: 'mlx-lm', pip: 'mlx-lm' },
		gotchas: [
			'Apple Silicon only.',
			'Start the server first: `mlx_lm.server --model mlx-community/Qwen3-8B-4bit`.'
		]
	},
	llamafile: {
		baseUrl: 'http://localhost:8080/v1',
		apiKeyUrl: 'https://github.com/Mozilla-Ocho/llamafile/releases',
		envVar: 'LLAMAFILE_API_KEY',
		exampleModel: 'LLaMA_CPP',
		requirement: 'none',
		maxContext: 'Set with -c at launch',
		rateLimit: 'None — it is your machine',
		modalities: ['text'],
		openaiCompatible: true,
		docsUrl: 'https://github.com/Mozilla-Ocho/llamafile',
		gotchas: ['`chmod +x model.llamafile && ./model.llamafile --server` and you are done.']
	},

	// Local runtimes: same OpenAI shape, but the server is yours
	ollama: {
		baseUrl: 'http://localhost:11434/v1',
		apiKeyUrl: 'https://ollama.com/download',
		envVar: 'OLLAMA_API_KEY',
		exampleModel: 'llama3.3',
		requirement: 'none',
		maxContext: 'Whatever your RAM allows',
		rateLimit: 'None — it is your machine',
		modalities: ['text', 'image', 'code', 'vision', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://docs.ollama.com/',
		sdk: { id: 'ollama', name: 'Ollama SDK', npm: 'ollama', pip: 'ollama' },
		gotchas: ['Run `ollama pull llama3.3` once before the first request.']
	},
	'lm-studio': {
		baseUrl: 'http://localhost:1234/v1',
		apiKeyUrl: 'https://lmstudio.ai',
		envVar: 'LM_STUDIO_API_KEY',
		exampleModel: 'qwen3-8b',
		requirement: 'none',
		maxContext: 'Whatever your RAM allows',
		rateLimit: 'None — it is your machine',
		modalities: ['text', 'vision'],
		openaiCompatible: true,
		docsUrl: 'https://lmstudio.ai/docs',
		gotchas: ['Start the local server from the Developer tab before calling it.']
	},
	'llama-cpp': {
		baseUrl: 'http://localhost:8080/v1',
		apiKeyUrl: 'https://github.com/ggml-org/llama.cpp/releases',
		envVar: 'LLAMA_CPP_API_KEY',
		exampleModel: 'gpt-oss-120b',
		requirement: 'none',
		maxContext: 'Set with -c at launch',
		rateLimit: 'None — it is your machine',
		modalities: ['text'],
		openaiCompatible: true,
		docsUrl: 'https://github.com/ggml-org/llama.cpp/tree/master/tools/server',
		gotchas: ['Launch the server first: `llama-server -hf ggml-org/gpt-oss-120b-GGUF`.']
	},
	jan: {
		baseUrl: 'http://localhost:1337/v1',
		apiKeyUrl: 'https://jan.ai/download',
		envVar: 'JAN_API_KEY',
		exampleModel: 'llama3.3-70b',
		requirement: 'none',
		maxContext: 'Whatever your RAM allows',
		rateLimit: 'None — it is your machine',
		modalities: ['text'],
		openaiCompatible: true,
		docsUrl: 'https://jan.ai/docs'
	}
}

export function providerOf(id: string): Provider | undefined {
	return PROVIDERS[id]
}

export const REQUIREMENT_LABEL: Record<Requirement, string> = {
	none: 'Nothing — no account',
	registration: 'Email account, no card',
	phone: 'Phone verification, no card',
	card: 'Credit card required'
}

/** The one-word version used in the homepage table */
export const REQUIREMENT_SHORT: Record<Requirement, string> = {
	none: 'none',
	registration: 'email',
	phone: 'phone',
	card: 'card'
}
