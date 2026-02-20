<script lang="ts">
   import { setLocalContext } from "$lib/contexts/local";
   import { type Sheet } from "$lib/classes/Sheet.svelte";
   import { type Snippet } from 'svelte'

   let { children, key }: { children: Snippet, key: string } = $props()

   let lastSaved = $state<number>()

   function save(sheet: Sheet) {
      const { key, value, metadata } = sheet
      metadata.lastSaved = Date.now()
      try {
         localStorage.setItem(key, JSON.stringify({ value, metadata }))
         lastSaved = metadata.lastSaved
      } catch (err: unknown) {
         console.error(err instanceof Error ? err.message : 'Unable to save to local storage.')
      }
   }

   function load(key: string) {
      const json = localStorage.getItem(key)
      if (!json) return null
      return JSON.parse(json)
   }

   // svelte-ignore state_referenced_locally -- only want initial value on load
   setLocalContext({ save, initialValue: load(key)})
</script>

{@render children?.()}
