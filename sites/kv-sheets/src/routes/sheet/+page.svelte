<script lang="ts">
   import { getValue } from '$lib/kv.remote'
   import Sheet from '$lib/components/Sheet.svelte';

   const sheet = "test-sheet"

   const sheetMetaQuery = getValue(sheet)
   const sheetMeta = $derived(await sheetMetaQuery)

   const refresh = () => sheetMetaQuery.refresh()
</script>

<svelte:boundary>
   {#if sheetMeta}
      <Sheet {sheet} {sheetMeta} {refresh} />
   {:else}
      Loading Sheet Meta...
   {/if}

   {#snippet pending()}
      Pending...
   {/snippet}
   {#snippet failed()}
      Failed...
   {/snippet}
</svelte:boundary>
