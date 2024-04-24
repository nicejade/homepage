import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import starlightLinksValidator from 'starlight-links-validator'

// https://astro.build/config
export default defineConfig({
	server: {
		port: 6969,
		host: true,
	},
	site: 'https://niceshare.site/',
	integrations: [
		svelte(),
		starlight({
			plugins: [starlightLinksValidator()],
			title: '逍遥自在轩',
			social: {
				github: 'https://github.com/nicejade/fine.niceshare.site',
				mastodon: 'https://mastodon.social/@nicejade',
				'x.com': 'https://x.com/nicejadeyang',
			},
			components: {
        // Override the default `MarkdownContent` component.
        MarkdownContent: './src/components/MarkdownContent.astro',
      },
			logo: {
				src: './src/assets/images/logo.svg',
			},
			lastUpdated: false,
			pagination: false,
			defaultLocale: 'root',
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
			customCss: [
				'./src/assets/styles/tailwind.css',
				// 你的自定义 CSS 文件的相对路径
				'./src/assets/styles/custom.css',
			],
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-icon',
						sizes: '180x180',
						href: '/apple-touch-icon.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						sizes: '32x32',
						href: '/favicon-32x32.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						sizes: '16x16',
						href: '/favicon-16x16.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						manifest: '/site.webmanifest',
						re: 'manifest',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#ffffff',
					},
				},
				{
          tag: 'script',
          attrs: {
            src: 'https://www.googletagmanager.com/gtag/js?id=G-M6N39DH483',
						'id': 'G-M6N39DH483',
            defer: true,
					},
				},
				{
          tag: 'script',
					content: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-M6N39DH483');"
				},
				{
					tag: 'script',
					attrs: {
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8586652723015758',
            defer: true,
					},
				},
			],
		}),
		tailwind(),
	],
})