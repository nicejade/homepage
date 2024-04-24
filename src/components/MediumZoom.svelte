<script>
	import { onMount, tick } from 'svelte'
	import mediumZoom from 'medium-zoom'
	/**
	 * @desc：mediumZoom 涉及 DOM 操作，因此需要在 onMount 钩子中调用，以确保 DOM 已经渲染完毕；
	 * 同时，需要在使用处增加 client:only='svelte' 属性，以确保此组件只在客户端运行[保证构建]；
	 * @see：https://docs.astro.build/en/reference/directives-reference/#clientonly
	 * 为保证大多页面都能生效，选择重写 LastUpdated 组件，以确保大多页面无需额外注入，都能生效；
	 */
	onMount(async () => {
		await tick()
		mediumZoom('.sl-markdown-content img')
	})
</script>