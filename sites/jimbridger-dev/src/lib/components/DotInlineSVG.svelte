<script lang="ts">
   let {
      fineSize = 3,
      fineRadius = 0.5,
      fineFill = "#FFFFFF06",
      coarseSize = 6,
      coarseRadius = 1,
      coarseFill = "#FFFFFF09",
      children,
   } = $props();
</script>

<div class="dotfield">
   <svg class="pattern" width="100%" height="100%">
      <defs>
         <pattern id="fine" width={fineSize} height={fineSize} patternUnits="userSpaceOnUse">
            <circle cx={fineSize / 2} cy={fineSize / 2} r={fineRadius} fill={fineFill} />
         </pattern>
         <pattern id="coarse" width={coarseSize} height={coarseSize} patternUnits="userSpaceOnUse">
            <circle cx={coarseSize / 2} cy={coarseSize / 2} r={coarseRadius} fill={coarseFill} />
         </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fine)" />
      <rect width="100%" height="100%" fill="url(#coarse)" />
   </svg>
   {@render children?.()}
</div>

<style>
   .dotfield {
      --_bg-color: var(--bg-color, rgba(0,0,0,0.2));
      background-color: var(--_bg-color);
      position: relative;
      min-height: 100%;
   }

   .pattern {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
   }
</style>
