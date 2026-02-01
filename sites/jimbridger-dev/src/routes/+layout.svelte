<script lang="ts">
   import favicon from "$lib/assets/favicon.svg";
   import "../app.css";
   import NavHeader from "$lib/components/NavHeader.svelte";
   import { onNavigate } from "$app/navigation";

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

<header>
   <NavHeader />
</header>

{@render children()}
