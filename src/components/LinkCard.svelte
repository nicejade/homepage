<script>
  import { onMount } from 'svelte'
  import AnchorJS from 'anchor-js';

	export let link;
  export let title;
  export let desc;
  export let stars = 0;
  export let declining = false;
  let isDarkMode = false

  onMount(() => {
    const anchors = new AnchorJS();
    anchors.options.visible = 'always';
    anchors.add('h2');

    isDarkMode = localStorage.getItem('starlight-theme') === 'dark'

    const observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          isDarkMode = mutation.target.getAttribute('data-theme') === 'dark';
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    // 清理函数，当组件销毁时停止观察
    return () => {
      observer.disconnect();
    };
	})
</script>

<div class="rounded-lg p-5 transition-shadow duration-150 ease-in-out relative 
  { isDarkMode ? "shadow-custom-dark hover:shadow-custom-dark-xl" : "shadow-custom-white hover:shadow-custom-white-xl" }
  { declining ? 'cursor-not-allowed opacity-60' : '' }">
  <a href="{declining ? 'javascript:void(0)' : link + '?ref=niceshare.site'}" target="_blank" rel="noopener"
    class="text-xl font-medium no-underline hover:cursor-pointer
    { declining? 'pointer-events-none' : '' }">
    <h3 class="text-base text-black hover:text-brand">{title}</h3>
		<p class="text-sm font-normal no-underline text-gray">
    	{desc}
  	</p>
    <div class="flex flex-row absolute items-center justify-center top-0 right-2 !mt-1">
      {#if stars && stars > 0}
        {#each Array(Math.min(stars, 5)) as _, i}
          <svg class="w-4 h-4 !mt-0 text-yellow-300 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.52 1.52 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.52 1.52 0 0 0 .387-1.575"/></svg>
        {/each}
      {/if}
    </div>
  </a>
</div>