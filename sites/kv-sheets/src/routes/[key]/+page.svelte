<script lang="ts">
   import { getValueWithMetadata, putValueWithMetadata } from "$lib/kv.remote";
   import { page } from "$app/state";
   import Remote from "$lib/components/Remote.svelte";
   import Local from "$lib/components/Local.svelte";
   import SheetEdit from "$lib/components/sheet/SheetEdit.svelte";
   import { type Sheet } from "$lib/classes/Sheet.svelte";

   let key = page.params.key!;

   const kvQuery = getValueWithMetadata(key ?? "");

   const save = (sheet: Sheet) => putValueWithMetadata(sheet.KVData).then(_ => kvQuery.refresh())
</script>

{#if !kvQuery.loading && kvQuery.current}
   <Remote current={kvQuery.current} {save}>
      <Local {key}>
         <SheetEdit {key} />
      </Local>
   </Remote>
{:else}
   Loading...
{/if}
