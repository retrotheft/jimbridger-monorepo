<script lang="ts">
   import "../app.css";
   import { ShinyBorder, DualLayerDot, TextRecessed } from "$lib/index.js";
</script>


<main>
   <ShinyBorder>
      <article class="post">
         <DualLayerDot>
            <TextRecessed>
               <p>The recessed text trick is probably the most "mixing desk" of
               these — it's how labels look on real brushed aluminum panels.
               Combine it with the letter-spacing and uppercase and it'll feel
               like silk-screened lettering on hardware.</p>
               <p>The recessed text trick is probably the most "mixing desk" of
               these — it's how labels look on real brushed aluminum panels.
               Combine it with the letter-spacing and uppercase and it'll feel
               like silk-screened lettering on hardware.</p>
               <p>The recessed text trick is probably the most "mixing desk" of
               these — it's how labels look on real brushed aluminum panels.
               Combine it with the letter-spacing and uppercase and it'll feel
               like silk-screened lettering on hardware.</p>
            </TextRecessed>
         </DualLayerDot>
      </article>
   </ShinyBorder>
</main>

<style>
   main {
      display: flex;
      gap: 1em;
   }

   article.post {
      width: 500px;
      max-width: 50ch;
   }
</style>
