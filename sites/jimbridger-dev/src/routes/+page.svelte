<script lang="ts">
   import { cache } from "$lib/functions/cache";
   import { getActivityFeed } from "$lib/remote/discussions.remote";
   import DiscussionComment from "$lib/components/DiscussionComment.svelte";
   import content from "$lib/assets/bio.md?raw";
   import MarkdownIt from "$lib/components/MarkdownIt.svelte";
   import { Avatar, PanelGlass, SponsoredByEpicenter } from "sitekit";

   const technologies = ['Typescript', 'Svelte', 'HTML', 'CSS', 'Rust'];
   // const colors = ['#2d69b4', '#f33a1b', '#d6452a', '#2242d1', '#f36541']
   const colors = ['#2d69b4', '#f33a1b', '#cfc22f', 'limegreen', 'orange']

   let color = $state(colors[0]);

   const injectStyles = (color: string) => (node: HTMLElement) => {
      node.textContent = `:root {
         --color: ${color};
         --_bg-color: oklch(from ${color} 50% .09 h / 1);
         --_hl-color: oklch(from ${color} 80% .16 h / 1);
      }`
   }

   const projects = [
      'one of my svelte libraries',
      'a tiny game demo with Reggie the Reverse Game Engine',
      'porting Reggie to Rust',
      'my presentation app Show & Svelte',
      'my super secret project that was absolutely not ready to be pushed to production',
      'a new youtube video (soon!)',
      'a new article on dev.to',
   ]
</script>

<!-- <svelte:head> located at bottom of file -->

<main id="home">
   <section id="header">
      <!-- <PanelGlass tag="article" color="oklch(45% 0 0 / 0.1)"> -->
      <article id="me">
         <Avatar />
         <h1>Jim Bridger</h1>
         <p>Hypercreative Open-Source Developer</p>
         <ul id="technologies">
            {#each technologies as t, i}
               <PanelGlass tag="li" color={`oklch(from ${colors[i]} 55% c h / 0.9)`}>
                  <button onclick={() => color = colors[i]}>{t}</button>
               </PanelGlass>
            {/each}
         </ul>
         <section id="blurb">
            <MarkdownIt {content} />
         </section>
         <section id="socials">
            <h2>social</h2>
            <ul>
               <li>github</li>
               <li>discord</li>
            </ul>
         </section>
         <div id="sponsor">
            <SponsoredByEpicenter />
         </div>
      </article>
      <!-- </PanelGlass> -->

   </section>
   <section id="content">
      <section id="recent">
      <h2>Latest Activity</h2>
         <ol id="activity-feed">
            <svelte:boundary>
               {#each await cache({ getActivityFeed }, { username: "retrotheft", discussionNum: 3 }) as comment}
                  <PanelGlass tag="li" color="oklch(45% 0 0 / 0.1)">
                     <DiscussionComment {comment} />
                  </PanelGlass>
               {/each}
               {#snippet pending()}
                  <p>Loading articles from Dev.to...</p>
               {/snippet}
               {#snippet failed()}
                  <p>An unknown error occurred. (Library)</p>
               {/snippet}
            </svelte:boundary>
         </ol>
      </section>
   </section>
</main>

<style>
   main#home {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5%;
      top: 0;
   }

   section:not(#blurb) {
      box-sizing: border-box;
      display: grid;
      align-content: start;
   }

   section#header {
      color: white;
   }

   section#blurb, section#projects {
      max-width: 32ch;
   }

   section#projects {

   }

   section#socials {
      max-width: 32ch;
   }

   section#content {
      max-width: 80ch;
      display: grid;
      gap: 1em;
      padding-block: 1em;

      h2 {
         text-align: center;
         padding-inline: 1em;
      }
   }

   article {
      max-width: 50ch;
   }

   article#me {
      position: sticky;
      align-self: start;
      top: 5rem;
      padding-block: 1em;
   }

   div#sponsor {
      padding-block: 3em 2em;
      display: flex;
   }
</style>

<!-- this lives down the bottom because it screws with the syntax highlighting -->
<svelte:head>
   <style {@attach injectStyles(color)}></style>
</svelte:head>
