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
      fields.forEach(field => {
         stateObject[field] = initialObj[field] ?? ''
      })
   })

   function updateStateObject(field: string, value: string) {
      stateObject[field] = value
   }

   $inspect(stateObject)

   $effect(() => {
      console.log("CHECK", JSON.stringify(stateObject) === initialValue)
   })
</script>

<!-- <button onclick={updateSheetMeta}>Update Sheet Meta</button> -->

<ol class="row">
   {key}
   {#each fields as field}
      <li class:unsaved={JSON.stringify(stateObject) !== initialValue}>
         <Cell {row} {field} bind:value={stateObject[field]} />
      </li>
   {/each}
   <button onclick={save}>Save</button>
   {JSON.stringify(stateObject)}
</ol>

<style>
   ol {
      padding-inline-start: 0;
      display: flex;
   }

   li {
      list-style-type: none;
      border: 1px solid transparent;
   }

   li.unsaved {
      border: 1px solid lightcoral;
   }
</style>
