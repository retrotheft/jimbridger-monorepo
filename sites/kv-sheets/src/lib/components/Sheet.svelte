<script lang="ts">
   import { putValue, getValues, listKeys } from '$lib/kv.remote'
   import Row from '$lib/components/Row.svelte'

   type SheetMeta = {
      rowCount: number,
      fields: string[]
   }

   let { sheet, sheetMeta, refresh }: { sheet: string; sheetMeta: SheetMeta, refresh: () => void } = $props();

   let rows = $derived(buildRows(sheetMeta.rowCount))
   const fields = $derived(sheetMeta.fields)

   const listKeysQuery = $derived(listKeys(sheet))
   const getValuesQuery = $derived(getValues(rows.map(row => `${sheet}:${row}`)))

   const currentValues = $derived(getValuesQuery.current)

   function buildRows(length: number) {
      return Array.from({ length }, (_,i) => `${i + 1}`)
   }


   async function saveKVPair(key: string, value: string) {
      await putValue({ key, value })
      listKeysQuery.refresh()
      getValuesQuery.refresh()
   }

   async function updateSheetMeta() {
      await putValue({ key: `${sheet}`, value: { rowCount: rows.length, fields }})
      listKeysQuery.refresh()
   }

   async function addRow() {
      // update sheet meta
      await putValue({ key: `${sheet}`, value: { rowCount: rows.length + 1, fields }})
      refresh()
   }
</script>

{sheet}: {JSON.stringify(sheetMeta)}

{#if getValuesQuery.current}
   {#each rows as row}
      <Row {sheet} {row} {fields} callback={saveKVPair} initialValue={currentValues?.find(el => el.key === `${sheet}:${row}`)?.value} />
   {/each}
{:else}
   Loading getValuesQuery...
{/if}

<button onclick={addRow}>Add Row</button>

<ul>getValues
   {#each currentValues as { key, value }}
      <li>{key}: {value}</li>
   {/each}
</ul>

<ul>listKeys
   {#each await listKeysQuery as { name, key }}
      <li>{name}</li>
   {/each}
</ul>
