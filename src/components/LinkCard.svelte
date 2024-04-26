<script>
  export let title;
  export let link;
  export let desc;
</script>

<div class="rounded-lg p-4 bg-white shadow hover:shadow-xl transition-shadow duration-300 ease-in-out">
  <a href={link} class="text-xl font-medium no-underline hover:cursor-pointer">
    <h3 class="text-lg text-black hover:text-brand">{title}</h3>
		<p class="text-base font-normal no-underline text-gray">
    	{desc}
  	</p>
  </a>
</div>