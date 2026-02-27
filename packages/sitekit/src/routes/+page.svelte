<script lang="ts">
   import "./dot-bg.css";
   import { Temporal } from "@js-temporal/polyfill";
   import {
      fonts,
      ShinyBorder,
      DotPNG,
      TextRecessed,
      PanelGlass,
   } from "$lib/index.js";
   import Avatar from "$lib/components/Avatar.svelte";
   import SponsoredByEpicenter from "$lib/components/SponsoredByEpicenter.svelte";
   import StrategyHeader from "$lib/components/StrategyHeader.svelte";

   export const injectStyles = (css: string) => (node: HTMLElement) => {
      node.textContent = css
   }

</script>

<svelte:head>
    <style {@attach injectStyles(fonts)}></style>
</svelte:head>

<ShinyBorder>
   <DotPNG>
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
   </DotPNG>
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

   :global(.dotfield) {
      display: grid;
   }
</style>
