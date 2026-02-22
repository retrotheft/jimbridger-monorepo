<script lang="ts">
   import heart from "../assets/Heart.svelte";
   import power from "../assets/Power.svelte";

   const paths: { [key: string]: any } = {
      heart,
      power
   };

   let { name, fill = "white", scale = 100, width = 24, height = 24 } = $props();

   const selected = $derived({
      component: paths[name]
   })
</script>

<svg viewBox={`0 0 ${width}px ${height}px`} style={`--scale: ${scale}%; height: ${height}px; width: ${width}px;`}>
   <g {fill}>
      <selected.component />
   </g>
</svg>

<style>
   svg {
      transform: scale(var(--scale));
      fill: white;
   }

   :global(svg path) {
      fill: white;
   }

   svg:hover :global(path) {
      fill: lightgreen;
   }
</style>
