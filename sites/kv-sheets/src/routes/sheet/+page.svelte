<script lang="ts">
   import { putValue, listKeys, getValues } from '$lib/kv.remote'
   import Row from '$lib/components/Row.svelte'

   const sheet = "test-sheet"
   const listKeysQuery = listKeys(sheet)

   const rows = ['A', 'B', 'C', 'D']
   const getValuesQuery = getValues(rows.map(row => `${sheet}:${row}`))

   const currentValues = $derived(await getValuesQuery)

   const fields = ['name', 'age']

   async function saveKVPair(key: string, value: string) {
      await putValue({ key, value })
      listKeysQuery.refresh()
      getValuesQuery.refresh()
   }

   $effect(() => {
      console.log(getValuesQuery.current)
   })
</script>

{#if !getValuesQuery.loading}
   {#each rows as row}
      <Row {sheet} {row} {fields} callback={saveKVPair} initialValue={currentValues.find(el => el.key === `${sheet}:${row}`)?.value} />
   {/each}
{/if}

<ul>
   {#each currentValues as { key, value }}
      <li>{key}: {value}</li>
   {/each}
</ul>
