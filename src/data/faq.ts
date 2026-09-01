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
			'Every provider on this page works without one. Groq gives the most room — 14,400 requests a day on nothing but an email address — and LLM7.io needs no account at all. NVIDIA NIM asks for a phone number, never a card.'
	},
	{
		question: 'Which free tier has the highest limits?',
		answer:
			'By requests, Groq at 14,400 a day. By tokens, Cerebras at a million a day. By context, Cloudflare Workers AI at 10M. There is no single winner, which is why the table above sorts.'
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
