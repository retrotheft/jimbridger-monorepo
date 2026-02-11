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
</script>

<svelte:head>
   <style {@attach injectStyles(color)}></style>
</svelte:head>

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
         <!-- <h2>Sponsored by</h2>
         <ul id="sponsors">
            <li>Epicenter</li>
         </ul> -->
         <div id="sponsor">
            <SponsoredByEpicenter />
         </div>
         <section id="blurb">
            <!-- This is my voice on tv! -->
            <MarkdownIt {content} />
         </section>
         <section id="socials">
            <h2>social</h2>
            <ul>
               <li>github</li>
               <li>discord</li>
            </ul>
         </section>
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
      /*position: sticky;*/
      top: 0;
      /*background-color: var(--_bg-color);*/
      /*width: 160ch;*/
      /*height: 100vh;*/
   }

   section:not(#blurb) {
      box-sizing: border-box;
      /*flex: 1 0 50%;*/
      /*min-width: 50ch;*/
      display: grid;
      /*place-items: center;*/
      /*padding: 1em;*/
      /*align-items: start;*/
      align-content: start;
      /*border: 1px dotted hotpink;*/
   }

   section#header {
      color: white;
      /*position: sticky;*/
      /*align-self: start;*/
      /*top: 0;*/
      /*place-items: start;*/
   }

   section#blurb {
      max-width: 32ch;
   }

   section#socials {
      max-widtH: 32ch;
   }

   section#content {
      /*height: 100%;*/
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
      /*border: 1px dotted lightgrey;*/
      /*border-radius: 1em;*/
      /*padding: 1em;*/
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
      /*justify-content: flex-end;*/
   }
</style>
