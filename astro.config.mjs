import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import starlightLinksValidator from 'starlight-links-validator'
import starlightThemeRapide from 'starlight-theme-rapide'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	server: {
		port: 6969,
		host: true,
	},
	site: 'https://www.niceshare.site/',
	// 构建优化配置
	build: {
		inlineStylesheets: 'auto', // 自动内联小型 CSS
		assets: '_astro', // 统一资源目录
	},
	// 压缩配置
	compressHTML: true,
	// 图片优化
	image: {
		remotePatterns: [{ protocol: 'https' }],
		service: {
			entrypoint: 'astro/assets/services/sharp',
		},
	},
	// 预取配置 - 提升页面切换速度
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	integrations: [
		svelte(),
		starlight({
			plugins: [starlightLinksValidator(), starlightThemeRapide()],
			title: '逍遥自在轩',
			social: [
				{ icon: 'mastodon', label: 'Mastodon', href: 'https://mastodon.social/@nicejade' },
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/nicejade' },
				{ icon: 'external', label: '逍遥自在轩', href: 'https://fine.niceshare.site/' },
				{ icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@MarshalXuan' },
				{ icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/nice.jade.yang' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/MarshalXuan' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/nicejade/homepage' },
			],
			components: {
        // Override the default `MarkdownContent` component.
				MarkdownContent: './src/components/MarkdownContent.astro',
				LinkCard: './src/components/LinkCard.svelte',
      },
			logo: {
				src: './src/assets/images/logo.svg',
			},
			pagefind: false,
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
				// DNS 预解析和预连接 - 性能优化
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://www.googletagmanager.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://pagead2.googlesyndication.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'dns-prefetch',
						href: 'https://www.google-analytics.com',
					},
				},
				// Canonical URL
				{
					tag: 'link',
					attrs: {
						rel: 'canonical',
						href: 'https://www.niceshare.site/',
					},
				},
				// Humans.txt
				{
					tag: 'link',
					attrs: {
						rel: 'author',
						type: 'text/plain',
						href: '/humans.txt',
					},
				},
				// 语言标签
				{
					tag: 'link',
					attrs: {
						rel: 'alternate',
						hreflang: 'zh-CN',
						href: 'https://www.niceshare.site/',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'alternate',
						hreflang: 'x-default',
						href: 'https://www.niceshare.site/',
					},
				},
				// 基础 SEO Meta 标签
				{
					tag: 'meta',
					attrs: {
						name: 'robots',
						content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'googlebot',
						content: 'index, follow',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'keywords',
						content: '导航网站,逍遥自在轩,工具集合,软件推荐,生活服务,工作效率,人工智能,技能学习,文档构建,休闲娱乐,云上服务,在线服务,编码开发,前端开发,后台开发',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'author',
						content: '逍遥自在轩',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'language',
						content: 'zh-CN',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'revisit-after',
						content: '7 days',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'format-detection',
						content: 'telephone=no',
					},
				},
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
						href: '/manifest.json',
						rel: 'manifest',
					},
				},
				// Twitter Card Meta 标签
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
						name: 'twitter:site',
						content: '@MarshalXuan',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:creator',
						content: '@MarshalXuan',
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
						name: 'twitter:image',
						content: 'https://www.niceshare.site/mockup.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image:alt',
						content: '逍遥自在轩 - 个人主页预览图',
					},
				},
				// Open Graph Meta 标签 (使用 property 而非 name)
				{
					tag: 'meta',
					attrs: {
						property: 'og:type',
						content: 'website',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:url',
						content: 'https://www.niceshare.site/',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:site_name',
						content: '逍遥自在轩',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:title',
						content: '逍遥自在轩 | 个人主页',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:description',
						content: '逍遥自在轩，采用 Astro, Starlight, Svelte, Markdown, MDX，TailwindCSS 所构建的个人主页，它快速、易用、易于访问、高度可定制；用于汇集生活和工作中频繁使用的工具、软件和服务。',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://www.niceshare.site/mockup.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image:width',
						content: '1200',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image:height',
						content: '676',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image:alt',
						content: '逍遥自在轩 - 个人主页预览图',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:locale',
						content: 'zh_CN',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#f59e0b',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						media: '(prefers-color-scheme: dark)',
						content: '#1e293b',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'apple-mobile-web-app-capable',
						content: 'yes',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'apple-mobile-web-app-status-bar-style',
						content: 'black-translucent',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'apple-mobile-web-app-title',
						content: '逍遥自在轩',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'mobile-web-app-capable',
						content: 'yes',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'application-name',
						content: '逍遥自在轩',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'msapplication-TileColor',
						content: '#f59e0b',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'msapplication-TileImage',
						content: '/mstile-150x150.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'msapplication-config',
						content: '/browserconfig.xml',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'google-adsense-account',
						content: 'ca-pub-8586652723015758',
					},
				},
				// Google Analytics - 优化加载策略
				{
          tag: 'script',
          attrs: {
            src: 'https://www.googletagmanager.com/gtag/js?id=G-M6N39DH483',
						'id': 'G-M6N39DH483',
            async: true,
					},
				},
				{
          tag: 'script',
					content: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-M6N39DH483', {'anonymize_ip': true, 'cookie_flags': 'SameSite=None;Secure'});"
				},
				// Google AdSense
				{
					tag: 'script',
					attrs: {
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8586652723015758',
            async: true,
						crossorigin: 'anonymous',
					},
				},
				// 结构化数据 - WebSite
				{
					tag: 'script',
					attrs: {
						type: 'application/ld+json',
					},
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebSite",
						"name": "逍遥自在轩",
						"alternateName": "清风明月轩",
						"url": "https://www.niceshare.site/",
						"description": "逍遥自在轩，采用 Astro, Starlight, Svelte, Markdown, MDX，TailwindCSS 所构建的个人主页，它快速、易用、易于访问、高度可定制；用于汇集生活和工作中频繁使用的工具、软件和服务。",
						"inLanguage": "zh-CN",
						"potentialAction": {
							"@type": "SearchAction",
							"target": {
								"@type": "EntryPoint",
								"urlTemplate": "https://www.niceshare.site/?search={search_term_string}"
							},
							"query-input": "required name=search_term_string"
						}
					}),
				},
				// 结构化数据 - Organization
				{
					tag: 'script',
					attrs: {
						type: 'application/ld+json',
					},
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Person",
						"name": "逍遥自在轩",
						"url": "https://www.niceshare.site/",
						"logo": "https://www.niceshare.site/logo.png",
						"image": "https://www.niceshare.site/mockup.png",
						"description": "逍遥自在轩，采用 Astro, Starlight, Svelte, Markdown, MDX，TailwindCSS 所构建的个人主页。",
						"sameAs": [
							"https://mastodon.social/@nicejade",
							"https://t.me/nicejade",
							"https://www.youtube.com/@MarshalXuan",
							"https://www.facebook.com/nice.jade.yang",
							"https://x.com/MarshalXuan",
							"https://github.com/nicejade"
						]
					}),
				},
				// 结构化数据 - BreadcrumbList
				{
					tag: 'script',
					attrs: {
						type: 'application/ld+json',
					},
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						"itemListElement": [
							{
								"@type": "ListItem",
								"position": 1,
								"name": "首页",
								"item": "https://www.niceshare.site/"
							},
							{
								"@type": "ListItem",
								"position": 2,
								"name": "关于",
								"item": "https://www.niceshare.site/about"
							}
						]
					}),
				},
			],
		}),
	],
	vite: { plugins: [tailwindcss()] },
})