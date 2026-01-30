<script lang="ts">
   const games = ['minesweeper', 'snake', 'tetris']
</script>

<main id="games">
   <ul>
      {#each games as game}
         <li style="view-transition-name: game-{game};">
            <a href="/games/{game}">{game}</a>
         </li>
      {/each}
   </ul>
</main>

<style>
   main#games {
      display: grid;
      place-items: center;
   }

   li {
      border: 1px solid white;
      background-color: rgba(0,0,0,0.5);
   }

   a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 1em;
   }
</style>
