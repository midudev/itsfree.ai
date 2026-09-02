/**
 * Page copy for /provider/<id>. Two short paragraphs, specific to this
 * provider — not the one-liner used in tables. Figures match providers.ts.
 */
export const PROVIDER_ABOUT: Record<string, string[]> = {
	'google-ai-studio': [
		'Google AI Studio is the console for the Gemini API. A free key is an email away, no card, and it is one of the few endpoints here that treats images, audio, video and PDFs as first-class input. The current Flash is Gemini 3.7 — still a million tokens of context on that tier.',
		'The published ceiling is 15 requests a minute and 1,500 a day, reset at midnight Pacific. Point the OpenAI SDK at generativelanguage.googleapis.com/v1beta/openai and keep the rest of your code. The trade: free-tier prompts and responses may be used to improve Google’s models, so nothing confidential belongs here.'
	],
	groq: [
		'Groq runs open models on its own LPU chips, which is why tokens come back faster than almost anyone else gives away. An email gets you the key. No card. The free chat list is GPT-OSS, Qwen 3.6/3.8 and Compound — Llama, Kimi and DeepSeek left.',
		'Limits are per model: 30 requests a minute and 1,000 a day on the chat ids, 250 a day on Compound. The old 14,400 figure is only for the prompt-guard classifiers. OpenAI-compatible at api.groq.com/openai/v1; they also ship a native SDK if you want it.'
	],
	'nvidia-nim': [
		'NVIDIA NIM on build.nvidia.com is the evaluation endpoint for NIM microservices: one OpenAI-shaped API in front of the widest free catalogue here. The live /v1/models list is 82 ids — DeepSeek V4 Flash, Nemotron 3 Ultra, Laguna XS, Kimi K3, MiniMax M3.',
		'A phone number, never a card. Up to 40 requests a minute and a million tokens of context on the long models. GLM 5.2 is not on the current list. NVIDIA says it is for evaluation, not production traffic — treat the key that way.'
	],
	openrouter: [
		'OpenRouter is a router, not a lab. One key, one /api/v1 URL, and it fans the request out to whoever actually serves the model. Anything whose id ends in :free is $0 in and $0 out; the same model without the suffix bills you. The openrouter/free alias picks a free model that matches the request.',
		'The free pool is 18 models right now — Nemotron 3 Ultra, MiniMax M3, Laguna and GLM 5.2 among them — with up to 1M of context. DeepSeek and Qwen no longer have a :free endpoint. New accounts get 20 requests a minute and 50 a day; a $10 top-up lifts the daily cap to 1,000. Set the HTTP-Referer and X-Title headers if you want to show up on their public leaderboards.'
	],
	'amd-radeon': [
		'AMD Radeon Cloud’s Token Factory is a shared OpenAI-compatible API on AMD GPUs. Log in at developer.amd.com.cn/radeon/tokenfactory, open a Public Free Model API card, and copy the key. Base URL is developer.amd.com.cn/radeon/api/v1. The five shared ids today are DeepSeek-V4-Flash-0731, DeepSeek-V4-Flash-Vision-Exp, Qwen3.8-Flash-Next, MiniCPM-V46 and MiniCPM5-1B.',
		'The daily API quota is $10 USD, which at current rates is about 10 million to 111 million input/output tokens, depending on the model. It resets every day. Dedicated Model APIs on the same page are not that pool — they spend account compute. DeepSeek V4 Flash still has 1M of context. No card to start.'
	],
	requesty: [
		'Requesty is an OpenAI-compatible gateway: one key from app.requesty.ai/api-keys, base URL router.requesty.ai/v1. The free slice is 12 models priced $0 — Nemotron 3 Ultra, Super, Nano and Lightning, Laguna XS and M, Gemma 4 31B, Leanstral 1.5, Muse Glimmer and Ling 3.0 Tiny. Super, Ultra and Lightning go to 1M of context.',
		'New organisations get 200 requests a day and 20 a minute, shared across every free model, reset daily, no card. Paying organisations jump to 1,000 a day. The rest of the 600+ catalogue is pay-as-you-go plus 5%. EU traffic can use router.eu.requesty.ai/v1.'
	],
	'vercel-ai-gateway': [
		'Vercel AI Gateway is one OpenAI-compatible URL in front of hundreds of models, at the provider’s list price with no markup. Every team gets $5 of credits a month on the Free Tier subset — GPT-OSS 120B, GPT-5.4 Mini, Gemma 4 31B, Gemini 2.5 Flash, Qwen 3.8 Flash Next, GLM 5.3 Flash, Kimi K2.7 Code, MiniMax M3, Nemotron 3 Super, Llama 4 Maverick, Grok 4.6, DeepSeek V3.2 Thinking. Email, no card. Base https://ai-gateway.vercel.sh/v1, key AI_GATEWAY_API_KEY.',
		'The credit starts on the first request and refreshes monthly. Buy extra credits and the monthly $5 stops — you move to the paid tier. Free-tier requests are rate-limited per model (429 if you burst). Claude Opus/Sonnet 5, Gemini 3.7 and GPT-5.6 are not on that subset. The live filter is vercel.com/ai-gateway/models?freeTier=true.'
	],
	cerebras: [
		'Cerebras Cloud serves models from wafer-scale chips, which is why GPT-OSS 120B comes back at thousands of tokens a second. The public catalogue is two models: gpt-oss-120b and gemma-4-31b.',
		'Signup grants $5 once. A payment method unlocks the credit; it is not a standing free tier. After the five dollars you buy more. The request cap is 5 a minute, 30K tokens a minute, a million tokens a day, and the free window is 65K. Batch work rather than firing in a loop. OpenAI-compatible at api.cerebras.ai/v1.'
	],
	'cloudflare-workers-ai': [
		'Workers AI runs inference at Cloudflare’s edge, so a Worker can call a model without a round trip to a regional GPU farm. The free unit is 10,000 neurons a day, shared across the catalogue. Llama 3.3 70B, GPT-OSS 120B and Qwen 3.8 stay on that tier.',
		'The longest free window is 262K, on Qwen 3.8 27B — there is no 10M model here. Kimi K2.6, GLM 5.x and DeepSeek V4 are Workers Paid only. The REST URL needs your {account_id}; inside a Worker, use the AI binding instead.'
	],
	mistral: [
		'Mistral is the French lab behind the current Small and Medium line. Mixtral 8x7B retired from the API on 30 Mar 2025. The console still gives you a key on an email; Free mode and Labs are the no-card slice.',
		'Context goes to 256K. Labs ids (labs- prefix) are free of charge; mistral-medium-3-5 is paid. Limits live per org in the console, not as a published “one request a second”. Use Small or a Labs model to try, not to ship.'
	],
	cohere: [
		'Cohere’s Command models are built for RAG: embeddings, rerank and long-document chat on one key. The trial key does not expire and needs no card, but it is licensed for prototypes, not production.',
		'1,000 requests a month, 20 a minute, and Command A (command-a-03-2025) reaches 256K of context. Command A+ is command-a-plus-05-2026. The OpenAI-shaped path is /compatibility/v1; Cohere’s own API lives at /v2.'
	],
	llm7: [
		'LLM7.io is an independent gateway: grab https://api.llm7.io/v1 and you can call it with the placeholder key “unused” — no account, no email. That is the point.',
		'Anonymous traffic is 10 requests a minute on the turbo set: gpt-oss, Gemma 4 31B, MiniMax M2.7, Codestral and Mistral Nemo. A free token from token.llm7.io lifts it to 40 a minute and opens more ids. Fine for a first test.'
	],
	deepseek: [
		'DeepSeek serves V4 Flash, V4 Pro and an experimental Flash Vision model from the source. OpenAI-compatible (and Anthropic-compatible), with a granted balance on sign-up rather than a standing daily quota. After that it is pay-as-you-go. Limits flex with load.',
		'1M of context, thinking or not on the same id — the old chat/reasoner split is gone. No card to start. If you want DeepSeek without going through a router, this is the door. Docs live at api-docs.deepseek.com.'
	],
	huggingface: [
		'Hugging Face Inference Providers is a router in front of many hosts. One HF_TOKEN, one router.huggingface.co/v1 URL, and $0.10 of credit a month on the free account. The live router lists 135 model ids, not a fixed free seven.',
		'The router picks a provider for you. Append :provider to a model id to pin one, so you are not surprised by who actually ran the call. The OpenAI-compatible path is chat only; embeddings and the rest go through the Hugging Face client.'
	],
	'cloud-modelscope': [
		'ModelScope is Alibaba’s public model hub. The inference API puts a large free catalogue in front of you — 50 models on the live list, MiniMax M3, Qwen 3.8, DeepSeek V4 and GLM among them — at 2,000 requests a day, OpenAI-compatible.',
		'Sign-up wants a phone number — often a Chinese one — before the inference key works. 1M context on the long models. If you specifically want Qwen from the source, Alibaba Model Studio is the other door; ModelScope is the wider zoo.'
	],
	zai: [
		'Z.ai is Zhipu’s API, the lab behind GLM. The Flash line is the permanent free tier — glm-4.7-flash and glm-4.5-flash. GLM-5, GLM-5.2 and glm-4.7 bill per token. OpenAI-compatible at open.bigmodel.cn/api/paas/v4.',
		'open.bigmodel.cn wants a Chinese phone number. The international portal at z.ai is email-only and a different account. Concurrency is per account and model, shown in the console. Flash chat goes to 200K.'
	],
	sambanova: [
		'SambaNova Cloud runs seven models on its own RDU chips: Llama 3.3 70B, DeepSeek V3.1 and V3.2, MiniMax M2.7 and M3, Gemma 4 31B and GPT-OSS 120B. Fast when it answers; the free ceiling is tight — 20 requests a minute, 20 a day, 200K tokens a day.',
		'Email, no card. MiniMax M3 takes the window to 1M. R1 left the catalogue in April 2026. OpenAI-compatible. Use it when you want those weights on custom silicon, not when you need volume.'
	],
	'ollama-cloud': [
		'Ollama Cloud is the same model names and client you already use locally, pointed at someone else’s GPU. ollama run gpt-oss:120b-cloud after ollama signin, or call api.ollama.com/v1 with a key.',
		'Nineteen models on the live list, including DeepSeek V4, MiniMax M3, GLM 5.x and Kimi K3. The free slice is monthly starter credits on the starter models, one concurrent request — session and weekly caps are gone. Switching from local is a host change.'
	],
	ovhcloud: [
		'OVHcloud AI Endpoints is European serverless inference, hosted in France. The public catalog at ovhcloud.com/en/public-cloud/ai-endpoints/catalog/ lists 19 live models. Seven of them are priced at €0: NVIDIA Riva TTS (EN/DE/ES/IT), Qwen3Guard-Gen 0.6B and 8B, and Stable Diffusion XL.',
		'Llama 3.3 70B, GPT-OSS 20B/120B and Qwen 3.5/3.6 are pay-as-you-go with a key, but you can call any of them with no account at 2 requests a minute. A registered Public Cloud project jumps to 400 a minute and starts billing. OpenAI-compatible at oai.endpoints.kepler.ai.cloud.ovh.net/v1. They say prompts are not used to train.'
	],
	'kilo-code': [
		'Kilo Code is a Cline fork, but the thing on this page is the gateway behind it: api.kilo.ai/api/gateway, OpenAI-compatible, one key, hundreds of models, 19 of them tagged :free right now — Nemotron, Laguna, MiniMax, Ling.',
		'Free :free models answer without a key — no email, no account. Anonymous traffic is 200 requests an hour per IP. NVIDIA’s free endpoints on the gateway are trial-use only — no personal data. A Kilo account is only needed for paid models or to bring your own upstream key.'
	],
	'opencode-zen': [
		'OpenCode Zen is the optional model gateway the OpenCode team runs. You do not need it to use OpenCode; it is a curated list of models they have actually tested as coding agents, including a set that is free.',
		'Sign in, copy the key, call opencode.ai/zen/v1. The documented Free set is six ids — Nemotron Ultra, Lightning, MiMo, Ling Flash, big-pickle, Muse Spark. DeepSeek V4 and GLM 5.2 on Zen are paid. Free ids can be promotional and go away.'
	],
	alibaba: [
		'Alibaba Model Studio (DashScope) is Qwen from the people who train it. International accounts must use the -intl host; the China endpoint rejects foreign keys. New users get 1M tokens per model for 90 days on the Singapore / International scope.',
		'An Alibaba Cloud account needs a phone number that matches the country you picked at sign-up — not just an email. The plus line is qwen3.5-plus, qwen3.6-plus, qwen3.7-plus — qwen3-plus is not a current id. Long variants still reach 1M of context. OpenAI-compatible via /compatible-mode/v1.'
	],
	siliconflow: [
		'SiliconFlow hosts Chinese open weights. The China console registers with SMS to a mainland number; identity verification then unlocks a small standing free set. DeepSeek-R1 and DeepSeek-V3 on this host are paid. Caps are per model, shown in the console, not a global 30 RPM.',
		'OpenAI-compatible at api.siliconflow.cn/v1, 131K of context. A Chinese platform; expect the console in that language. Fine if the specific free weights are what you want.'
	],
	ai21: [
		'AI21 Labs is the Israeli lab behind Jamba, a hybrid Mamba-Transformer that stays cheap on long documents because it does not pay full Transformer cost on every token. 256K of context. New accounts get $10 of credits for three months.',
		'Two models we track, OpenAI-compatible, no card to start. The old /studio/v1/models listing now returns 410 — pick the current Jamba id from the console. Use it when the document is the point, not when you want a general chat model.'
	],
	nscale: [
		'Nscale is a European GPU cloud with serverless inference. New accounts get $5 of starter credit, then pay-as-you-go. There is no published RPM and no standing free catalogue of two models.',
		'OpenAI-compatible at inference.api.nscale.com/v1, 128K context, no card to claim the credit. EU-hosted. Treat the five dollars as a trial, not a contract.'
	],
	nebius: [
		'Nebius Token Factory (still billed as AI Studio in older consoles) is a European inference studio: dozens of open models, dual “fast” vs “base” prices, and $1 of trial credit for 30 days. Claiming it needs a payment method.',
		'Not a standing free tier — when the dollar is gone you top up. Llama 3.3 70B is the example id in their current OpenAPI. OpenAI-compatible at api.studio.nebius.com/v1.'
	],
	vllm: [
		'vLLM is the serving engine production actually uses: PagedAttention, continuous batching, an OpenAI-compatible server on localhost:8000/v1. You bring the GPU.',
		'`vllm serve Qwen/Qwen3-8B` and you are done. CUDA or ROCm; on a Mac reach for MLX instead. No quota, no key, nothing leaving the machine.'
	],
	mlx: [
		'mlx-lm is Apple’s array framework pointed at language models. On an M-series Mac it is the fastest local path, because it uses unified memory instead of fighting for a discrete GPU.',
		'Apple Silicon only. `mlx_lm.server --model mlx-community/Qwen3-8B-4bit` serves OpenAI-compat on localhost:8080/v1. Context is whatever your unified memory holds.'
	],
	llamafile: [
		'llamafile is Mozilla’s trick: one file that is both the GGUF weights and the runtime (llama.cpp plus Cosmopolitan Libc). Download, chmod +x, run. No install, no Python, no Docker.',
		'`--server` exposes OpenAI-compat on port 8080. Context is -c at launch. The right tool when you want to hand someone a model as an executable.'
	],
	ollama: [
		'Ollama is the local default: one CLI, a model library, an OpenAI-compatible server on localhost:11434/v1. `ollama pull llama3.3` once, then call it like any other provider.',
		'macOS, Linux, Windows. No quota. The request never leaves the machine unless you opt into Cloud. If you want a GUI instead, LM Studio; if you want production batching, vLLM.'
	],
	'lm-studio': [
		'LM Studio is the desktop app for people who would rather not touch a terminal: browse GGUF and MLX, download, chat, then open the Developer tab and start the local server on localhost:1234/v1.',
		'Same deal as Ollama — unlimited, private, your RAM is the ceiling — with a GUI and a built-in chat. Start the server before your editor tries to call it.'
	],
	'llama-cpp': [
		'llama.cpp is the C++ engine almost every other local tool wraps. No Python, no dependencies beyond a compiler (or a release binary). `llama-server -hf ggml-org/gpt-oss-120b-GGUF` speaks OpenAI on port 8080.',
		'Context is -c at launch. CPU, Metal, CUDA, ROCm. Use this when you want the metal, or when Ollama and LM Studio are too much app around the model.'
	],
	jan: [
		'Jan is an open-source ChatGPT-shaped desktop app that runs 100% offline. The local server is localhost:1337/v1, OpenAI-compatible, so editors can talk to it the same way they talk to LM Studio.',
		'Download, pick a model, chat. No account. The point is the UI, not a new engine — under the hood it is still local weights on your machine.'
	],
	'aion-labs': [
		'Aion Labs is an Israeli lab whose models are tuned for roleplay and long-form character work. The live list is four ids: aion-2.0, aion-3.0, aion-3.0-mini and aion-rp-llama-3.1-8b. aion-2-5 is gone. OpenAI-compatible at api.aionlabs.ai/v1.',
		'The free tier is 15 requests a minute and 20,000 tokens a day — both the per-minute and the daily cap, so a chatty session burns the day fast. Higher tiers unlock when you top up credits.'
	],
	'agnes-ai': [
		'Agnes AI is a multimodal API: language, image generation and video behind one OpenAI-compatible hub at apihub.agnes-ai.com/v1. agnes-2.5-flash is the current default for coding, tool calling and agent work.',
		'Sign-up, no card for the Flash line. The published chat cap is 30 requests a minute (20 effective). Image and video Flash endpoints are billed at $0 in the current public price list. Confirm the console before you depend on a limit.'
	],
	glhf: [
		'glhf.chat runs open Hugging Face models on autoscaling GPUs and exposes them as an OpenAI-compatible API. Model ids are prefixed with hf: and point at a repo — paste a Hugging Face path rather than picking from a fixed menu.',
		'Two models on the free list we track, 131K context, unlimited on those. The service started as “free while we figure out pricing”; treat capacity as a courtesy, not an SLA.'
	]
}
