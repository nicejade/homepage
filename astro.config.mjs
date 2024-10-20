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
	site: 'https://www.niceshare.site/',
	integrations: [
		svelte(),
		starlight({
			plugins: [starlightLinksValidator()],
			title: '逍遥自在轩',
			social: {
				github: 'https://github.com/nicejade/homepage',
				'x.com': 'https://x.com/MarshalXuan',
				mastodon: 'https://mastodon.social/@nicejade',
			},
			components: {
        // Override the default `MarkdownContent` component.
				MarkdownContent: './src/components/MarkdownContent.astro',
				LinkCard: './src/components/LinkCard.svelte',
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
						name: 'twitter:card',
						content: 'summary_large_image',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: 'https://lovejade.oss-cn-shenzhen.aliyuncs.com/逍遥自在轩.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:title',
						content: '逍遥自在轩 | 个人主页',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:description',
						content: '逍遥自在轩，采用 Astro, Starlight, Svelte, Markdown, MDX，TailwindCSS 所构建的个人主页，它快速、易用、易于访问、高度可定制；用于汇集生活和工作中频繁使用的工具、软件和服务。',
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
					tag: 'meta',
					attrs: {
						name: 'google-adsense-account',
						content: 'ca-pub-8586652723015758',
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