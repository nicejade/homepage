/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

const selfCustomColors = {
	brand: {
		DEFAULT: '#2196f3',
	},
	black: {
		DEFAULT: '#212121',
	},
	grey: {
		DEFAULT: '#565656',
	},
	silver: {
		DEFAULT: '#ececec',
	},
	mark: {
		DEFAULT: '#ff6f61',
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
		extend: {
			boxShadow: {
				'custom-white': '8px 8px 20px 2px #ebebeb;',
				'custom-white-xl': '8px 8px 30px 6px #c3c3c3;',
				'custom-dark': '8px 8px 20px 2px #212121;',
				'custom-dark-xl': '8px 8px 20px 2px #363636;',
      }
		},
	},
	plugins: [],
}