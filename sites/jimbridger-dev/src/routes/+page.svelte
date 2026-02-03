<script>
   import { cache } from "$lib/functions/cache";
   import { getActivityFeed } from "$lib/remote/discussions.remote";
   import DiscussionComment from "$lib/components/DiscussionComment.svelte";
   import content from "$lib/assets/bio.md?raw";
   import MarkdownIt from "$lib/components/MarkdownIt.svelte";
</script>

<main id="home">
   <section id="header">
      <article id="me">
         <h1>Jim Bridger</h1>
         <p>Hypercreative Open-Source Developer</p>
         <ul id="technologies">
            <li>Typescript</li>
            <li>Svelte</li>
            <li>Semantic HTML</li>
            <li>Vanilla CSS</li>
         </ul>
         <h2>Sponsored by</h2>
         <ul id="sponsors">
            <li>Epicenter</li>
         </ul>
      </article>
   </section>
   <section id="content">
      <section id="blurb">
         <MarkdownIt {content} />
      </section>
      <section id="recent">
         <h2>Recent Activity</h2>
         <dl>
            <dt>Jan 30, 2026</dt>
            <dd>Making my site!</dd>
         </dl>
      </section>
      <section id="footer">
         <ol id="activity-feed">
            <svelte:boundary>
               {#each await cache({ getActivityFeed }, { username: "retrotheft", discussionNum: 3 }) as comment}
                  <li><DiscussionComment {comment} /></li>
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
      justify-content: stretch;
      gap: 0;
      position: sticky;
      width: 160ch;
      /*height: 100vh;*/
   }

   section {
      box-sizing: border-box;
      flex: 1 0 50%;
      min-width: 50ch;
      /*border: 1px dotted grey;*/
      display: grid;
      place-items: center;
      padding: 1em;
      /*align-items: start;*/
      align-content: start;
      position: sticky;
   }

   section#header {
      color: white;
      position: sticky;
      place-items: start;
   }

   section#content {
      height: 100%;
   }

   section#blurb {
      place-items: start;
   }

   /*section#content > * {
      height: 500px;
   }*/

   article {
      /*border: 1px dotted lightgrey;*/
      /*border-radius: 1em;*/
      padding: 1em;
      max-width: 40ch;
   }

   article#me {
      position: sticky;
      align-self: start;
      top: 5rem;
   }

   dl {
      display: grid;
      gap: 1em;
      /*border: 1px solid cornflowerblue;*/
      justify-items: start;
      justify-content: start;
      align-content: start;
      grid-template-columns: 1fr 3fr;
   }

   dt {
      text-align: right;
      font-weight: bold;
      color: #aaa;
   }

   dt,
   dd {
      /*border: 1px solid lightgreen;*/
      display: inline-block;
      width: 100%;
   }

   dd {
      margin: 0;
   }

   ul#technologies {
      display: flex;
      font-family: monospace;
      gap: 1em;
   }

   ol#activity-feed li:nth-child(n + 2) {
      display: none;
   }
</style>
