import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import sitemap from '@astrojs/sitemap'
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
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
			i18n: {
				defaultLocale: 'zh-CN',
				locales: {
					'zh-CN': 'zh-CN',
				},
			},
		}),
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
						crossorigin: 'anonymous',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://pagead2.googlesyndication.com',
						crossorigin: 'anonymous',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'dns-prefetch',
						href: 'https://www.google-analytics.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'dns-prefetch',
						href: 'https://fonts.googleapis.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'dns-prefetch',
						href: 'https://fonts.gstatic.com',
					},
				},
				// 预加载关键资源
				{
					tag: 'link',
					attrs: {
						rel: 'preload',
						href: '/logo.png',
						as: 'image',
						type: 'image/png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preload',
						href: '/favicon.svg',
						as: 'image',
						type: 'image/svg+xml',
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
				// License
				{
					tag: 'link',
					attrs: {
						rel: 'license',
						href: 'https://github.com/nicejade/homepage/blob/main/LICENSE',
					},
				},
				// Security Policy
				{
					tag: 'link',
					attrs: {
						rel: 'security',
						type: 'text/plain',
						href: '/.well-known/security.txt',
					},
				},
				// RSS Feed
				{
					tag: 'link',
					attrs: {
						rel: 'alternate',
						type: 'application/rss+xml',
						title: '逍遥自在轩 RSS Feed',
						href: '/feed.xml',
					},
				},
				// Atom Feed
				{
					tag: 'link',
					attrs: {
						rel: 'alternate',
						type: 'application/atom+xml',
						title: '逍遥自在轩 Atom Feed',
						href: '/feed.xml',
					},
				},
				// 语言标签 - 国际化支持
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
						hreflang: 'zh',
						href: 'https://www.niceshare.site/',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'alternate',
						hreflang: 'zh-Hans',
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
				{
					tag: 'meta',
					attrs: {
						'http-equiv': 'content-language',
						content: 'zh-CN',
					},
				},
				// 基础 SEO Meta 标签
				{
					tag: 'meta',
					attrs: {
						name: 'description',
						content: '逍遥自在轩，采用 Astro, Starlight, Svelte, Markdown, MDX，TailwindCSS 所构建的个人主页，它快速、易用、易于访问、高度可定制；用于汇集生活和工作中频繁使用的工具、软件和服务。涵盖 AI 工具、编程开发、文档资源、在线服务等精选推荐。',
					},
				},
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
						content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'google',
						content: 'notranslate',
					},
				},
				// 注意：Google 验证已通过 DNS CNAME 方式完成，无需 meta 标签
				{
					tag: 'meta',
					attrs: {
						name: 'keywords',
						content: '导航网站,逍遥自在轩,工具导航,AI工具,ChatGPT,人工智能工具,在线工具,开发工具,编程资源,前端开发,后端开发,全栈开发,Web开发,软件推荐,技术博客,开源项目,云服务,文档工具,Markdown,MDX,Astro,Starlight,Svelte,TailwindCSS,TypeScript,工作效率,生产力工具,学习资源,技术分享,代码工具,API工具,测试工具,设计工具,在线服务,云上服务,自托管,Docker,Kubernetes,DevOps,CI/CD,版本控制,Git,GitHub,VSCode,IDE工具,命令行工具,终端工具,数据库工具,SEO工具,性能优化,网站分析,Google Analytics',
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
					tag: 'meta',
					attrs: {
						name: 'rating',
						content: 'general',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'distribution',
						content: 'global',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'coverage',
						content: 'worldwide',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'target',
						content: 'all',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'audience',
						content: 'all',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'geo.region',
						content: 'CN',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'geo.placename',
						content: 'China',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'referrer',
						content: 'strict-origin-when-cross-origin',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'color-scheme',
						content: 'light dark',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'creator',
						content: '逍遥自在轩',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'publisher',
						content: '逍遥自在轩',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'abstract',
						content: '精选工具与资源导航平台，汇集 AI 工具、开发资源、在线服务等优质内容',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'category',
						content: 'technology, tools, resources, navigation',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'classification',
						content: 'Web Tools Directory',
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
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:domain',
						content: 'www.niceshare.site',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:url',
						content: 'https://www.niceshare.site/',
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
						property: 'og:updated_time',
						content: new Date().toISOString(),
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:see_also',
						content: 'https://fine.niceshare.site/',
					},
				},
				// LinkedIn 专用标签
				{
					tag: 'meta',
					attrs: {
						property: 'og:video',
						content: '',
					},
				},
				// Pinterest 验证和优化
				{
					tag: 'meta',
					attrs: {
						name: 'pinterest',
						content: 'nopin',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'pinterest-rich-pin',
						content: 'false',
					},
				},
				// Telegram 分享优化
				{
					tag: 'meta',
					attrs: {
						property: 'telegram:channel',
						content: '@nicejade',
					},
				},
				// WhatsApp 分享优化
				{
					tag: 'meta',
					attrs: {
						property: 'og:phone_number',
						content: '',
					},
				},
				// Facebook App ID（如果有）
				{
					tag: 'meta',
					attrs: {
						property: 'fb:app_id',
						content: 'your-facebook-app-id',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'fb:admins',
						content: 'your-facebook-admin-id',
					},
				},
				// Dublin Core Meta 标签（适用于学术和图书馆系统）
				{
					tag: 'meta',
					attrs: {
						name: 'DC.title',
						content: '逍遥自在轩 | 个人主页',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.creator',
						content: '逍遥自在轩',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.subject',
						content: '工具导航, AI工具, 编程开发, 在线服务, 资源分享',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.description',
						content: '逍遥自在轩，采用 Astro, Starlight, Svelte 构建的个人主页，汇集优质工具与服务',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.publisher',
						content: '逍遥自在轩',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.date',
						content: '2024-11-03',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.type',
						content: 'Text',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.format',
						content: 'text/html',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.identifier',
						content: 'https://www.niceshare.site/',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.language',
						content: 'zh-CN',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.coverage',
						content: 'World',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'DC.rights',
						content: 'Copyright 2024-present 逍遥自在轩. All rights reserved.',
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
						name: 'apple-touch-fullscreen',
						content: 'yes',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'apple-itunes-app',
						content: 'app-id=your-app-id, app-argument=https://www.niceshare.site/',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-startup-image',
						href: '/apple-touch-icon.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'mask-icon',
						href: '/safari-pinned-tab.svg',
						color: '#f59e0b',
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
						name: 'viewport',
						content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, viewport-fit=cover',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'HandheldFriendly',
						content: 'true',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'MobileOptimized',
						content: '375',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'screen-orientation',
						content: 'portrait',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'full-screen',
						content: 'yes',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'browsermode',
						content: 'application',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'nightmode',
						content: 'enable',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'layoutmode',
						content: 'fitscreen',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'imagemode',
						content: 'force',
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
				// 结构化数据 - WebApplication/SoftwareApplication
				{
					tag: 'script',
					attrs: {
						type: 'application/ld+json',
					},
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebApplication",
						"@id": "https://www.niceshare.site/#webapp",
						"name": "逍遥自在轩",
						"applicationCategory": "Utility",
						"applicationSubCategory": "Web Tools Directory",
						"operatingSystem": "Any",
						"browserRequirements": "Requires JavaScript, Supports modern browsers",
						"url": "https://www.niceshare.site/",
						"description": "精选工具与资源导航平台",
						"offers": {
							"@type": "Offer",
							"price": "0",
							"priceCurrency": "CNY"
						},
						"author": {
							"@type": "Person",
							"name": "逍遥自在轩"
						}
					}),
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
					content: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-M6N39DH483', {'anonymize_ip': true, 'cookie_flags': 'SameSite=None;Secure', 'send_page_view': true, 'allow_google_signals': true, 'allow_ad_personalization_signals': false});"
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
						"alternateName": ["清风明月轩", "NiceShare"],
						"url": "https://www.niceshare.site/",
						"description": "逍遥自在轩，采用 Astro, Starlight, Svelte, Markdown, MDX，TailwindCSS 所构建的个人主页，它快速、易用、易于访问、高度可定制；用于汇集生活和工作中频繁使用的工具、软件和服务。",
						"inLanguage": "zh-CN",
						"copyrightYear": 2024,
						"copyrightHolder": {
							"@type": "Person",
							"name": "逍遥自在轩"
						},
						"author": {
							"@type": "Person",
							"name": "逍遥自在轩",
							"url": "https://www.niceshare.site/"
						},
						"publisher": {
							"@type": "Person",
							"name": "逍遥自在轩",
							"logo": {
								"@type": "ImageObject",
								"url": "https://www.niceshare.site/logo.png",
								"width": 512,
								"height": 512
							}
						},
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
				// 结构化数据 - Person/ProfilePage
				{
					tag: 'script',
					attrs: {
						type: 'application/ld+json',
					},
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Person",
						"@id": "https://www.niceshare.site/#person",
						"name": "逍遥自在轩",
						"url": "https://www.niceshare.site/",
						"logo": "https://www.niceshare.site/logo.png",
						"image": {
							"@type": "ImageObject",
							"url": "https://www.niceshare.site/mockup.png",
							"width": 1200,
							"height": 676
						},
						"description": "逍遥自在轩，采用 Astro, Starlight, Svelte, Markdown, MDX，TailwindCSS 所构建的个人主页，用于汇集优质工具、软件和服务。",
						"knowsAbout": ["Web Development", "AI Tools", "Open Source", "Software Development", "Technology"],
						"sameAs": [
							"https://mastodon.social/@nicejade",
							"https://t.me/nicejade",
							"https://www.youtube.com/@MarshalXuan",
							"https://www.facebook.com/nice.jade.yang",
							"https://x.com/MarshalXuan",
							"https://github.com/nicejade"
						],
						"mainEntityOfPage": {
							"@type": "WebPage",
							"@id": "https://www.niceshare.site/"
						}
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
				// 结构化数据 - CollectionPage（导航网站）
				{
					tag: 'script',
					attrs: {
						type: 'application/ld+json',
					},
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "CollectionPage",
						"@id": "https://www.niceshare.site/#collectionpage",
						"name": "逍遥自在轩 - 精选工具与资源导航",
						"description": "汇集优质的 AI 工具、编程开发资源、在线服务、文档构建工具等精选内容",
						"url": "https://www.niceshare.site/",
						"inLanguage": "zh-CN",
						"isPartOf": {
							"@type": "WebSite",
							"url": "https://www.niceshare.site/"
						},
						"about": {
							"@type": "Thing",
							"name": "Web Development Tools and Resources"
						},
						"keywords": ["AI工具", "编程开发", "在线服务", "工具导航", "资源分享", "开发工具", "前端开发", "后端开发"]
					}),
				},
				// 结构化数据 - ItemList（工具列表）
				{
					tag: 'script',
					attrs: {
						type: 'application/ld+json',
					},
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "ItemList",
						"@id": "https://www.niceshare.site/#itemlist",
						"name": "精选工具与服务列表",
						"description": "逍遥自在轩收录的优质工具和服务",
						"numberOfItems": 100,
						"itemListElement": [
							{
								"@type": "ListItem",
								"position": 1,
								"name": "AI 工具",
								"description": "人工智能相关工具和服务"
							},
							{
								"@type": "ListItem",
								"position": 2,
								"name": "编程开发",
								"description": "开发工具和编程资源"
							},
							{
								"@type": "ListItem",
								"position": 3,
								"name": "在线服务",
								"description": "实用的在线服务和工具"
							}
						]
					}),
				},
				// 结构化数据 - FAQPage
				{
					tag: 'script',
					attrs: {
						type: 'application/ld+json',
					},
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "FAQPage",
						"@id": "https://www.niceshare.site/#faq",
						"mainEntity": [
							{
								"@type": "Question",
								"name": "逍遥自在轩是什么？",
								"acceptedAnswer": {
									"@type": "Answer",
									"text": "逍遥自在轩是一个个人主页和工具导航网站，采用 Astro、Starlight、Svelte、TailwindCSS 等现代技术构建，用于汇集生活和工作中频繁使用的工具、软件和服务。"
								}
							},
							{
								"@type": "Question",
								"name": "网站包含哪些类型的资源？",
								"acceptedAnswer": {
									"@type": "Answer",
									"text": "网站包含 AI 工具、编程开发资源、在线服务、文档构建工具、前端后端开发工具、云服务、搜索引擎、社交媒体等多种类型的精选资源。"
								}
							},
							{
								"@type": "Question",
								"name": "如何使用这个网站？",
								"acceptedAnswer": {
									"@type": "Answer",
									"text": "您可以通过导航菜单浏览不同分类的工具和服务，点击感兴趣的链接即可访问相应的资源。网站支持快速搜索和分类浏览。"
								}
							}
						]
					}),
				},
			],
		}),
	],
	vite: { plugins: [tailwindcss()] },
})