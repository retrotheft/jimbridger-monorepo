<script lang="ts">
   import { type Sheet } from '$lib/classes/Sheet.svelte'
   import { type Snippet } from 'svelte'

   let { sheet, cell }: { sheet: Sheet, cell: Snippet<[number, number]> } = $props()
</script>

<tbody>
   {#each sheet.data as row, r}
      <tr>
         {#each row as _, c}
            <td>{@render cell?.(r, c)}</td>
         {/each}
      </tr>
   {/each}
</tbody>

<style>
   td {
      background-color: var(--bg-color);
   }
</style>
