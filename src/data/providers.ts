/**
 * Technical details for every provider that exposes an API, keyed by the
 * resource id in src/data/resources.ts. This is what powers /provider/<id>.
 *
 * Figures come from each provider’s own docs and live /models lists.
 * LAST_VERIFIED is the last full pass.
 */

export const LAST_VERIFIED = '2 Sep 2026'

export type Requirement = 'none' | 'email' | 'phone' | 'card'

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
		exampleModel: 'gemini-3.7-flash',
		requirement: 'email',
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
		exampleModel: 'openai/gpt-oss-120b',
		requirement: 'email',
		freeModels: 7,
		maxContext: '131K',
		rateLimit: '30 requests/minute, 1,000 requests/day',
		modalities: ['text', 'image', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://console.groq.com/docs',
		sdk: { id: 'groq', name: 'Groq SDK', npm: 'groq-sdk', pip: 'groq' },
		gotchas: [
			'Rate limits are per model: chat models sit at 1,000 requests/day; Compound is 250. The 14,400 figure is only for the prompt-guard classifiers.',
			'Llama 3.3, Kimi K2 and DeepSeek are gone from the free list — they are Enterprise-only or retired.'
		]
	},
	'nvidia-nim': {
		baseUrl: 'https://integrate.api.nvidia.com/v1',
		apiKeyUrl: 'https://build.nvidia.com/settings/api-keys',
		envVar: 'NVIDIA_API_KEY',
		exampleModel: 'deepseek-ai/deepseek-v4-flash-0731',
		requirement: 'phone',
		freeModels: 82,
		maxContext: '1M',
		rateLimit: 'Up to 40 requests/minute',
		modalities: ['text', 'image', 'audio', 'video', 'vision', 'embedding', 'rerank', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://docs.nvidia.com/nim/',
		gotchas: [
			'Phone verification is required, but no credit card.',
			'Meant for evaluation, not production traffic.',
			'The live /v1/models list is 82 ids; GLM 5.2 is not among them.'
		]
	},
	openrouter: {
		baseUrl: 'https://openrouter.ai/api/v1',
		apiKeyUrl: 'https://openrouter.ai/workspaces/default/keys',
		envVar: 'OPENROUTER_API_KEY',
		exampleModel: 'openrouter/free',
		requirement: 'email',
		freeModels: 18,
		maxContext: '1M',
		rateLimit: '20 requests/minute, 50 requests/day; a $10 top-up raises the day to 1,000',
		modalities: ['text', 'image', 'audio', 'video', 'speech', 'embeddings', 'rerank', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://openrouter.ai/docs',
		gotchas: [
			'Model ids ending in :free are the zero-cost ones; the same model without the suffix bills you.',
			'Set the HTTP-Referer and X-Title headers to appear on the public leaderboards.'
		]
	},
	'amd-radeon': {
		baseUrl: 'https://developer.amd.com.cn/radeon/api/v1',
		apiKeyUrl: 'https://developer.amd.com.cn/radeon/tokenfactory',
		envVar: 'AMD_API_KEY',
		exampleModel: 'DeepSeek-V4-Flash-0731',
		requirement: 'email',
		freeModels: 5,
		maxContext: '1M',
		rateLimit: '$10 of usage per day (~10M–111M tokens, resets daily)',
		modalities: ['text', 'image', 'vision'],
		openaiCompatible: true,
		docsUrl: 'https://developer.amd.com.cn/radeon/tokenfactory',
		gotchas: [
			'The five Public Free Model APIs are the shared endpoints. Dedicated Model APIs spend account compute credits.',
			'DeepSeek-V4-Flash-Vision-Exp is marked Limited Free. The standing free text ids are DeepSeek-V4-Flash-0731 and Qwen3.8-Flash-Next.',
			'The portal lives on developer.amd.com.cn. Click a free card to copy the key and the curl sample.'
		]
	},
	requesty: {
		baseUrl: 'https://router.requesty.ai/v1',
		apiKeyUrl: 'https://app.requesty.ai/api-keys',
		envVar: 'REQUESTY_API_KEY',
		exampleModel: 'nvidia/nemotron-3-super-120b-a12b',
		requirement: 'email',
		freeModels: 12,
		maxContext: '1M',
		rateLimit: '20 requests/minute, 200 requests/day',
		modalities: ['text', 'image', 'vision', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://docs.requesty.ai/features/free-models',
		gotchas: [
			'Only the $0 ids are free. The rest of the 600+ catalogue is pay-as-you-go plus 5%.',
			'The 200 requests/day and 20/minute caps are shared across every free model. Paying orgs get 1,000/day and 60/minute.',
			'The docs table lists 9 free ids; live /v1/models has 12 at $0. Laguna here is 33K, not the 256K NIM window. nemotron-3.5-content-safety is a classifier.'
		]
	},
	'vercel-ai-gateway': {
		baseUrl: 'https://ai-gateway.vercel.sh/v1',
		apiKeyUrl: 'https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai',
		envVar: 'AI_GATEWAY_API_KEY',
		exampleModel: 'openai/gpt-oss-120b',
		requirement: 'email',
		freeModels: 12,
		maxContext: '1M',
		rateLimit: 'Per-model caps on the free tier; 429 if you burst',
		modalities: ['text', 'image', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://vercel.com/docs/ai-gateway',
		gotchas: [
			'The $5 monthly credit only spends on the Free Tier subset. Claude Opus/Sonnet 5, Gemini 3.7 and GPT-5.6 are paid.',
			'Buying AI Gateway Credits moves the team to the paid tier and the monthly $5 stops.',
			'Browse vercel.com/ai-gateway/models?freeTier=true for the full subset — we list the current standouts, not every id.'
		]
	},
	cerebras: {
		baseUrl: 'https://api.cerebras.ai/v1',
		apiKeyUrl: 'https://cloud.cerebras.ai/',
		envVar: 'CEREBRAS_API_KEY',
		exampleModel: 'gpt-oss-120b',
		requirement: 'card',
		freeModels: 2,
		maxContext: '65K',
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
		gotchas: [
			'The public catalogue is two models: gpt-oss-120b and gemma-4-31b. Llama, Qwen and DeepSeek left.',
			'Signup grants $5 once. A payment method unlocks the credit; after the five dollars you buy more.',
			'5 requests/minute is low — batch your work rather than firing requests in a loop.'
		]
	},
	'cloudflare-workers-ai': {
		baseUrl: 'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1',
		apiKeyUrl: 'https://dash.cloudflare.com/profile/api-tokens',
		envVar: 'CLOUDFLARE_API_TOKEN',
		exampleModel: '@cf/openai/gpt-oss-120b',
		requirement: 'email',
		freeModels: 40,
		maxContext: '262K',
		rateLimit: '10K neurons per day (shared across models)',
		modalities: ['text', 'image', 'video', 'code', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://developers.cloudflare.com/workers-ai/',
		gotchas: [
			'Swap {account_id} in the base URL for your own account id.',
			'Inside a Worker, use the AI binding instead — it skips the network hop and the token.',
			'Kimi K2.6, GLM 5.2/5.3 and DeepSeek V4 are Workers Paid only. The longest free window is 262K on Qwen 3.8 27B.'
		]
	},
	mistral: {
		baseUrl: 'https://api.mistral.ai/v1',
		apiKeyUrl: 'https://console.mistral.ai/api-keys',
		envVar: 'MISTRAL_API_KEY',
		exampleModel: 'mistral-small-latest',
		requirement: 'email',
		freeModels: 12,
		maxContext: '256K',
		rateLimit: 'Per-org caps in the console; Labs models are free of charge',
		modalities: ['text', 'image', 'code'],
		openaiCompatible: true,
		docsUrl: 'https://docs.mistral.ai/',
		sdk: { id: 'mistral', name: 'Mistral SDK', npm: '@mistralai/mistralai', pip: 'mistralai' },
		gotchas: [
			'open-mixtral-8x7b retired on 30 Mar 2025. Use mistral-small-latest or a labs- id.',
			'mistral-medium-3-5 is a paid model (256K). Free mode and Labs are the no-card slice.'
		]
	},
	cohere: {
		baseUrl: 'https://api.cohere.com/compatibility/v1',
		apiKeyUrl: 'https://dashboard.cohere.com/api-keys',
		envVar: 'COHERE_API_KEY',
		exampleModel: 'command-a-03-2025',
		requirement: 'email',
		freeModels: 12,
		maxContext: '256K',
		rateLimit: '20 requests/minute, 1,000 requests/month',
		modalities: ['text', 'image'],
		openaiCompatible: true,
		docsUrl: 'https://docs.cohere.com/',
		sdk: { id: 'cohere', name: 'Cohere SDK', npm: 'cohere-ai', pip: 'cohere' },
		gotchas: [
			'The free key is a trial key: fine for prototypes, not licensed for production.',
			'Cohere’s own v2 endpoint lives at /v2 — /compatibility/v1 is the OpenAI-shaped one.',
			'The Command A id is command-a-03-2025 (256K). command-a-218b is not an API id.'
		]
	},
	llm7: {
		baseUrl: 'https://api.llm7.io/v1',
		apiKeyUrl: 'https://token.llm7.io',
		envVar: 'LLM7_API_KEY',
		exampleModel: 'gpt-oss',
		requirement: 'none',
		freeModels: 5,
		maxContext: '1M',
		rateLimit: '10 requests/minute anonymous, 40 requests/minute with a token',
		modalities: ['text', 'image', 'audio', 'video', 'pdf', 'code', 'vision', 'reasoning'],
		openaiCompatible: true,
		gotchas: [
			'Works with the placeholder key "unused" if you never grab a token.',
			'Anonymous traffic is the turbo set only: codestral-latest, gemma4:31b, gpt-oss (GPT-OSS 120B), minimax-m2.7, mistral-Nemo-Instruct-2407.'
		]
	},
	deepseek: {
		baseUrl: 'https://api.deepseek.com/v1',
		apiKeyUrl: 'https://platform.deepseek.com/api_keys',
		envVar: 'DEEPSEEK_API_KEY',
		exampleModel: 'deepseek-v4-flash',
		requirement: 'email',
		freeModels: 3,
		maxContext: '1M',
		rateLimit: 'Dynamic, based on load',
		modalities: ['text', 'image'],
		openaiCompatible: true,
		docsUrl: 'https://api-docs.deepseek.com/'
	},
	huggingface: {
		baseUrl: 'https://router.huggingface.co/v1',
		apiKeyUrl: 'https://huggingface.co/settings/tokens',
		envVar: 'HF_TOKEN',
		exampleModel: 'zai-org/GLM-5.3-Flash',
		requirement: 'email',
		freeModels: 135,
		maxContext: '131K',
		rateLimit: '$0.10 of credits per month',
		modalities: ['text', 'code'],
		openaiCompatible: true,
		docsUrl: 'https://huggingface.co/docs/inference-providers',
		sdk: {
			id: 'huggingface',
			name: 'Hugging Face Inference',
			npm: '@huggingface/inference',
			pip: 'huggingface_hub'
		},
		gotchas: [
			'The router picks a provider for you; append :provider to a model id to pin one.',
			'The free slice is a $0.10 monthly credit over the whole router, not a fixed list of 7 models.'
		]
	},
	'cloud-modelscope': {
		baseUrl: 'https://api-inference.modelscope.cn/v1',
		apiKeyUrl: 'https://modelscope.cn/my/myaccesstoken',
		envVar: 'MODELSCOPE_API_KEY',
		exampleModel: 'MiniMax/MiniMax-M3',
		requirement: 'phone',
		freeModels: 50,
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
		exampleModel: 'glm-4.7-flash',
		requirement: 'phone',
		freeModels: 4,
		maxContext: '200K',
		rateLimit: 'Concurrency set per account in the console',
		modalities: ['text', 'image', 'video', 'reasoning'],
		openaiCompatible: true,
		gotchas: [
			'The Flash models are the free ones (glm-4.7-flash, glm-4.5-flash). glm-4.7, glm-5 and glm-5.2 bill per token.',
			'open.bigmodel.cn wants a Chinese phone number. The international portal at z.ai is email-only.'
		]
	},
	sambanova: {
		baseUrl: 'https://api.sambanova.ai/v1',
		apiKeyUrl: 'https://cloud.sambanova.ai/apis',
		envVar: 'SAMBANOVA_API_KEY',
		exampleModel: 'DeepSeek-V3.1',
		requirement: 'email',
		freeModels: 7,
		maxContext: '1M',
		rateLimit: '20 requests/minute, 20 requests/day, 200K tokens/day',
		modalities: ['text', 'image', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://docs.sambanova.ai/'
	},
	'ollama-cloud': {
		baseUrl: 'https://api.ollama.com/v1',
		apiKeyUrl: 'https://ollama.com/settings/keys',
		envVar: 'OLLAMA_API_KEY',
		exampleModel: 'gpt-oss:20b',
		requirement: 'email',
		freeModels: 19,
		maxContext: '1M',
		rateLimit: 'Monthly starter credits, 1 concurrent request',
		modalities: ['text', 'image', 'video', 'code', 'vision', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://docs.ollama.com/cloud',
		sdk: { id: 'ollama', name: 'Ollama SDK', npm: 'ollama', pip: 'ollama' },
		gotchas: [
			'Same model names as local Ollama, so you can switch by changing the host alone.',
			'Session and weekly caps are gone; the free slice is monthly starter credits on the starter models.'
		]
	},
	ovhcloud: {
		baseUrl: 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1',
		apiKeyUrl: 'https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/',
		envVar: 'OVH_AI_ENDPOINTS_ACCESS_TOKEN',
		exampleModel: 'Meta-Llama-3_3-70B-Instruct',
		requirement: 'none',
		freeModels: 7,
		maxContext: '262K',
		rateLimit: '2 requests/minute anonymous; 400 requests/minute with a key',
		modalities: ['text', 'image', 'audio', 'speech', 'code'],
		openaiCompatible: true,
		docsUrl: 'https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/',
		gotchas: [
			'The catalog prices seven models at €0: four NVIDIA Riva TTS voices, Qwen3Guard-Gen 0.6B and 8B, and Stable Diffusion XL.',
			'Chat models (Llama 3.3 70B, GPT-OSS, Qwen 3.5/3.6) are pay-as-you-go once you have a key. Without one you can still call them at 2 requests/minute.',
			'Five catalog ids are listed as unavailable: Mistral 7B, Mistral Nemo, Mistral Small 3.2, Qwen3-32B and Qwen3-Coder-30B.'
		]
	},
	'kilo-code': {
		baseUrl: 'https://api.kilo.ai/api/gateway',
		apiKeyUrl: 'https://kilo.ai',
		envVar: 'KILO_API_KEY',
		exampleModel: 'nvidia/nemotron-3-ultra-550b-a55b:free',
		requirement: 'none',
		freeModels: 19,
		maxContext: '1M',
		rateLimit: '200 requests per hour per IP',
		modalities: ['text', 'image', 'audio', 'video', 'code', 'reasoning'],
		openaiCompatible: true,
		gotchas: [
			'Free :free models answer without a key. Anonymous traffic is 200 requests an hour per IP.',
			'A Kilo account is only needed for paid models or to bring your own upstream key.'
		]
	},
	'opencode-zen': {
		baseUrl: 'https://opencode.ai/zen/v1',
		apiKeyUrl: 'https://opencode.ai/auth',
		envVar: 'OPENCODE_API_KEY',
		exampleModel: 'nemotron-3-ultra-free',
		requirement: 'email',
		freeModels: 6,
		maxContext: '1M',
		modalities: ['text', 'audio', 'vision', 'reasoning'],
		openaiCompatible: true,
		docsUrl: 'https://opencode.ai/docs/zen/',
		gotchas: [
			'The documented Free set is six ids. deepseek-v4-flash and glm-5.2 on Zen are paid.',
			'Free ids can be promotional and go away.'
		]
	},
	'aion-labs': {
		baseUrl: 'https://api.aionlabs.ai/v1',
		apiKeyUrl: 'https://www.aionlabs.ai',
		envVar: 'AION_API_KEY',
		exampleModel: 'aion-labs/aion-3.0',
		requirement: 'email',
		freeModels: 4,
		maxContext: '131K',
		rateLimit: '15 requests/minute, 20K tokens/day',
		modalities: ['text'],
		openaiCompatible: true
	},
	'agnes-ai': {
		baseUrl: 'https://apihub.agnes-ai.com/v1',
		apiKeyUrl: 'https://platform.agnes-ai.com/settings/apiKeys',
		envVar: 'AGNES_API_KEY',
		exampleModel: 'agnes-2.5-flash',
		requirement: 'email',
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
		exampleModel: 'qwen3.7-plus',
		requirement: 'phone',
		maxContext: '1M',
		rateLimit: '1M tokens per model for 90 days on the Singapore / International endpoint',
		modalities: ['text', 'image', 'code'],
		openaiCompatible: true,
		docsUrl: 'https://www.alibabacloud.com/help/en/model-studio/',
		sdk: { id: 'dashscope', name: 'DashScope SDK', pip: 'dashscope' },
		gotchas: [
			'Use the -intl host outside mainland China; the domestic one rejects foreign accounts.',
			'An Alibaba Cloud account needs a phone number that matches the country you picked at sign-up.',
			'qwen3-plus is not a current id. The plus line is qwen3.5-plus / qwen3.6-plus / qwen3.7-plus.'
		]
	},
	siliconflow: {
		baseUrl: 'https://api.siliconflow.cn/v1',
		apiKeyUrl: 'https://cloud.siliconflow.cn/account/ak',
		envVar: 'SILICONFLOW_API_KEY',
		exampleModel: 'Qwen/Qwen3-8B',
		requirement: 'phone',
		freeModels: 3,
		maxContext: '131K',
		rateLimit: 'Per-model caps after identity verification',
		modalities: ['text'],
		openaiCompatible: true,
		gotchas: [
			'The China console (siliconflow.cn) registers with an SMS to a mainland number. Identity verification unlocks the standing free set.',
			'DeepSeek-R1 and DeepSeek-V3 on SiliconFlow are paid. The standing free set is smaller open weights after KYC.'
		]
	},
	glhf: {
		baseUrl: 'https://glhf.chat/api/openai/v1',
		apiKeyUrl: 'https://glhf.chat/',
		envVar: 'GLHF_API_KEY',
		exampleModel: 'hf:meta-llama/Meta-Llama-3.1-70B-Instruct',
		requirement: 'email',
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
		requirement: 'email',
		freeModels: 2,
		maxContext: '256K',
		rateLimit: '$10 of credits for 3 months',
		modalities: ['text'],
		openaiCompatible: true,
		sdk: { id: 'ai21', name: 'AI21 SDK', pip: 'ai21' },
		gotchas: ['The /studio/v1/models listing now returns 410. Use the current Jamba ids from the console.']
	},
	nscale: {
		baseUrl: 'https://inference.api.nscale.com/v1',
		apiKeyUrl: 'https://console.nscale.com/',
		envVar: 'NSCALE_API_KEY',
		exampleModel: 'meta-llama/Llama-4-Scout-17B-Instruct',
		requirement: 'email',
		freeModels: 2,
		maxContext: '128K',
		rateLimit: '$5 starter credit, no published RPM',
		modalities: ['text'],
		openaiCompatible: true,
		gotchas: ['Not a standing free catalogue — a $5 credit to start, then pay-as-you-go.']
	},
	nebius: {
		baseUrl: 'https://api.studio.nebius.com/v1',
		apiKeyUrl: 'https://studio.nebius.com/settings/api-keys',
		envVar: 'NEBIUS_API_KEY',
		exampleModel: 'meta-llama/Llama-3.3-70B-Instruct',
		requirement: 'card',
		freeModels: 1,
		maxContext: '128K',
		rateLimit: '$1 trial for 30 days',
		modalities: ['text'],
		openaiCompatible: true,
		gotchas: ['The dollar of trial credit needs a payment method. After 30 days you top up.']
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
	email: 'Email account, no card',
	phone: 'Phone verification, no card',
	card: 'Credit card required'
}

/** The one-word version used in the homepage table */
export const REQUIREMENT_SHORT: Record<Requirement, string> = {
	none: 'none',
	email: 'email',
	phone: 'phone',
	card: 'card'
}
