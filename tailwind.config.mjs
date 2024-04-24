/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

const selfCustomColors = {
	brand: {
		DEFAULT: '#415fff',
	},
	black: {
		DEFAULT: '#212121',
	},
	gray: {
		DEFAULT: '#bdc3c7',
	},
	silver: {
		DEFAULT: '#ececec',
	},
	warn: {
		DEFAULT: '#f59e0b',
	},
	link: {
		DEFAULT: '#0ea5e9',
	},
}

export default {
	mode: 'jit',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	purge: {
		enabled: true,
		content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite/**/*.js'],
	},
	theme: {
		screens: {
			lg: { max: '2560px' },
			sm: { max: '640px' },
			md: { max: '768px' },
			tiny: { min: '768px' },
		},
		colors: { ...colors, ...selfCustomColors },
		extend: {},
	},
	plugins: [],
}