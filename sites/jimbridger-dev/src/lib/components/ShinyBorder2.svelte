<script lang="ts">
   let { children } = $props()
</script>
<div class="border-wrap">
   <div class="gradient-spinner"></div>
   <div class="content">
      {@render children?.()}
   </div>
</div>

<style>
   .border-wrap {
      --border-edges: oklch(20% 0 0 / 0.5);
      --border-center: oklch(40% 0 0 / 0.5);

      position: relative;
      padding: 1px;
      border-radius: var(--_border-radius);
      overflow: hidden;
   }

   .gradient-spinner {
      position: absolute;
      /* oversized so rotation covers corners */
      inset: -50%;
      background: linear-gradient(
         0deg,
         var(--border-edges) 0%,
         var(--border-edges) 55%,
         var(--border-center) 70%,
         var(--border-edges) 85%,
         var(--border-edges) 100%
      );
      animation: spin 120s linear infinite;
      will-change: transform;
      z-index: 0;
   }

   .content {
      position: relative;
      z-index: 1;
      border-radius: inherit;
   }

   @keyframes spin {
      to {
         transform: rotate(360deg);
      }
   }
</style>
