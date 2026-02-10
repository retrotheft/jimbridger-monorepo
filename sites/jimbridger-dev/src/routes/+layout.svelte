<script lang="ts">
   import favicon from "$lib/assets/favicon.svg";
   import "../app.css";
   import NavHeader from "$lib/components/NavHeader.svelte";
   import { onNavigate } from "$app/navigation";
   import { ShinyBorder, DualLayerDot, TextRecessed } from "sitekit";

   let { children } = $props();

   onNavigate((navigation) => {
      if (!document.startViewTransition) return;

      return new Promise((resolve) => {
         document.startViewTransition(async () => {
            resolve();
            await navigation.complete;
         });
      });
   });
</script>

<svelte:head>
   <link rel="icon" href={favicon} />
</svelte:head>

<ShinyBorder>
   <DualLayerDot>
      <TextRecessed>
         <header class="page">
            <NavHeader />
         </header>

         {@render children()}
      </TextRecessed>
   </DualLayerDot>
</ShinyBorder>
