<script lang="ts">
   import CSV from '$lib/components/CSV.svelte'
   import CsvComparison from '$lib/components/csv/CsvComparison.svelte'
   import { putValueWithMetadata, getValueWithMetadata } from "$lib/kv.remote";
   import { RemoteSheet } from '$lib/classes/RemoteSheet.svelte';

   let status = $state('')

   const testCSVQuery = getValueWithMetadata("test-csv")

   const sheet = new RemoteSheet(getValueWithMetadata("test-csv"))

   const savedCsv = $derived(testCSVQuery.current?.value ?? '')

   function statusify(fn: () => Promise<any>) {
      status = "loading..."
      fn()
         .then(_ => { status = "success"; testCSVQuery.refresh() })
         .catch(err => status = err?.body?.message ?? err?.message ?? 'Unknown error')
   }

   function updateCsv(value: string, metadata: { fields: string[] }) {
      // statusify(() => putValueWithMetadata({ key: 'test-csv', value, metadata }))
      sheet.save(() => putValueWithMetadata({ key: 'test-csv', value, metadata }))
   }

   function createKVWithMetadata() {
      statusify(() => putValueWithMetadata({ key: 'test-csv', value: 'alice,23\nbob,22\ncharlie,19', metadata: { fields: ['name', 'age']}}))
   }
</script>

<button onclick={() => createKVWithMetadata()}>Create Test CSV</button> {status}

{#if testCSVQuery.current}
   <CsvComparison savedCsv={savedCsv}>
      <CSV testCSV={testCSVQuery.current} update={updateCsv} result={testCSVQuery.current} />
   </CsvComparison>
{/if}
