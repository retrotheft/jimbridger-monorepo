<script lang="ts">
   import '../app.css'
   import TileDot from '$lib/TileDot.svelte'
   import DualLayerDot from '$lib/DualLayerDot.svelte'
    import ShinyBorder from '$lib/ShinyBorder.svelte';
</script>
<!--
<div class="masked-element">Hello there</div>
<div class="with-background">General Kenobi</div> -->

<main>
   <div>
      <TileDot />
   </div>

   <div>
      <DualLayerDot />
   </div>
   <ShinyBorder>
      <div><DualLayerDot /></div>
   </ShinyBorder>
</main>
<style>
   main {
      display: flex;
      gap: 1em;
   }

   div {
      width: 500px;
      height: 500px;
      display: grid;
   }
</style>
