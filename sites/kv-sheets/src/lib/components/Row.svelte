<script lang="ts">
   import Cell from "./Cell.svelte";
   import { onMount } from "svelte";

   let { sheet, row, fields, callback, initialValue }: { sheet: string, row: string, fields: string[], callback: (key: string, value: string) => void, initialValue: string | undefined } = $props()

   const key = $derived(`${sheet}:${row}`)

   const stateObject = $state<Record<string, string>>({})

   function save() {
      const value = JSON.stringify(stateObject)
      callback(key, value)
   }

   onMount(() => {
      const initialObj = JSON.parse(initialValue ?? '{}')
      console.log(fields)
      fields.forEach(field => {
         stateObject[field] = initialObj[field] ?? ''
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
