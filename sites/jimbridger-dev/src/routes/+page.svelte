<script lang="ts">
   import { cache } from "$lib/functions/cache";
   import { getActivityFeed } from "$lib/remote/discussions.remote";
   import DiscussionComment from "$lib/components/DiscussionComment.svelte";
   import content from "$lib/assets/bio.md?raw";
   import MarkdownIt from "$lib/components/MarkdownIt.svelte";
   import { Avatar, PanelGlass, SponsoredByEpicenter } from "sitekit";
   import { getLayoutContext } from "$lib/contexts/layout";

   const technologies = ['Typescript', 'Svelte', 'HTML', 'CSS', 'Rust'];
   const colors = ['#2d69b4', '#f33a1b', '#cfc22f', 'limegreen', 'orange']

   const { setColor } = getLayoutContext()
</script>

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
                  <button onclick={() => setColor(colors[i])}>{t}</button>
               </PanelGlass>
            {/each}
         </ul>
         <section id="blurb">
            <MarkdownIt {content} />
         </section>
         <section id="socials">
            <h2>social</h2>
            <ul>
               <li><svg aria-hidden="true" class="text-accent-600 dark:text-accent-200" width="25" height="25" viewBox="0 0 24 24" fill="lightgrey" style="--sl-icon-size: 1em;">
               <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.08 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3Z"></path></svg></li>
               <li><svg width="32" height="32" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                   <g>
                       <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#5865F2" fill-rule="nonzero">

               </path>
                   </g>
               </svg></li>
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
                  <PanelGlass tag="li">
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

      ul {
         display: flex;
         gap: 0.5em;
         align-items: center;
      }
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
