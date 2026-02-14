<script lang="ts">
   import { getValue, putValue } from '$lib/kv.remote'
   import Sheet from '$lib/components/Sheet.svelte';
   import { page } from '$app/state'
   import { onMount } from 'svelte'

   const sheet = page.params.sheet!

   const sheetMetaQuery = getValue(sheet)
   const sheetMeta = $derived(await sheetMetaQuery)

   const refresh = () => sheetMetaQuery.refresh()

   onMount(async () =>{
      const meta = await sheetMetaQuery
      if (!meta) await putValue({ key: `${sheet}`, value: { rowCount: 1, fields: ['field-1'] }})
      refresh()
   })
</script>

{#if sheetMeta}
   <Sheet {sheet} {sheetMeta} {refresh} />
{:else}
   Loading Sheet Meta...
{/if}
