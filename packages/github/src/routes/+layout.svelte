<script lang="ts">
   import '../app.css'

   let { children } = $props()
</script>

<svelte:boundary>
   {@render children?.()}
   {#snippet pending()}
      <p>Loading...</p>
   {/snippet}
   {#snippet failed()}
      <p>Sorry, an error occurred.</p>
   {/snippet}
</svelte:boundary>
