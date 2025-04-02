<script>
	export let href;
  export let title;
  
  // 添加 GA4 点击事件埋点函数
  function traceEventReporting() {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'navigation_click', {
        'navigation_path': href,
        'navigation_title': title
      });
    }
  }
</script>

<a title={title} href={href} on:click={traceEventReporting}
  class="nav-link py-2 px-5 me-3 mb-3 text-sm font-medium focus:outline-none bg-transparent rounded-full 
  border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-0 md:px-4 md:py-1.5 md:me-2">
  {title}
</a>

<style>
.nav-link {
  color: var(--sl-color-text-accent);
}
.nav-link:hover {
  cursor: pointer;
  animation: jelly 0.5s;
  color: #ff6f61;
}

@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>