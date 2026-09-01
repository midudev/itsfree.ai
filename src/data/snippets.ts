import type { Provider } from './providers'

export interface Snippet {
	/** Tab label */
	label: string
	lang: 'ts' | 'python' | 'bash'
	/** Install line shown above the code, when there is one */
	install?: string
	code: string
}

const isLocal = (provider: Provider) => provider.baseUrl.startsWith('http://localhost')

function openaiTs(provider: Provider): Snippet {
	const key = isLocal(provider) ? `'not-needed'` : `process.env.${provider.envVar}`
	return {
		label: 'TypeScript',
		lang: 'ts',
		install: 'npm install openai',
		code: `import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: '${provider.baseUrl}',
  apiKey: ${key}
})

const response = await client.chat.completions.create({
  model: '${provider.exampleModel}',
  messages: [{ role: 'user', content: 'Explain closures in one paragraph.' }]
})

console.log(response.choices[0].message.content)`
	}
}

function openaiPy(provider: Provider): Snippet {
	const key = isLocal(provider)
		? `"not-needed"`
		: `os.environ["${provider.envVar}"]`
	const importOs = isLocal(provider) ? '' : 'import os\n'
	return {
		label: 'Python',
		lang: 'python',
		install: 'pip install openai',
		code: `${importOs}from openai import OpenAI

client = OpenAI(
    base_url="${provider.baseUrl}",
    api_key=${key},
)

response = client.chat.completions.create(
    model="${provider.exampleModel}",
    messages=[{"role": "user", "content": "Explain closures in one paragraph."}],
)

print(response.choices[0].message.content)`
	}
}

function curl(provider: Provider): Snippet {
	const auth = isLocal(provider)
		? ''
		: `  -H "Authorization: Bearer $${provider.envVar}" \\\n`
	return {
		label: 'curl',
		lang: 'bash',
		code: `curl ${provider.baseUrl}/chat/completions \\
  -H "Content-Type: application/json" \\
${auth}  -d '{
    "model": "${provider.exampleModel}",
    "messages": [{"role": "user", "content": "Explain closures in one paragraph."}]
  }'`
	}
}

