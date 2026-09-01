/**
 * Page copy for /provider/<id>. Two short paragraphs, specific to this
 * provider — not the one-liner used in tables. Figures match providers.ts.
 */
export const PROVIDER_ABOUT: Record<string, string[]> = {
	'google-ai-studio': [
		'Google AI Studio is the console for the Gemini API. A free key is an email away, no card, and it is one of the few endpoints here that treats images, audio, video and PDFs as first-class input — Flash still has a million tokens of context on that tier.',
		'The published ceiling is 15 requests a minute and 1,500 a day, reset at midnight Pacific. Point the OpenAI SDK at generativelanguage.googleapis.com/v1beta/openai and keep the rest of your code. The trade: free-tier prompts and responses may be used to improve Google’s models, so nothing confidential belongs here.'
	],
	groq: [
		'Groq runs open models on its own LPU chips, which is why tokens come back faster than almost anyone else gives away. An email gets you the key. No card. The daily ceiling — 14,400 requests — is the highest on this directory that asks for nothing else.',
		'Limits are per model, not per account, so check the dashboard before you pick one. Kimi K2, Llama 3.3 70B and GPT-OSS 120B all sit on the free list. The API is OpenAI-compatible at api.groq.com/openai/v1; they also ship a native SDK if you want it.'
	],
	'nvidia-nim': [
		'NVIDIA NIM on build.nvidia.com is the evaluation endpoint for NIM microservices: one OpenAI-shaped API in front of the widest free catalogue here, 126 open models, including GLM, DeepSeek and Nemotron.',
		'A phone number, never a card. Up to 40 requests a minute and a million tokens of context on the long models. NVIDIA says it is for evaluation, not production traffic — treat the key that way.'
	],
	openrouter: [
		'OpenRouter is a router, not a lab. One key, one /api/v1 URL, and it fans the request out to whoever actually serves the model. Anything whose id ends in :free is $0 in and $0 out; the same model without the suffix bills you.',
		'The free pool is 28 models with up to 1M of context. A $10 top-up lifts the daily cap to 1,000 requests. Set the HTTP-Referer and X-Title headers if you want to show up on their public leaderboards.'
	],
	cerebras: [
		'Cerebras Cloud serves models from wafer-scale chips, which is why GPT-OSS 120B comes back at thousands of tokens a second. The free account is an email, no card.',
		'The catch is the request cap: 5 a minute, 30K tokens a minute, a million tokens a day. Batch work rather than firing in a loop. OpenAI-compatible at api.cerebras.ai/v1, with a native Cloud SDK if you prefer it to the OpenAI client.'
	],
	'cloudflare-workers-ai': [
		'Workers AI runs inference at Cloudflare’s edge, so a Worker can call a model without a round trip to a regional GPU farm. The free unit is 10,000 neurons a day, shared across the catalogue — 40 models, and the longest context on this site at 10M.',
		'The REST URL needs your {account_id} swapped in. Inside a Worker, skip that and use the AI binding: no token, no extra hop. An OpenAI-compatible path exists for code that already speaks that shape.'
	],
	mistral: [
		'Mistral is the French lab behind Mixtral and the current Medium line. The API is OpenAI-compatible, the console gives you a key on an email, and the experiment tier is there to try the models before you pick a paid plan.',
		'Context goes to 256K on the free models. Rate limits on the experiment tier sit around one request a second; paid models get a much higher token budget. Use it to see if Mixtral or the smaller open weights are enough, not to ship.'
	],
	cohere: [
		'Cohere’s Command models are built for RAG: embeddings, rerank and long-document chat on one key. The trial key does not expire and needs no card, but it is licensed for prototypes, not production.',
		'1,000 requests a month, 20 a minute, and Command A reaches 436K of context. The OpenAI-shaped path is /compatibility/v1; Cohere’s own API lives at /v2. Use the native SDK if you want rerank and embed without pretending they are chat.'
	],
	llm7: [
		'LLM7.io is an independent gateway: grab https://api.llm7.io/v1 and you can call it with the placeholder key “unused” — no account, no email. That is the point.',
		'Anonymous traffic is 30 requests a minute; a free token from token.llm7.io lifts it to 120. Sixteen models, OpenAI-shaped, including DeepSeek and Qwen. Fine for a first test. Anything you rely on wants an account somewhere else on this site.'
	],
	deepseek: [
		'DeepSeek serves its own V3 chat model and R1 reasoner from the source, OpenAI-compatible, with a pile of welcome credits on sign-up rather than a standing daily quota. Limits flex with load.',
		'128K of context, two models, no card. If you want DeepSeek without going through a router, this is the door. Docs live at api-docs.deepseek.com.'
	],
	huggingface: [
		'Hugging Face Inference Providers is a router in front of many hosts — Groq, Together, Fireworks, Nscale, OVH and others. One HF_TOKEN, one router.huggingface.co/v1 URL, and a monthly credit allowance on the free account.',
		'The router picks a provider for you. Append :provider to a model id to pin one, so you are not surprised by who actually ran the call. The OpenAI-compatible path is chat only; embeddings and the rest go through the Hugging Face client.'
	],
	'cloud-modelscope': [
		'ModelScope is Alibaba’s public model hub. The inference API puts a large free catalogue in front of you — 58 models, many of them Chinese frontier weights — at 2,000 requests a day, OpenAI-compatible.',
		'Some account types want a Chinese phone number. 1M context on the long models. If you specifically want Qwen from the source, Alibaba Model Studio is the other door; ModelScope is the wider zoo.'
	],
	zai: [
		'Z.ai is Zhipu’s API, the lab behind GLM. The Flash line is the permanent free tier; the rest of the catalogue bills per token. OpenAI-compatible at open.bigmodel.cn/api/paas/v4.',
		'Free models share a single concurrent request. 200K of context. If GLM is the model you want, this is the source, not a reseller.'
	],
	sambanova: [
		'SambaNova Cloud runs Llama and DeepSeek on its own RDU chips. Fast when it answers; the free ceiling is tight — 20 requests a minute, 20 a day, 200K tokens a day.',
		'Email, no card, 128K context. OpenAI-compatible. Use it when you want those weights on custom silicon, not when you need volume.'
	],
	xai: [
		'xAI’s API is Grok, including the 2M-context models — the longest window on this directory. Sign-up is an email; the free allowance is a monthly credit pot rather than a hard request cap.',
		'OpenAI-compatible at api.x.ai/v1. Live data from X is the extra, when the model has it. Credits run out quietly, so watch the console before you depend on the key.'
	],
	'ollama-cloud': [
		'Ollama Cloud is the same model names and client you already use locally, pointed at someone else’s GPU. ollama run gpt-oss:120b-cloud after ollama signin, or call api.ollama.com/v1 with a key.',
		'Session and weekly limits, 13 models, up to 1M of context. Switching from local is a host change. Cloud models get retired on a schedule; the ones on your disk do not.'
	],
	ovhcloud: [
		'OVHcloud AI Endpoints is European serverless inference: Llama, Qwen, DeepSeek and friends, hosted in OVH’s sovereign cloud. They say prompts are not used to train, and they keep data only for billing.',
		'You can hit it with no account at 2 requests a minute. Register for more. OpenAI-compatible, 14 models, 262K context. The playground is free; production is a Public Cloud project.'
	],
	'kilo-code': [
		'Kilo Code is a Cline fork, but the thing on this page is the gateway behind it: api.kilo.ai/api/gateway, OpenAI-compatible, one key, hundreds of models, a dozen of them tagged :free.',
		'Anonymous traffic is about 200 requests an hour per IP. NVIDIA’s free endpoints on the gateway are trial-use only — no personal data. You can also bring your own key and pay the upstream, not Kilo.'
	],
	'opencode-zen': [
		'OpenCode Zen is the optional model gateway the OpenCode team runs. You do not need it to use OpenCode; it is a curated list of models they have actually tested as coding agents, including a set that is free.',
		'Sign in, copy the key, call opencode.ai/zen/v1. Free ids currently include Grok Code Fast, GLM 4.7 and several :free coding models — those can be promotional and go away. Pay-as-you-go for the rest.'
	],
	alibaba: [
		'Alibaba Model Studio (DashScope) is Qwen from the people who train it. International accounts must use the -intl host; the China endpoint rejects foreign keys.',
		'Free quota is per model, with a 1M-context tier on the long Qwen3 variants. OpenAI-compatible via /compatible-mode/v1. If you only want Qwen, this beats a router.'
	],
	siliconflow: [
		'SiliconFlow hosts Chinese open weights with a standing free tier — DeepSeek distills and Qwen, 30 requests a minute, 60K tokens a minute, 131K of context.',
		'Three free models, OpenAI-compatible at api.siliconflow.cn/v1. A Chinese platform; expect the console in that language. Fine if those specific distills are what you want.'
	],
	chutes: [
		'Chutes is decentralised serverless inference on Bittensor: independent GPU operators serve open models through an OpenAI-compatible gateway at llm.chutes.ai/v1. They also run TEE-attested endpoints, so the host is not supposed to read the prompt.',
		'The catalogue is mostly paid per token. The free slice we list is community capacity with no published hard cap, which means it can stall. DeepSeek R1 is the reason people show up.'
	],
	ai21: [
		'AI21 Labs is the Israeli lab behind Jamba, a hybrid Mamba-Transformer that stays cheap on long documents because it does not pay full Transformer cost on every token. 256K of context, 200 requests a minute on the free key.',
		'Two models on the free list, OpenAI-compatible, no card. Use it when the document is the point, not when you want a general chat model.'
	],
	nscale: [
		'Nscale is a European GPU cloud with serverless inference. New accounts get a fair-use free path onto Llama 3.3 70B and DeepSeek R1 distills — no published RPM; they throttle if you lean on it.',
		'OpenAI-compatible at inference.api.nscale.com/v1, 128K context, no card. EU-hosted. Treat fair-use as a courtesy, not a contract.'
	],
	nebius: [
		'Nebius Token Factory (still billed as AI Studio in older consoles) is a European inference studio: dozens of open models, dual “fast” vs “base” prices, and $1 of free credit to start, no card to claim it.',
		'Not a standing free tier — when the dollar is gone you top up. Qwen3 235B MoE is the headline weight. OpenAI-compatible at api.studio.nebius.com/v1.'
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
		'Aion Labs is an Israeli lab whose models are tuned for roleplay and long-form character work. The API is OpenAI-compatible at api.aionlabs.ai/v1; a free key is the default on sign-up, no card.',
		'The free tier is 15 requests a minute and 20,000 tokens a day — both the per-minute and the daily cap, so a chatty session burns the day fast. Higher tiers unlock when you top up credits.'
	],
	'agnes-ai': [
		'Agnes AI is a multimodal API: language, image generation and video behind one OpenAI-compatible hub at apihub.agnes-ai.com/v1. agnes-2.0-flash is the default for coding, tool calling and agent work.',
		'Sign-up, no card for the Flash line. Image and video Flash endpoints are billed at $0 in the current public price list, with low RPM on video. Confirm the console before you depend on a limit.'
	],
	glhf: [
		'glhf.chat runs open Hugging Face models on autoscaling GPUs and exposes them as an OpenAI-compatible API. Model ids are prefixed with hf: and point at a repo — paste a Hugging Face path rather than picking from a fixed menu.',
		'Two models on the free list we track, 131K context, unlimited on those. The service started as “free while we figure out pricing”; treat capacity as a courtesy, not an SLA.'
	]
}
