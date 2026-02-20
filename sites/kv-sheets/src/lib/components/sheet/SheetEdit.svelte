<script lang="ts">
   import { Sheet } from "$lib/classes/Sheet.svelte";
   import { getRemoteContext } from "$lib/contexts/remote";
   import { getLocalContext } from "$lib/contexts/local";
   import SheetBody from '$lib/components/sheet/SheetBody.svelte'
   import SheetCell from '$lib/components/sheet/SheetCell.svelte'
   import SheetHead from "./SheetHead.svelte";

   const { compare, initialValue: remote, save:saveRemote } = getRemoteContext()
   const { initialValue: local, save:saveLocal } = getLocalContext()

   let { key }: { key: string } = $props()

   // svelte-ignore state_referenced_locally -- only want initial key
   const sheet = new Sheet(key, local, remote)
</script>

<button onclick={() => console.log(sheet.snapshot)}>Log Sheet</button>
<button onclick={() => saveLocal(sheet)}>Save Local Sheet</button>
<button onclick={() => saveRemote(sheet)}>Save Remote Sheet</button>

<table>
   <SheetHead {sheet} />
   <SheetBody {sheet}>
      {#snippet cell(row, column)}
         <SheetCell {sheet} {row} {column} dirty={compare(row, column, sheet.cell(row, column))} save={() => saveLocal(sheet)} />
      {/snippet}
   </SheetBody>
</table>

<button onclick={() => sheet.addRow()}>Add Row</button>

<style>
   table {
      --bg-color: oklch(75% 0 0 / 0.25);
      --bg-color-input: oklch(0 0 0 / 0.75);
   }
</style>
