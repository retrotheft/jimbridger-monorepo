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
   import StrategyHeader from "$lib/components/StrategyHeader.svelte";

   let class1 = $state('class1')
   let class2 = $state('class2')

</script>

<ShinyBorder>
   <DualLayerDot>
      <TextRecessed>
         <StrategyHeader />
         <main>
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

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
