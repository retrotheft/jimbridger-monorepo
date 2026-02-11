<script lang="ts">
   import { page } from "$app/state";
   import { getHtml } from "./_getHtml";

   const name = page.params.name

   const html = $derived(getHtml(name!))
</script>

<main id="games">
   <div class="game-window" style="view-transition-name: game-{name};">
      <header>
         <a href="/games">Back to Games</a>
         <span>{name}</span>
         <span></span>
      </header>
      <!-- svelte-ignore a11y_autofocus -->
      <iframe
         autofocus
         id="embedded-game"
         title="game"
         srcdoc={html}>
      </iframe>
      <footer>
         <span><em>powered by
         <strong>Reggie the Reverse Game Engine</strong></em>
      </span>
      </footer>
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
      --_base-color: oklch(45% 0 0);
      margin: 1em;
      border-radius: 1em;
      backdrop-filter: blur(1.2px);
      background-color: oklch(from var(--_base-color) 17.5% c h / 0.5);
      border-top: 1px solid oklch(from var(--_base-color) l c h / 0.5);
      overflow: hidden;

      header {
         text-align: center;
         font-weight: bold;
         background-color: oklch(from var(--_base-color) 15% 0 0 / 0.9);
         padding: 1em;
         display: grid;
         grid-template-columns: 1fr auto 1fr;
         justify-items: space-between;

         a {
            text-align: left;
         }

         span {
            text-transform: uppercase;
         }

         span:last-child {
            font-size: 0.9rem;
         }
      }

      footer {
         background-color: oklch(from var(--_base-color) 15% 0 0 / 0.9);
         display: grid;
         place-items: center;
         padding: 1em;
      }
   }

   iframe {
      border: none;
      width: 800px;
      height: 780px;
   }
</style>
