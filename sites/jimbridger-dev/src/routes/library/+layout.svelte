<script lang="ts">
   let { children } = $props()
</script>

<svelte:boundary>
   {@render children()}
   {#snippet pending()}
      <p>Loading articles from Dev.to...</p>
   {/snippet}
   {#snippet failed()}
      <p>An unknown error occurred. (Library)</p>
   {/snippet}
</svelte:boundary>

<footer>
   <p>
      <em>powered by
      <strong>dev.to</strong></em>
   </p>
</footer>
