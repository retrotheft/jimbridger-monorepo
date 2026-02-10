<script lang="ts">
   import "../app.css";
   import TileDot from "$lib/TileDot.svelte";
   import DualLayerDot from "$lib/DualLayerDot.svelte";
   import ShinyBorder from "$lib/ShinyBorder.svelte";
</script>

<!--
<div class="masked-element">Hello there</div>
<div class="with-background">General Kenobi</div> -->

<main>
   <!-- <ShinyBorder>
      <div>
         <DualLayerDot>
            <article class="glow">
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
            </article>
         </DualLayerDot>
      </div>
   </ShinyBorder> -->
   <ShinyBorder>
      <div>
         <DualLayerDot>
            <article class="recessed">
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
            </article>
         </DualLayerDot>
      </div>
   </ShinyBorder>
   <ShinyBorder>
      <div>
         <DualLayerDot>
            <article class="inset">
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
            </article>
         </DualLayerDot>
      </div>
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

   article {
      font-family: 'Poiret One';
      font-family: 'Oxanium';
      font-family: 'Exo 2';
      font-family: 'Nunito Sans';
      line-height: 1.3rem;
      padding: 2em;
      letter-spacing: 0.05em;
      /*text-transform: uppercase;*/
      font-size: 1rem;
   }

   article.glow {
      color: #fff;
      text-shadow:
         0 0 4px rgba(255, 255, 255, 0.4),
         0 0 12px rgba(255, 255, 255, 0.2),
         0 0 24px rgba(255, 255, 255, 0.1);

      /*color: #999;
      text-shadow:
        0 -1px 0 rgba(0,0,0,0.6),
        0 1px 0 rgba(255,255,255,0.05);*/
   }

   article.recessed {
      /*background: rgba(255,255,255,0.04);*/
      color: #ccc;
      text-shadow:
        0 -2px 1px rgba(0,0,0,0.8),
        0 2px 1px rgba(255,255,255,0.1);
   }

   article.raised {
      color: #d0d0d0;
      text-shadow:
         0 2px 2px rgba(0, 0, 0, 0.8),
         0 -1px 0 rgba(255, 255, 255, 0.08);
   }

   article.outline {
      color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
   }

   article.inset {
      background: rgba(255,255,255,0.04);
      border-top: 1px solid rgba(255,255,255,0.06);
      border-bottom: 1px solid rgba(0,0,0,0.4);
      padding: 0.25em 0.75em;
   }

   article.color {
      color: #4df0ff;
      text-shadow:
        0 0 6px rgba(77,240,255,0.6),
        0 0 20px rgba(77,240,255,0.3);
   }
</style>
