<script lang="ts">
   import GitHubStar from "$lib/assets/GitHubStar.svelte";
   import DevToFollower from "$lib/assets/DevToFollower.svelte";
   import TypescriptLogo from "$lib/assets/TypescriptLogo.svelte";
   import SvelteLogo from "$lib/assets/SvelteLogo.svelte";
   import CSSLogo from '$lib/assets/CSSLogo.svelte'
   import HeaderPopup from './HeaderPopup.svelte'
   import VideoTracker from './VideoTracker.svelte'
   import Clock from './Clock.svelte'
   import Workouts from './Workouts.svelte'
</script>

<header>
   <div>
      <ul>
         <li class="has-popup">
            <HeaderPopup>
               <div class="popup-content">
                  <p>This is the total number of github stars given to repositories that I own.</p>
                  <footer>Data is collected from the github api and cached in Cloudflare KV.</footer>
               </div>
            </HeaderPopup>
            <span id="stars" class="resource"><GitHubStar />47</span>
         </li>
         <!-- <li><span id="followers" class="resource"><DevToFollower />49</span></li> -->
      </ul>
      <ul class="has-popup">
         <HeaderPopup>
            <div class="popup-content">
               <p>These numbers indicate the total number of commits to repositories that I own, divided by language.</p>
               <p>It's a pretty loose metric already so I leave it to the user to decide how many hours it represents.</p>
               <footer>Data is collected from the github api and cached in Cloudflare KV.</footer>
            </div>
         </HeaderPopup>
         <li><SvelteLogo /><span id="svelte" class="commits">681</span></li>
         <li>
            <TypescriptLogo /><span id="typescript" class="commits">496</span>
         </li>
         <li><CSSLogo /><span id="css" class="commits">175</span></li>
      </ul>
   </div>
   <ul>
      <li>Home</li>
      <li>Library</li>
      <li>Games</li>
   </ul>
   <ul>
      <li class="has-popup right">workouts
         <HeaderPopup>
            <Workouts />
         </HeaderPopup>
      </li>
      <li class="has-popup right">habits
         <HeaderPopup>
            <ul id="habits">
               <li>Walk</li>
               <li>Gym</li>
               <li>Code</li>
            </ul>
         </HeaderPopup>
      </li>
      <li class="has-popup">0 / 26 videos
         <HeaderPopup>
            <div class="popup-content">
               <VideoTracker />
            </div>
         </HeaderPopup>
      </li>
      <!-- <li>43rd day</li>
      <li>16:00</li> -->
      <li>status (zZZ)</li>
      <li class="has-popup right">
         <Clock />
         <HeaderPopup>
            <div class="popup-content">
               <p>This is the time in <strong>Melbourne, Australia</strong> right now, where I live.</p>
            </div>
         </HeaderPopup>
      </li>
      <li>?</li>
      <li>menu</li>
   </ul>
</header>

<style>
   :global(header svg) {
      --size: 24px;
      width: var(--size);
      height: var(--size);
   }

   header {
      --_padding: 1em 1em;
      user-select: none;
      background-color: oklch(15% 0 0 / 0.3);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      /*justify-content: space-between;*/
      align-items: center;
      font-weight: bold;
      white-space: nowrap;

      > :first-child {
         justify-content: start;
      }

      > ul:nth-child(2) {
         justify-content: center;
      }

      > ul:last-child {
         justify-content: flex-end;
      }
   }

   header > div {
      display: flex;
   }

   header > div > ul:first-child > li:first-child {
      padding-inline: 1em;
   }

   ul {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1em;
      margin-block: 0;
      padding-inline-start: 0;
   }

   li {
      list-style-type: none;
      display: flex;
      gap: 0.5em;
      justify-content: center;
      align-items: center;
      position: relative;
      padding-block: var(--_padding);
      padding-inline: 0.5em;
      min-width: 3ch;
   }

   span {
      display: flex;
      align-items: center;
      gap: 0.25em;
      font-size: 1rem;
   }

   span.resource,
   span.commits {
      font-size: 1.2rem;
      font-weight: 800;
      font-family: 'Exo 2';
   }

   .has-popup {
      position: relative;
   }

   .has-popup:hover {
      background-color: oklch(5% 0 0 / 0.9);
   }

   .popup-content {
      min-width: 35ch;
      font-size: 0.9rem;
      padding: 0.5em 1em;
      line-height: 1.3em;

      p:first-child {
         margin-top: 0;
      }

      footer {
         font-size: 0.75rem;
      }
   }

   ul#habits {
      display: grid;
   }

   span#stars {
      color: gold;
      /*transform: translateY(2px);*/
   }

   /*span#followers {
      color: white;
      transform: translateY(2px);
   }*/

   span#svelte {
      color: #fb3c1c;
      color: #fc7963;
      color: oklch(61% .2 30);
   }

   span#typescript {
      color: cornflowerblue;
   }

   span#css {
      color: blueviolet;
   }
</style>
