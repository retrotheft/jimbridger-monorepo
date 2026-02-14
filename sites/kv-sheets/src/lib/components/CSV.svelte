<script lang="ts">
   // write an improved Sheet that stores all data in the one KV pair
   // it should store field names and types in the KV metadata

   import { putValueWithMetadata, getValueWithMetadata } from "$lib/kv.remote";

   async function createKVWithMetadata() {
      const result = await putValueWithMetadata({ key: 'test-csv', value: 'alice,23\nbob,22\ncharlie,19', metadata: { fields: ['name', 'age']}});
      console.log(result)
   }

   const testCSVQuery = getValueWithMetadata("test-csv")
   const testCSV = $derived(await testCSVQuery)

   const rows = $derived(testCSV?.value.split('\n') ?? [])
</script>

<button onclick={() => createKVWithMetadata()}>Create Test CSV</button>

<ol>
   {#each rows as row}
      <li>{row}</li>
   {/each}
</ol>
