<script lang="ts">
   import { type Sheet } from "$lib/classes/Sheet.svelte";

   let { sheet, row, column, dirty, save }: { sheet: Sheet, row: number, column: number, dirty: boolean, save: () => void } = $props()
</script>

<input type="text" bind:value={sheet.data[row][column]} class:dirty oninput={save} />

<style>
   input {
      all: unset;
      background-color: var(--bg-color-input, black);
      padding: 0.5em;
      border: 1px solid transparent;
   }

   input.dirty {
      border-color: lightcoral;
   }
</style>
