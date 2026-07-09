import { transform, browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'

const targets = browserslistToTargets(
	browserslist(['chrome >= 80', 'android >= 80', 'ios_saf >= 13', 'samsung >= 8']),
)

/** Remove @layer order declarations, e.g. `@layer base, utilities;` */
function removeLayerDeclarations(css) {
	return css.replace(/@layer\s+[^;{]+;/g, '')
}

/** Unwrap `@layer name { ... }` blocks while preserving inner rules. */
function unwrapLayerBlocks(css) {
	let result = css
	const layerStart = /@layer\s+[\w.-]+(?:\s*,\s*[\w.-]+)*\s*\{/g
	let match = layerStart.exec(result)

	while (match) {
		const start = match.index
		const openBrace = start + match[0].length - 1
		let depth = 1
		let i = openBrace + 1

		while (i < result.length && depth > 0) {
			if (result[i] === '{') depth++
			else if (result[i] === '}') depth--
			i++
		}

		const inner = result.slice(openBrace + 1, i - 1)
		result = result.slice(0, start) + inner + result.slice(i)
		layerStart.lastIndex = start
		match = layerStart.exec(result)
	}

	return result
}

async function downlevelCss(code) {
	const flattened = unwrapLayerBlocks(removeLayerDeclarations(code))

	const result = transform({
		filename: 'bundle.css',
		code: Buffer.from(flattened),
		minify: true,
		targets,
	})

	return result.code.toString()
}

/**
 * Downlevel Tailwind v4 output for older mobile browsers:
 * - flatten @layer (unsupported in Chrome < 99 on some Android WebViews)
 * - transpile static oklch()/color-mix() to RGB fallbacks where possible
 */
export function cssLegacyCompat() {
	return {
		name: 'css-legacy-compat',
		enforce: 'post',
		async generateBundle(_options, bundle) {
			for (const chunk of Object.values(bundle)) {
				if (chunk.type !== 'asset' || !chunk.fileName.endsWith('.css')) continue
				const source = typeof chunk.source === 'string' ? chunk.source : chunk.source.toString()
				chunk.source = await downlevelCss(source)
			}
		},
	}
}
