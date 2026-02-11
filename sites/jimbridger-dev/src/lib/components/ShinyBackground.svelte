<script lang="ts">
   let { children } = $props()
</script>

<div>
   {@render children?.()}
</div>

<style>
   div::before {
      content: '';
      position: fixed;
      /* center it */
      top: 50%;
      left: 50%;
      width: 200vmax;
      height: 200vmax;
      translate: -50% -50%;
      z-index: -1;
      background: linear-gradient(
         0deg,
         oklch(20% 0 0 / 0.5) 0%,
         oklch(20% 0 0 / 0.5) 55%,
         oklch(40% 0 0 / 0.5) 70%,
         oklch(20% 0 0 / 0.5) 85%,
         oklch(20% 0 0 / 0.5) 100%
      );
      animation: spin 60s linear infinite;
      will-change: transform;
   }

   @keyframes spin {
      from {
         transform: rotate(360deg);
      }
      to {
         transform: rotate(0deg);
      }
   }
</style>
