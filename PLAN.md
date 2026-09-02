# it's free*

Directory of every free way to run an AI model.

## Show every free provider {#providers}
files: [src/data/providers.ts, src/data/provider-about.ts, src/data/provider-catalogs.ts, src/data/resources.ts, src/pages/index.astro, src/pages/provider/[id].astro, src/components/ProviderTable.astro]
links: [models, collections]
- [x] Refresh OpenRouter’s free model list {#openrouter-free}
  by: cursor
  from: agent
  tech: 18 :free ids from /api/v1/models; drop R1 and Qwen from the featured set
- [x] Recheck every API provider’s free models and limits {#provider-audit}
  by: cursor
  from: agent
  tech: live /models and official docs; LAST_VERIFIED to 2 Sep 2026
- [x] List the OVH catalog models that are actually free {#ovh-free}
  by: cursor
  from: agent
  tech: catalog.endpoints.ai.ovh.net/rest/v1/models_v2 + the public catalog page
- [x] Add Inference.net if the free slice is real {#inference-net}
  by: cursor
  from: agent
  tech: docs.inference.net + /v1/models + pricing page; 30 RPM free tier
- [x] Add AMD Radeon Token Factory {#amd-radeon}
  by: cursor
  from: agent
  tech: $10/day quota; 5 public free model APIs on developer.amd.com.cn
- [x] Add Requesty if the 200/day free models are real {#requesty}
  by: cursor
  from: agent
  tech: 12 $0 ids from router.requesty.ai/v1/models; 200 RPD / 20 RPM, no card
- [x] List every free model on the provider page {#provider-full-catalog}
  by: cursor
  from: agent
  tech: provider-catalogs.ts; detail page shows every free id; table chips stay featured
- [x] Label signup as none, email, phone or card {#signup-labels}
  by: cursor
  from: agent
  tech: rename registration→email; phone is NIM, ModelScope, SiliconFlow, Zhipu, Alibaba; Kilo is none
- [x] Call Cerebras a one-time $5 signup credit {#cerebras-onetime}
  by: cursor
  from: agent
  tech: quota is $5 once at signup, not a 30-day trial; card still unlocks it
- [x] Drop Grok 3 from xAI {#drop-grok-3}
  by: cursor
  from: agent
  tech: catalog keeps grok-4.6 and grok-4.3; freeModels 2
- [x] Drop hosts with no free tier or free credits {#no-free-out}
  by: cursor
  from: agent
  tech: keep standing free or a published signup credit; prepaid-only hosts leave
- [x] Add Vercel AI Gateway’s $5 free tier {#vercel-gateway}
  by: cursor
  from: agent
  tech: $5/month on the free-tier subset; curated chips, not the full ~150 chat ids
- [x] Drop the awesome-freellm-apis listing {#drop-freellm-repo}
  by: cursor
  from: agent
  tech: remove the tool card, icon and favicon map; keep official-docs as the source of figures
- [x] Pin isbetter.ai and canirun.ai at the top of tools {#pin-tools}
  by: cursor
  from: agent
  tech: toolbox list leads with those two picks; ToolList shows the star badge
- [x] Highlight Vercel AI Gateway in the table {#pick-vercel}
  by: cursor
  from: agent
  tech: pick star next to OpenRouter; same class of one-key gateway

## List every free model {#models}
files: [src/data/models.ts, src/pages/models.astro, src/pages/model/[slug].astro]
links: [providers]
- [x] Point Gemini Flash at 3.7 {#gemini-3-7}
  by: cursor
  from: agent
  tech: example and apiId gemini-3.7-flash; Lite stays gemini-3.5-flash-lite
- [x] List the DeepSeek models that are actually free {#deepseek-current}
  by: cursor
  from: agent
  tech: official API is V4 Flash/Pro/Vision Exp; keep R1 and V3 only on hosts that still serve them
- [x] Name Groq’s Qwen chips as 3.8 and 3.6 27B {#qwen-groq-exact}
  by: cursor
  from: agent
  tech: new slugs qwen-3-8-27b / qwen-3-6-27b; Groq lists both; Cloudflare’s free chip is 3.8 27B
- [x] Homepage chips match the provider catalog {#homepage-chips}
  by: cursor
  from: agent
  tech: Includes column uses catalogFor; pin GPT-OSS 120B then Qwen 3.8 27B; overflow stays …
- [x] Give every homepage chip a vendor icon and a human name {#chip-display}
  by: cursor
  from: agent
  tech: vendorOf + prettyModelName; LLM7 gpt-oss displays as GPT-OSS 120B; new vendor favicons
- [x] Name every host’s chips with the exact weight it serves {#exact-chips}
  by: cursor
  from: agent
  tech: AMD Qwen3.8-Flash-Next; hosted APIs drop family buckets when the live id is one variant
- [x] Replace leftover Qwen 3 chips on hosted APIs {#qwen3-leftover}
  by: cursor
  from: agent
  tech: CF 30B-A3B; HF/ModelScope 3.8 27B; Ollama Cloud 3.5 397B; drop Nebius qwen3

## Group by what you need {#collections}
files: [src/data/collections.ts, src/pages/[collection].astro]
links: [providers]

## Chrome, SEO and share cards {#chrome}
files: [src/layouts/Layout.astro, src/lib/seo.ts, src/components/SiteHeader.astro, src/components/SiteFooter.astro, astro.config.mjs, wrangler.jsonc, package.json, pnpm-workspace.yaml, public/og.png, public/og/**, public/favicon.ico, public/favicon.svg, public/favicon-16x16.png, public/favicon-32x32.png, public/apple-touch-icon.png, public/icon-192x192.png, public/icon-512x512.png, public/site.webmanifest, scripts/build-og-image.py, scripts/build-favicons.py]
- [x] Run Workers Builds on pnpm 11 {#pnpm-cf-11}
  by: cursor
  from: agent
  tech: packageManager pnpm@11.24.0; PNPM_VERSION still needs the dashboard Build variable
- [x] Make Cloudflare install accept the workspace file {#pnpm-cf-workspace}
  by: cursor
  from: agent
  tech: packages: ['.'] + onlyBuiltDependencies so Workers Builds pnpm@10.11.1 can install
- [x] Open Graph files for every page {#og-files}
  by: cursor
  from: agent
  tech: 1200×630 PNG per route under public/og, favicon set + site.webmanifest, tags per opengraph.to/articles
- [x] Deploy on Cloudflare Workers {#cloudflare}
  by: cursor
  from: agent
  tech: @astrojs/cloudflare adapter, static output, wrangler.jsonc with 404-page

## decisions

- 2026-09-02: Vercel AI Gateway is a real free host: $5 of monthly credits on the Free Tier model subset (`vercel.com/ai-gateway/models?freeTier=true`). Buying credits ends the monthly grant. Do not list the whole subset — chips are the current standouts (GPT-OSS 120B, GPT-5.4 Mini, Gemma 4 31B, Qwen 3.8 Flash Next, GLM 5.3 Flash, Kimi K2.7 Code, MiniMax M3, Nemotron 3 Super, Llama 4 Maverick, Grok 4.6, Gemini 2.5 Flash, DeepSeek V3.2 Thinking). Frontier Claude / Gemini 3.7 / GPT-5.6 are paid. Base `https://ai-gateway.vercel.sh/v1`.

- 2026-09-02: A hosted API stays only if it has a standing free slice or a published signup credit. Official docs win: xAI’s tutorial says “load it with credits” and publishes no grant; Chutes is pay-per-token with the old free perk retired; Inference.net’s $0 plan is 1M Gateway BYOK plus 30 RPM, with hosted models billed to a pot they never price. Those three leave. Cerebras $5, DeepSeek signup tokens, HF $0.10/mo, Ollama Cloud starter credits, Alibaba 90-day 1M, AI21/Nscale/Nebius trials stay.

- 2026-09-02: Homepage chips get a vendor icon from the model page when the id aliases to a slug, otherwise from `vendorOf(id)` (prefix map). Display names go through `prettyModelName` so `gpt-oss`, `gpt-oss-120b` and `GPT-OSS 120B` all read GPT-OSS 120B. LLM7’s live id stays `gpt-oss`; the chip says GPT-OSS 120B (131K turbo, flagship default). New vendor favicons: Anthropic, MiniMax, Liquid, InclusionAI, 01.AI, IBM, Adept, Dots.

- 2026-09-01: One 1200×630 PNG per shareable route (`/og.png` for home, `/og/…` for the rest). Titles clamp to 60 characters, descriptions to 110–160, no URLs in `og:description`. Favicon set matches the OpenGraph.to complete setup, including `site.webmanifest`.
- 2026-09-01: Deploy on Cloudflare Workers via `@astrojs/cloudflare`. The catalog stays static (`output: 'static'`); Wrangler serves `dist/` and the custom 404. No session KV.
- 2026-09-02: Cloudflare Workers Builds still ships pnpm 10.11.1, which rejects a settings-only `pnpm-workspace.yaml` (`packages field missing or empty`). This repo is not a monorepo; declare `packages: ['.']` and keep `onlyBuiltDependencies` so 10.11.1 can install while local pnpm 11 keeps `allowBuilds`.
- 2026-09-02: Workers Builds should run the same pnpm as local (11.24.0). Pin it with `packageManager` and set the build variable `PNPM_VERSION=11.24.0` on the Worker trigger — not in `wrangler.jsonc` vars.
- 2026-09-02: DeepSeek’s first-party API is `deepseek-v4-flash`, `deepseek-v4-pro` and `deepseek-v4-flash-vision-exp` (1M context). The old `deepseek-chat` / `deepseek-reasoner` aliases (V3/R1) retired 24 Jul 2026. Keep R1 and V3 in the catalog only where other free hosts still serve those weights.
- 2026-09-02: OpenRouter’s live `/api/v1/models` list has 18 `:free` ids (plus the `openrouter/free` router). No DeepSeek, no Qwen. Featured set is Nemotron, Laguna and GLM 5.2 — the catalog families that still have a working free endpoint.
- 2026-09-02: Google AI Studio’s current Flash workhorse is Gemini 3.7 Flash (`gemini-3.7-flash`, 1M context), announced 13 Aug 2026. Keep the `/model/gemini-3-flash/` slug. Lite is still `gemini-3.5-flash-lite` — no 3.7 Lite.
- 2026-09-02: Re-audit every hosted API against live catalogues and official limit pages, not the 27 Aug freellm snapshot. Featured model slugs stay in the small catalog; counts, ids and rate limits must match what the provider actually serves today.
- 2026-09-02: Groq free chat is GPT-OSS + Qwen 3.6/3.8 + Compound at 30 RPM / 1,000 RPD (Compound 250 RPD). Llama 3.3, Kimi K2 and DeepSeek left. The 14,400 figure is only prompt-guard. Cerebras is two models on a $5/30-day trial that needs a card. Cloudflare free max context is 262K, not 10M. Chutes has no free slice. Mixtral 8x7B is retired from Mistral’s API. xAI has no standing free list.
- 2026-09-02: Live check (2 Sep): NVIDIA `/v1/models` is 82 (UI catalog ~102), not 126, and `z-ai/glm-5.2` is gone. OpenCode Zen docs price 6 models as Free, not 12. Ollama Cloud lists 19 models and bills monthly starter credits — session/weekly limits are retired. Chutes `/v1/models` is 14 priced TEE ids with no R1 and no Llama. LLM7 anonymous is 10 RPM on 5 `turbo` chat ids. Hugging Face is $0.10/month across the router (~135 ids), not “7 free models”.
- 2026-09-02: OVH AI Endpoints catalog (`catalog.endpoints.ai.ovh.net/rest/v1/models_v2`) prices 7 models at €0: Riva TTS EN/DE/ES/IT, Qwen3Guard-Gen 0.6B/8B, Stable Diffusion XL. Chat weights (Llama 3.3 70B, GPT-OSS, Qwen 3.5/3.6) are PAYG with a key; anonymous stays 2 req/min. Five catalog ids are `available: false`.
- 2026-09-02: Inference.net is a new hosted API. Free plan is 30 RPM, no card, 1M Gateway requests/month (BYOK). Live `/v1/models` is 58 serverless ids, all priced; billed per token against account credits (402 when empty). Do not invent a signup credit dollar amount — official pricing does not publish one. Example id `glm-5.2`.
- 2026-09-02: AMD Radeon Cloud Token Factory (`developer.amd.com.cn/radeon/tokenfactory`) exposes 5 Public Free Model APIs. Daily quota is $10 USD ≈ 10M–111M tokens, resets daily. Shared ids: DeepSeek-V4-Flash-0731, DeepSeek-V4-Flash-Vision-Exp (Limited Free), Qwen3.8-Flash-Next, MiniCPM-V46, MiniCPM5-1B. Dedicated cards on the same page spend compute credits. Base `https://developer.amd.com.cn/radeon/api/v1`.
- 2026-09-02: Requesty is a new hosted gateway. Free tier is 200 requests/day and 20/min on the $0 models, no card, shared across the free pool. Live `router.requesty.ai/v1/models` has 12 ids at $0 (docs table lists 9). Base `https://router.requesty.ai/v1`. Example `nvidia/nemotron-3-super-120b-a12b`. The 600+ catalogue is PAYG + 5%.
- 2026-09-02: Includes chips name the weight a host actually serves. Groq’s free Qwen ids are `qwen/qwen3.8-27b` and `qwen/qwen3.6-27b`, not the `qwen3` family bucket. Cloudflare’s free long window is `@cf/qwen/qwen3.8-27b`. Keep the family slug for hosts that mix Qwen 3 sizes.
- 2026-09-02: Featured chips on hosted APIs use the exact SKU, not the family bucket. AMD’s Qwen is `Qwen3.8-Flash-Next`, not “Qwen 3”. New slugs for Flash-Next, V4 Flash, GLM 4.7 Flash, Qwen 3.7 Plus, Qwen 3 8B, Nemotron 3 Super, Mistral Small, Gemma 4 31B. Family slugs stay on local runtimes and mixed routers. A `family` field still lists the host on the parent `/model/` page.
- 2026-09-02: No hosted API chip may say “Qwen 3”. Cloudflare’s second Qwen is `@cf/qwen/qwen3-30b-a3b-fp8` (30B-A3B), not a family bucket. Hugging Face and ModelScope feature Qwen 3.8 27B. Ollama Cloud’s Qwen is `qwen3.5:397b`. Nebius’s live catalog has no Qwen.
- 2026-09-02: Homepage Includes chips are the same catalogue as the provider page, not a stale featured subset. GPT-OSS 120B and Qwen 3.8 27B are pinned first when the host serves them; the existing overflow script hides the rest behind …. Groq’s seven free ids include Safeguard 20B and Compound Mini. Kimi is not on Groq.
- 2026-09-02: The provider detail page lists the full free catalog (id + name). Featured `resource.models` stay as table chips only. Ids that match a MODELS slug link through; the rest are display-only so the featured set stays small. Local runtimes keep the family chips — they do not offer a fixed hosted list.
- 2026-09-02: Signup is the gate to call the free tier: `none`, `email`, `phone` or `card`. The old `registration` value is `email`. Phone is NVIDIA NIM, ModelScope, SiliconFlow, Zhipu on `bigmodel.cn`, and Alibaba Model Studio. Card is Cerebras and Nebius. Kilo’s `:free` models answer without a key.
- 2026-09-02: Cerebras grants $5 once at signup, not a $5/30-day trial. A payment method still unlocks the credit. After the five dollars you buy more. Rate limits on that credit stay 5 RPM / 1M TPD.