/** Native SDK examples, keyed by the sdk.id set in src/data/providers.ts */
const NATIVE: Record<string, (provider: Provider) => Snippet[]> = {
	'google-genai': (provider) => [
		{
			label: 'TypeScript · SDK',
			lang: 'ts',
			install: 'npm install @google/genai',
			code: `import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.${provider.envVar} })

const response = await ai.models.generateContent({
  model: '${provider.exampleModel}',
  contents: 'Explain closures in one paragraph.'
})

console.log(response.text)`
		},
		{
			label: 'Python · SDK',
			lang: 'python',
			install: 'pip install google-genai',
			code: `import os
from google import genai

client = genai.Client(api_key=os.environ["${provider.envVar}"])

response = client.models.generate_content(
    model="${provider.exampleModel}",
    contents="Explain closures in one paragraph.",
)

print(response.text)`
		}
	],
	groq: (provider) => [
		{
			label: 'TypeScript · SDK',
			lang: 'ts',
			install: 'npm install groq-sdk',
			code: `import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.${provider.envVar} })

const response = await groq.chat.completions.create({
  model: '${provider.exampleModel}',
  messages: [{ role: 'user', content: 'Explain closures in one paragraph.' }]
})

console.log(response.choices[0].message.content)`
		},
		{
			label: 'Python · SDK',
			lang: 'python',
			install: 'pip install groq',
			code: `import os
from groq import Groq

client = Groq(api_key=os.environ["${provider.envVar}"])

response = client.chat.completions.create(
    model="${provider.exampleModel}",
    messages=[{"role": "user", "content": "Explain closures in one paragraph."}],
)

print(response.choices[0].message.content)`
		}
	],
	mistral: (provider) => [
		{
			label: 'TypeScript · SDK',
			lang: 'ts',
			install: 'npm install @mistralai/mistralai',
			code: `import { Mistral } from '@mistralai/mistralai'

const client = new Mistral({ apiKey: process.env.${provider.envVar} })

const response = await client.chat.complete({
  model: '${provider.exampleModel}',
  messages: [{ role: 'user', content: 'Explain closures in one paragraph.' }]
})

console.log(response.choices[0].message.content)`
		},
		{
			label: 'Python · SDK',
			lang: 'python',
			install: 'pip install mistralai',
			code: `import os
from mistralai import Mistral

client = Mistral(api_key=os.environ["${provider.envVar}"])

response = client.chat.complete(
    model="${provider.exampleModel}",
    messages=[{"role": "user", "content": "Explain closures in one paragraph."}],
)

print(response.choices[0].message.content)`
		}
	],
	cohere: (provider) => [
		{
			label: 'TypeScript · SDK',
			lang: 'ts',
			install: 'npm install cohere-ai',
			code: `import { CohereClientV2 } from 'cohere-ai'

const cohere = new CohereClientV2({ token: process.env.${provider.envVar} })

const response = await cohere.chat({
  model: '${provider.exampleModel}',
  messages: [{ role: 'user', content: 'Explain closures in one paragraph.' }]
})

console.log(response.message.content?.[0].text)`
		},
		{
			label: 'Python · SDK',
			lang: 'python',
			install: 'pip install cohere',
			code: `import os
import cohere

client = cohere.ClientV2(api_key=os.environ["${provider.envVar}"])

response = client.chat(
    model="${provider.exampleModel}",
    messages=[{"role": "user", "content": "Explain closures in one paragraph."}],
)

print(response.message.content[0].text)`
		}
	],
	huggingface: (provider) => [
		{
			label: 'TypeScript · SDK',
			lang: 'ts',
			install: 'npm install @huggingface/inference',
			code: `import { InferenceClient } from '@huggingface/inference'

const client = new InferenceClient(process.env.${provider.envVar})

const response = await client.chatCompletion({
  model: '${provider.exampleModel}',
  messages: [{ role: 'user', content: 'Explain closures in one paragraph.' }]
})

console.log(response.choices[0].message.content)`
		},
		{
			label: 'Python · SDK',
			lang: 'python',
			install: 'pip install huggingface_hub',
			code: `import os
from huggingface_hub import InferenceClient

client = InferenceClient(token=os.environ["${provider.envVar}"])

response = client.chat_completion(
    model="${provider.exampleModel}",
    messages=[{"role": "user", "content": "Explain closures in one paragraph."}],
)

print(response.choices[0].message.content)`
		}
	],
	cerebras: (provider) => [
		{
			label: 'TypeScript · SDK',
			lang: 'ts',
			install: 'npm install @cerebras/cerebras_cloud_sdk',
			code: `import Cerebras from '@cerebras/cerebras_cloud_sdk'

const client = new Cerebras({ apiKey: process.env.${provider.envVar} })

const response = await client.chat.completions.create({
  model: '${provider.exampleModel}',
  messages: [{ role: 'user', content: 'Explain closures in one paragraph.' }]
})

console.log(response.choices[0].message.content)`
		},
		{
			label: 'Python · SDK',
			lang: 'python',
			install: 'pip install cerebras_cloud_sdk',
			code: `import os
from cerebras.cloud.sdk import Cerebras

client = Cerebras(api_key=os.environ["${provider.envVar}"])

response = client.chat.completions.create(
    model="${provider.exampleModel}",
    messages=[{"role": "user", "content": "Explain closures in one paragraph."}],
)

print(response.choices[0].message.content)`
		}
	],
	ollama: (provider) => [
		{
			label: 'TypeScript · SDK',
			lang: 'ts',
			install: 'npm install ollama',
			code: `import { Ollama } from 'ollama'

const ollama = new Ollama({ host: '${provider.baseUrl.replace(/\/v1$/, '')}' })

const response = await ollama.chat({
  model: '${provider.exampleModel}',
  messages: [{ role: 'user', content: 'Explain closures in one paragraph.' }]
})

console.log(response.message.content)`
		},
		{
			label: 'Python · SDK',
			lang: 'python',
			install: 'pip install ollama',
			code: `from ollama import Client

client = Client(host="${provider.baseUrl.replace(/\/v1$/, '')}")

response = client.chat(
    model="${provider.exampleModel}",
    messages=[{"role": "user", "content": "Explain closures in one paragraph."}],
)

print(response["message"]["content"])`
		}
	],
	dashscope: (provider) => [
		{
			label: 'Python · SDK',
			lang: 'python',
			install: 'pip install dashscope',
			code: `import os
import dashscope

dashscope.api_key = os.environ["${provider.envVar}"]
dashscope.base_http_api_url = "https://dashscope-intl.aliyuncs.com/api/v1"

response = dashscope.Generation.call(
    model="${provider.exampleModel}",
    messages=[{"role": "user", "content": "Explain closures in one paragraph."}],
    result_format="message",
)

print(response.output.choices[0].message.content)`
		}
	],
	ai21: (provider) => [
		{
			label: 'Python · SDK',
			lang: 'python',
			install: 'pip install ai21',
			code: `import os
from ai21 import AI21Client
from ai21.models.chat import ChatMessage

client = AI21Client(api_key=os.environ["${provider.envVar}"])

response = client.chat.completions.create(
    model="${provider.exampleModel}",
    messages=[ChatMessage(role="user", content="Explain closures in one paragraph.")],
)

print(response.choices[0].message.content)`
		}
	],
	mlx: (provider) => [
		{
			label: 'Python · mlx-lm',
			lang: 'python',
			install: 'pip install mlx-lm',
			code: `from mlx_lm import load, generate

model, tokenizer = load("${provider.exampleModel}")

prompt = tokenizer.apply_chat_template(
    [{"role": "user", "content": "Explain closures in one paragraph."}],
    add_generation_prompt=True,
)

print(generate(model, tokenizer, prompt=prompt, max_tokens=512))`
		}
	]
}

/** Every example for a provider: OpenAI-compatible first, native SDK after */
export function snippetsFor(provider: Provider): Snippet[] {
	const snippets: Snippet[] = []
	if (provider.openaiCompatible) {
		snippets.push(openaiTs(provider), openaiPy(provider), curl(provider))
	}
	if (provider.sdk && NATIVE[provider.sdk.id]) {
		snippets.push(...NATIVE[provider.sdk.id](provider))
	}
	return snippets
}

/** Shell line that sets the key, shown above the examples */
export function envLine(provider: Provider): string {
	return `export ${provider.envVar}="your-key-here"`
}

export { isLocal }
