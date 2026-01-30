<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
   import '../app.css'
	import NavHeader from '$lib/components/NavHeader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
   <NavHeader />
</header>

{@render children()}
