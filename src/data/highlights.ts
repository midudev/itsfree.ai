/**
 * The rotating recommendation in the hero. Kept as its own short list rather
 * than derived from RESOURCES: the copy here is a pitch, not a description.
 */
export interface Highlight {
	/** Resource id, for the favicon and the provider page link */
	id: string
	name: string
	host: string
	why: string
	stat: string
	statLabel: string
	context: string
	cta: string
	href: string
}

export const HIGHLIGHTS: Highlight[] = [
	{
		id: 'groq',
		name: 'Groq',
		host: 'api.groq.com',
		why: 'The highest free ceiling that asks for nothing but an email — and the fastest tokens per second anyone gives away.',
		stat: '14,400',
		statLabel: 'requests / day',
		context: '262K',
		cta: 'Set it up',
		href: '/provider/groq/'
	},
	{
		id: 'google-ai-studio',
		name: 'Google AI Studio',
		host: 'aistudio.google.com',
		why: 'A million tokens of context on the free tier, and it reads images, audio and video as happily as text.',
		stat: '1,500',
		statLabel: 'requests / day',
		context: '1M',
		cta: 'Set it up',
		href: '/provider/google-ai-studio/'
	},
	{
		id: 'nvidia-nim',
		name: 'NVIDIA NIM',
		host: 'build.nvidia.com',
		why: 'The widest free catalogue anywhere: 126 open models, GLM and DeepSeek included. Phone number, no card.',
		stat: '126',
		statLabel: 'free models',
		context: '1M',
		cta: 'Set it up',
		href: '/provider/nvidia-nim/'
	},
	{
		id: 'ollama',
		name: 'Ollama',
		host: 'localhost:11434',
		why: 'No quota to run out of and no request leaving the laptop. One command and the model is yours.',
		stat: 'unlimited',
		statLabel: 'no rate limit',
		context: 'your RAM',
		cta: 'Set it up',
		href: '/provider/ollama/'
	},
	{
		id: 'cerebras',
		name: 'Cerebras',
		host: 'cloud.cerebras.ai',
		why: 'Wafer-scale silicon running GPT-OSS at thousands of tokens a second. Stingy on requests, absurdly fast to answer.',
		stat: '1M',
		statLabel: 'tokens / day',
		context: '131K',
		cta: 'Set it up',
		href: '/provider/cerebras/'
	}
]
