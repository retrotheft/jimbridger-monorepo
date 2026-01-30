<script lang="ts">
   import { page } from "$app/state";

   const name = page.params.name
</script>

<main id="games">
   <a href="/games">Back to Games</a>
   <div class="game-window" style="view-transition-name: game-{name};">
      <iframe id="embedded-game" title="game"></iframe>
   </div>
   <article id="game-info"></article>
</main>

<style>
   main#games {
      display: grid;
      place-items: center;
   }

   .game-window {
      width: 600px;
      height: 600px;
      border: 1px solid white;
   }

   iframe {
      border: none;
   }
</style>
