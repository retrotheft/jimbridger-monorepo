<script>
   import { cache } from "$lib/functions/cache";
   import { getActivityFeed } from "$lib/remote/discussions.remote";
   import DiscussionComment from "$lib/components/DiscussionComment.svelte";
   import content from "$lib/assets/bio.md?raw";
   import MarkdownIt from "$lib/components/MarkdownIt.svelte";
   import { PanelGlass } from "sitekit";

   const technologies = ['Typescript', 'Svelte', 'Semantic HTML', 'Vanilla CSS', 'Rust'];
   const colors = ['cornflowerblue', 'red', 'yellow', 'lightgreen', 'orange']
</script>

<main id="home">
   <section id="header">
      <!-- <PanelGlass tag="article" color="oklch(45% 0 0 / 0.1)"> -->
      <article id="me">
         <h1>Jim Bridger</h1>
         <p>Hypercreative Open-Source Developer</p>
         <ul id="technologies">
            {#each technologies as t, i}
               <PanelGlass tag="li" color={`oklch(from ${colors[i]} 55% c h / 0.9)`}>{t}</PanelGlass>
            {/each}
         </ul>
         <h2>Sponsored by</h2>
         <ul id="sponsors">
            <li>Epicenter</li>
         </ul>
         <section id="blurb">
            <!-- This is my voice on tv! -->
            <MarkdownIt {content} />
         </section>
      </article>
      <!-- </PanelGlass> -->

   </section>
   <section id="content">
      <section id="recent">
      <h2>Recent Activity</h2>
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
      gap: 0;
      position: sticky;
      top: 0;
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

   section#content {
      /*height: 100%;*/
      display: grid;
      gap: 1em;
   }

   section#blurb {
      /*place-items: start;*/
   }

   section#content > * {
      height: 750px;
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
   }

   ul#technologies {
      display: flex;
      flex-wrap: wrap;
      /*font-family: monospace;*/
      /*gap: 1em;*/
      font-size: 0.8rem;
   }
</style>
