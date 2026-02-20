<script lang="ts">
   import { setRemoteContext } from "$lib/contexts/remote";
   import type { Metadata } from "$lib/types";
   import type { Snippet } from "svelte";
   import { type Sheet } from "$lib/classes/Sheet.svelte";

   let { children, current, save }: { children: Snippet; current: { value: string, metadata: Metadata}, save: (sheet: Sheet) => void } = $props();

   const remoteSheet = $derived(current?.value?.split("\n").map((r) => r?.split(",")) ?? null);

   function compare(r: number, c: number, value: string): boolean {
      return remoteSheet?.[r]?.[c] !== value;
   }

   // svelte-ignore state_referenced_locally -- only want initial value on load
   setRemoteContext({ compare, initialValue: current.value && current.metadata ? current : null, save });
</script>

{@render children?.()}
