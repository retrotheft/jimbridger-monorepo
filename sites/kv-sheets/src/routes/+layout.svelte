<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css'

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
   <nav>
      <a href="/">Home</a>
   </nav>
</header>

<svelte:boundary>
   {@render children()}

   {#snippet pending()}
      Pending...
   {/snippet}
   {#snippet failed(error, reset)}
      An unexpected error occurred. {error}
      <button onclick={reset}>Try again</button>
   {/snippet}
</svelte:boundary>
