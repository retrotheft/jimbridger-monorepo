<script lang="ts">
   let { children } = $props()
</script>

<svelte:boundary>
   {@render children()}
   {#snippet pending()}
      <p>Loading Activity Feed...</p>
   {/snippet}
   {#snippet failed()}
      <p>An unknown error occurred.</p>
   {/snippet}
</svelte:boundary>
