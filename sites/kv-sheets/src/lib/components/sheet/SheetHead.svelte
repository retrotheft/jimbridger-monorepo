<script lang="ts">
   import { type Sheet } from '$lib/classes/Sheet.svelte'

   let { sheet }: { sheet: Sheet } = $props()

   let isEditing = $state(false)

   const fields = $derived(sheet.metadata.fields)

   function onkeydown(e: KeyboardEvent) {
      if (e.code === "Enter") return isEditing = false
   }
</script>

<thead>
   <tr>
      <th colspan={fields.length} id="controls">
         <button onclick={() => isEditing = !isEditing}>
            { isEditing ? 'Done Editing' : 'Edit Metadata' }
         </button>
         <button onclick={() => sheet.addField()}>Add Field</button>
      </th>
   </tr>
   <tr>
      {#each fields as field, index }
         <th>
            {#if isEditing}
               <input type="text" bind:value={fields[index]} {onkeydown} />
               <button onclick={() => sheet.removeField(index)}>x</button>
            {:else}
               <button class="field-sort" onclick={() => sheet.sort(index)}>{field}</button>
            {/if}
         </th>
      {/each}
   </tr>
</thead>

<style>
   th {
      background-color: var(--bg-color);
   }

   th#controls {
      text-align: right;
   }

   button.field-sort {
      all: unset;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
         color: lightgreen;
      }
   }
</style>
