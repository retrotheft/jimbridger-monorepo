<script lang="ts">
   import { type Snippet } from "svelte"

   let { children, tag = "div", color = "oklch(45% 0 0 / 0.1)" }: { children: Snippet, tag: string, color: string } = $props()
</script>

<svelte:element this={tag} class="glass-panel" style={`--base-color: ${color};`}>
   {@render children?.()}
</svelte:element>

<style>
   .glass-panel {
      --_padding: var(--padding, 1em);
      --_base-color: var(--base-color, oklch(45% 0 0 / 0.1));
      display: grid;
      backdrop-filter: blur(1.2px);
      will-change: backdrop-filter;
      background-color: oklch(from var(--_base-color) l c h / 0.2);
      border-top: 1px solid oklch(from var(--_base-color) l c h / 0.5);
      overflow: hidden;
   }
</style>
