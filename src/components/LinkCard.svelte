<script>
  import { onMount } from 'svelte'
  import AnchorJS from 'anchor-js';

	export let link;
  export let title;
  export let desc;
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

<div class="rounded-lg p-4 transition-shadow duration-150 ease-in-out 
  { isDarkMode ? "shadow-custom-dark hover:shadow-custom-dark-xl" : "shadow-custom-white hover:shadow-custom-white-xl" }">
  <a href="{link + '?ref=niceshare.site'}" target="_blank" rel="noopener"
    class="text-xl font-medium no-underline hover:cursor-pointer">
    <h3 class="text-base text-black hover:text-brand">{title}</h3>
		<p class="text-sm font-normal no-underline text-gray">
    	{desc}
  	</p>
  </a>
</div>