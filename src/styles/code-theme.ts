import type { ThemeRegistration } from 'shiki'

const FG = '#ededed'
const COMMENT = '#8f8f8f'
const PUNCTUATION = '#a1a1a1'

/** Geist accent scale, at the steps that hold up on a near-black ground */
const BLUE = '#52a8ff'
const MAGENTA = '#ff4d94'
const PURPLE = '#a970ff'
const CYAN = '#50e3c2'
const AMBER = '#f5a623'

/**
 * Vercel's palette as a Shiki theme. Vercel publishes no Shiki theme of its
 * own, so this maps the Geist accent colours onto TextMate scopes:
 * magenta for keywords, cyan for strings, blue for calls, purple for types.
 */
export const vercelDark: ThemeRegistration = {
	name: 'vercel-dark',
	type: 'dark',
	colors: {
		'editor.background': '#0a0a0a',
		'editor.foreground': FG
	},
	settings: [
		{ settings: { background: '#0a0a0a', foreground: FG } },
		{
			scope: ['comment', 'punctuation.definition.comment'],
			settings: { foreground: COMMENT, fontStyle: 'italic' }
		},
		{
			scope: ['string', 'string.quoted', 'string.template', 'constant.other.symbol'],
			settings: { foreground: CYAN }
		},
		{
			scope: ['punctuation.definition.string'],
			settings: { foreground: CYAN }
		},
		{
			scope: ['constant.numeric', 'constant.language', 'constant.language.boolean'],
			settings: { foreground: AMBER }
		},
		{
			scope: [
				'keyword',
				'keyword.control',
				'keyword.operator.new',
				'keyword.operator.expression',
				'storage',
				'storage.type',
				'storage.modifier'
			],
			settings: { foreground: MAGENTA }
		},
		{
			scope: ['entity.name.tag', 'punctuation.definition.tag'],
			settings: { foreground: MAGENTA }
		},
		{
			scope: ['entity.name.function', 'support.function', 'meta.function-call.generic'],
			settings: { foreground: BLUE }
		},
		{
			scope: [
				'entity.name.type',
				'entity.name.class',
				'support.class',
				'support.type',
				'entity.other.inherited-class'
			],
			settings: { foreground: PURPLE }
		},
		{
			scope: ['entity.other.attribute-name', 'variable.language.this'],
			settings: { foreground: PURPLE }
		},
		{
			scope: ['variable', 'variable.other', 'variable.parameter', 'meta.object-literal.key'],
			settings: { foreground: FG }
		},
		{
			scope: ['support.type.property-name', 'variable.other.property'],
			settings: { foreground: FG }
		},
		{
			scope: ['keyword.operator', 'punctuation', 'meta.brace', 'punctuation.separator'],
			settings: { foreground: PUNCTUATION }
		}
	]
}
