export interface FaqEntry {
	question: string
	answer: string
}

/**
 * Answers stay short and specific — the long version lives on each provider
 * page. These also feed the FAQPage JSON-LD emitted by the homepage.
 */
export const FAQ: FaqEntry[] = [
	{
		question: 'Is there a free AI API that needs no credit card?',
		answer:
			'Most providers on this page work without one. Google AI Studio gives 1,500 Gemini requests a day on an email. Groq is the fastest on 1,000 a day. LLM7.io and Kilo’s :free models need no account at all. NVIDIA NIM, ModelScope, SiliconFlow, Zhipu and Alibaba ask for a phone number, never a card. Cerebras and Nebius want a payment method for their trial credit.'
	},
	{
		question: 'Which free tier has the highest limits?',
		answer:
			'By requests, Google AI Studio at 1,500 a day, or NVIDIA NIM at 40 a minute with no published daily cap. By tokens, Cerebras at a million a day on its trial. By context, Gemini, NIM and DeepSeek V4 at 1M. There is no single winner, which is why the table above sorts.'
	},
	{
		question: 'Can I ship something to production on a free tier?',
		answer:
			'Rarely. Most of these are evaluation tiers with no uptime promise, and several forbid production outright. Prototype on them, then price the paid tier before you launch.'
	},
	{
		question: 'What does OpenAI-compatible actually mean?',
		answer:
			'The provider accepts the same request shape as the OpenAI SDK, so you swap two lines — the base URL and the key — and the rest of your code is unchanged. Almost everything listed here is.'
	},
	{
		question: 'Do I need a GPU to run a model locally?',
		answer:
			'No. llama.cpp and GPT4All run 7B models on an ordinary laptop CPU, and any recent Mac runs them well through MLX. A GPU buys speed, not access.'
	},
	{
		question: 'Do free providers train on what I send them?',
		answer:
			'Some do — Google says so plainly for the free Gemini tier. Assume free means your prompts are fair game unless the provider states otherwise, and keep anything confidential on a local runtime.'
	}
]
