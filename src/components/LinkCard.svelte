<script>
	export let link;
  export let title;
  export let desc;
</script>

<div class="rounded-lg p-4 shadow-custom hover:shadow-custom-xl transition-shadow duration-300 ease-in-out">
  <a href="{link + '?ref=niceshare.site'}" target="_blank" rel="noopener"
    class="text-xl font-medium no-underline hover:cursor-pointer">
    <h3 class="text-base text-black hover:text-brand">{title}</h3>
		<p class="text-sm font-normal no-underline text-gray">
    	{desc}
  	</p>
  </a>
</div>