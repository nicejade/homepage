<script>
	export let href;
  export let title;
</script>

<a href={href} title={title} 
  class="nav-link py-2 px-5 me-3 mb-3 text-sm font-medium text-gray-900 focus:outline-none bg-transparent rounded-full 
  border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 md:px-4 md:py-1.5 md:me-2">
  {title}
</a>

<style>
.nav-link:hover {
  cursor: pointer;
  animation: jelly 0.5s;
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