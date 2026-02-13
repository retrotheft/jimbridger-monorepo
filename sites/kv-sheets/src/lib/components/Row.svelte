<script lang="ts">
   import Cell from "./Cell.svelte";
   import { untrack } from "svelte";

   let { sheet, row, fields, callback, initialValue }: { sheet: string, row: string, fields: string[], callback: (key: string, value: string) => void, initialValue: string | undefined } = $props()

   const key = $derived(`${sheet}:${row}`)

   let stateObject = $state<Record<string, string>>({})

   function save() {
      const value = JSON.stringify(stateObject)
      callback(key, value)
   }

   $effect(() => {
      const initialObj = JSON.parse(initialValue ?? '{}')
      fields.forEach(field => {
         stateObject[field] = initialObj[field] ?? ''
      })
      // clean up any deleted fields
      untrack(() => {
         for (const key of Object.keys(stateObject)) {
            if (!fields.includes(key)) delete stateObject[key]
         }
      })
   })
</script>

<!-- <button onclick={updateSheetMeta}>Update Sheet Meta</button> -->

<ol class="row">
   <span>{row}</span>
   {#each fields as field}
      <li class:unsaved={JSON.stringify(stateObject) !== initialValue}>
         <Cell {row} {field} bind:value={stateObject[field]} callback={save} />
      </li>
   {/each}
   <button onclick={save}>Save</button>
   {JSON.stringify(stateObject)}
</ol>

<style>
   ol {
      padding-inline-start: 0;
      display: flex;
      align-items: center;
   }

   li {
      list-style-type: none;
      border: 1px solid transparent;
   }

   li.unsaved {
      border: 1px solid lightcoral;
   }

   span {
      margin-right: 1em;
   }
</style>
