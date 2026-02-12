<script lang="ts">
   let { children } = $props()
</script>

<div>
   {@render children?.()}
</div>

<style>
   div {
      /*--border-radius: 1em;*/
      --border-color: oklch(30% 0 0 / 0.5);
      --border-edges: oklch(20% 0 0 / 0.5);
      --border-center: oklch(40% 0 0 / 0.5);
      --_padding: 1px;
      /*--_border-radius: calc(var(--border-radius) - var(--_padding));*/
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      padding: var(--_padding);
      padding: 0;
      background: linear-gradient(
         var(--gradient-angle),
         var(--border-edges) 0%,
         var(--border-edges) 55%,
         var(--border-center) 70%,
         var(--border-edges) 85%,
         var(--border-edges) 100%
      );
      background-attachment: fixed;
      border-radius: var(--_border-radius);
      animation: rotate-gradient 120s linear infinite;
   }

   @property --gradient-angle {
      syntax: "<angle>";
      initial-value: 360deg;
      inherits: false;
   }

   @keyframes rotate-gradient {
      to {
         --gradient-angle: 0deg;
      }
   }
</style>
