<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css'

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
   <nav>
      <a href="/">Home</a>
   </nav>
   <ul>
      <li>server: <span class={data.kvMode}>{data.kvMode}</span></li>
   </ul>
</header>

<svelte:boundary>
   {@render children()}

   {#snippet pending()}
      Pending...
   {/snippet}
   {#snippet failed(error, reset)}
      {@const log = console.error(error)}
      An unexpected error occurred. {error}
      <button onclick={reset}>Try again</button>
   {/snippet}
</svelte:boundary>

<style>
   header {
      display: flex;
   }
   ul {
      margin-left: auto;
      margin-block: 0;
      padding-inline-start: 0;
   }

   li {
      list-style-type: none;
   }

   span {
      font-weight: bold;
   }

   span.local {
      color: lightgreen;
   }

   span.remote {
      color: lightcoral;
   }

   span.unknown {
      color: grey;
   }
</style>
