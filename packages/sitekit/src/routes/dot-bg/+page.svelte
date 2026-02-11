<script lang="ts">
   import "./dot-bg.css";
   import { Temporal } from "@js-temporal/polyfill";
   import {
      ShinyBorder,
      DualLayerDot,
      TextRecessed,
      PanelGlass,
   } from "$lib/index.js";
   import Avatar from "$lib/components/Avatar.svelte";
   import SponsoredByEpicenter from "$lib/components/SponsoredByEpicenter.svelte";
   import ClassDemo from "$lib/components/ClassDemo.svelte";

   let class1 = $state('class1')
   let class2 = $state('class2')

</script>

<ShinyBorder>
   <DualLayerDot>
      <TextRecessed>
         <main>
            <button onclick={() => class1 = 'class3'}>Change Class ({class1})</button>
            <div class="card">
               <PanelGlass tag="article">
                  <header>General Kenobi</header>
                  <div>Hello there</div>
                  <footer>
                     {Temporal.Now.zonedDateTimeISO().toLocaleString(
                        undefined,
                        {
                           dateStyle: "long",
                           timeStyle: "short",
                        },
                     )}
                  </footer>
               </PanelGlass>
            </div>
            <Avatar />
            <SponsoredByEpicenter />
            <ClassDemo class-1 class3 />
         </main>
      </TextRecessed>
   </DualLayerDot>
</ShinyBorder>

<style>
   main {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1em;
      height: 100%;
   }

   :global(.glass-panel) {
      --padding: 1em;
      /*--base-color: oklch(10% 0 0 / 0.9);*/
      border-radius: 1em;
   }

   /*div.card {
      transform: perspective(200px) rotateX(45deg);
      transform-origin: bottom center;
      transition: transform 0.2s ease-in-out;
   }

   div.card:hover {
      transform: perspective(800px) rotateX(0deg);
   }*/

   /*article.blue {
      --_color: oklch(40% .10 240);
      }*/
</style>
