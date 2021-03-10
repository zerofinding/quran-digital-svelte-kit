<script>
	import Footer from '$components/Footer.svelte';

  import { page } from '$app/stores';

	import store from '../stores.js';
</script>

<svelte:head>
  <title>{$store.title}</title>
</svelte:head>

<main>
{#key $page.path}
	<slot />
{/key}
  <Footer />
</main>


<style>
	main {
		display: block;
		margin: 0 auto;
		padding: 1rem;
		text-align: center;
	}
</style>
