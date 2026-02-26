<script lang="ts">
   import favicon from "$lib/assets/favicon.svg";
   import "../app.css";
   import NavHeader from "$lib/components/NavHeader.svelte";
   import { onNavigate } from "$app/navigation";
   import { TextRecessed, DotPNG } from "sitekit";
   import { setLayoutContext } from "$lib/contexts/layout";
   import { injectStyles } from "$lib/attachments/inject-styles"; // is being used, svelte syntax highlighting on attachments still buggy
   import ShinyBorder from "$lib/components/ShinyBorder.svelte";
   import StrategyHeader from "$lib/components/StrategyHeader.svelte";

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

   const onresize = () => {
      console.log("Repainting after resize");
      document.body.style.display = 'none';
      document.body.offsetHeight; // force reflow
      document.body.style.display = '';
   }
</script>

<!-- <svelte:window {onresize} /> -->

<!-- <svelte:head> located at bottom of file -->

<ShinyBorder>
<!-- <ShinyBackground> -->
   <!-- <DualLayerDot> -->
      <!-- <DotInlineSVG> -->
      <DotPNG>
      <TextRecessed>
         <StrategyHeader />

         {@render children()}
      </TextRecessed>
      </DotPNG>
      <!-- </DotInlineSVG> -->
   <!-- </DualLayerDot> -->
<!-- </ShinyBackground> -->
</ShinyBorder>
<!-- this lives down the bottom because it screws with the syntax highlighting -->
<svelte:head>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com">
   <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
   <link rel="icon" href={favicon} />
   <title>Jim Bridger</title>
   <style {@attach injectStyles(color)}></style>
</svelte:head>
