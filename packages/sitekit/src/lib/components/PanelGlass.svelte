<script lang="ts">
   import { type Snippet } from "svelte"

   let { children, tag, color }: { children: Snippet, tag: string, color: string } = $props()
</script>

<svelte:element this={tag} class="glass-panel" style={`--_color: ${color};`}>
   {@render children?.()}
</svelte:element>

<style>
   .glass-panel {
      --_padding: 1em;
      /*min-height: 3lh;
      min-width: 20ch;*/
      /*border-radius: 1em;*/
      display: grid;
      justify-content: stretch;
      justify-items: stretch;
      backdrop-filter: blur(1.2px);
      background-color: oklch(from var(--_color) l c h / 0.2);
      border-top: 1px solid oklch(from var(--_color) l c h / 0.5);
      overflow: hidden;
   }
</style>
