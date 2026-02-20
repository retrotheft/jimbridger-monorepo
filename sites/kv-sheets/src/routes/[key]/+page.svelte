<script lang="ts">
   import { getValueWithMetadata, putValueWithMetadata } from "$lib/kv.remote";
   import { page } from "$app/state";
   import Remote from "$lib/components/Remote.svelte";
   import Local from "$lib/components/Local.svelte";
   import SheetEdit from "$lib/components/sheet/SheetEdit.svelte";
   import { type Sheet } from "$lib/classes/Sheet.svelte";

   let key = page.params.key!;

   // function statusify(fn: () => Promise<any>) {
   //    status = "loading..."
   //    fn()
   //       .then(_ => { status = "success"; testCSVQuery.refresh() })
   //       .catch(err => status = err?.body?.message ?? err?.message ?? 'Unknown error')
   // }

   // getValueWithMetadata always returns an object with { value, metadata, cacheStatus }
   const csvQuery = getValueWithMetadata(key ?? "");

   const save = (sheet: Sheet) => putValueWithMetadata(sheet.KVData).then(_ => csvQuery.refresh())
</script>

{#if !csvQuery.loading && csvQuery.current}
   <Remote current={csvQuery.current} {save}>
      <Local {key}>
         <SheetEdit {key} />
      </Local>
   </Remote>
{:else}
   Loading...
{/if}
