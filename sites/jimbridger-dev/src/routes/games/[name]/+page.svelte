<script lang="ts">
   import { page } from "$app/state";
   import { getHtml } from "./_getHtml";

   const name = page.params.name

   const html = $derived(getHtml(name!))
</script>

<main id="games">
   <a href="/games">Back to Games</a>
   <div class="game-window" style="view-transition-name: game-{name};">
      <!-- svelte-ignore a11y_autofocus -->
      <iframe
         autofocus
         id="embedded-game"
         title="game"
         srcdoc={html}>
      </iframe>
   </div>
   <article id="game-info"></article>
</main>

<style>
   main#games {
      display: grid;
      place-items: center;
      gap: 1em;
   }

   .game-window {
      width: 900px;
      height: 900px;
      border: 1px solid white;
   }

   iframe {
      border: none;
      width: 100%;
      height: 100%;
   }
</style>
