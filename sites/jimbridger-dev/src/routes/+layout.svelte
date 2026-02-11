<script lang="ts">
   import favicon from "$lib/assets/favicon.svg";
   import "../app.css";
   import NavHeader from "$lib/components/NavHeader.svelte";
   import { onNavigate } from "$app/navigation";
   import { DualLayerDot, TextRecessed } from "sitekit";
   import { setLayoutContext } from "$lib/contexts/layout";
   import { injectStyles } from "$lib/attachments/inject-styles";
   import ShinyBackground from "$lib/components/ShinyBackground.svelte";

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

   let color = $state('#2d69b4')

   setLayoutContext({
      setColor: (c: string) => color = c
   })
</script>

<!-- <svelte:head> located at bottom of file -->

<ShinyBackground>
   <DualLayerDot>
      <TextRecessed>
         <header class="page">
            <NavHeader />
         </header>

         {@render children()}
      </TextRecessed>
   </DualLayerDot>
</ShinyBackground>

<!-- this lives down the bottom because it screws with the syntax highlighting -->
<svelte:head>
   <link rel="icon" href={favicon} />
   <style {@attach injectStyles(color)}></style>
</svelte:head>
