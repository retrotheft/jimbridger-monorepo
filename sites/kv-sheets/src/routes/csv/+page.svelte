<script lang="ts">
   import CSV from '$lib/components/CSV.svelte'
   import { putValueWithMetadata, getValueWithMetadata } from "$lib/kv.remote";

   let status = $state('')

   function statusify(fn: () => Promise<any>) {
      status = "loading..."
      fn()
         .then(_ => status = "success")
         .catch(err => status = err.body.message)
   }

   function createKVWithMetadata() {
      statusify(() => putValueWithMetadata({ key: 'test-csv', value: 'alice,23\nbob,22\ncharlie,19', metadata: { fields: ['name', 'age']}}))
   }

   const testCSVQuery = getValueWithMetadata("test-csv")
</script>

<button onclick={() => createKVWithMetadata()}>Create Test CSV</button> {status}

{#if testCSVQuery.current}
   <CSV testCSV={testCSVQuery.current} />
{/if}
