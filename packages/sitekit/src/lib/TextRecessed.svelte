<script lang="ts">
   let { children } = $props()
</script>

<div>
   {@render children?.()}
</div>

<style>
   div {
      font-family: 'Nunito Sans';
      line-height: 1.3rem;
      padding: 2em;
      letter-spacing: 0.05em;
      font-size: 1rem;
      color: #ccc;
      text-shadow:
        0 -2px 1px rgba(0,0,0,0.8),
        0 2px 1px rgba(255,255,255,0.1);
   }

   /*article.inset {
      background: rgba(255,255,255,0.04);
      border-top: 1px solid rgba(255,255,255,0.06);
      border-bottom: 1px solid rgba(0,0,0,0.4);
      padding: 0.25em 0.75em;
   }*/
</style>
