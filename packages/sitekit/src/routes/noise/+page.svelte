<script lang="ts">
   import "../../app.css";
   import { ShinyBorder, DotPNG, TextRecessed } from "$lib/index.js";
    // import SandBlasted from "$lib/SandBlasted.svelte";
</script>

<main>
   <ShinyBorder>
      <DotPNG>
         <TextRecessed>
            <article class="post">
               <p>
                  The recessed text trick is probably the most "mixing desk" of
                  these — it's how labels look on real brushed aluminum panels.
                  Combine it with the letter-spacing and uppercase and it'll
                  feel like silk-screened lettering on hardware.
               </p>
               <p>
                  The recessed text trick is probably the most "mixing desk" of
                  these — it's how labels look on real brushed aluminum panels.
                  Combine it with the letter-spacing and uppercase and it'll
                  feel like silk-screened lettering on hardware.
               </p>
               <p>
                  The recessed text trick is probably the most "mixing desk" of
                  these — it's how labels look on real brushed aluminum panels.
                  Combine it with the letter-spacing and uppercase and it'll
                  feel like silk-screened lettering on hardware.
               </p>
            </article>
         </TextRecessed>
      </DotPNG>
   </ShinyBorder>
   <!-- <SandBlasted> -->
      <article class="post sandblasted">
         Hello there
      </article>
   <!-- </SandBlasted> -->
</main>

<style>
   main {
      display: flex;
      gap: 1em;
   }

   article.post {
      width: 500px;
      max-width: 50ch;
      min-height: 10lh;
   }

   article.sandblasted {
      background: black;
      background-image: url('/texture.svg');
      background-size: cover;
   }
</style>
