<script lang="ts">
   import { getActivityFeed } from "$lib/remote/discussions.remote";
   import DiscussionComment from "$lib/components/DiscussionComment.svelte";
   import "$lib/assets/activity.css";
   import { cache } from "$lib/functions/cache";
   import { PanelGlass } from "sitekit";
</script>

<main id="activity">
   <ol>
      {#each await cache({ getActivityFeed }, { username: "retrotheft", discussionNum: 3 }) as comment}
         <PanelGlass tag="li" color="oklch(45% 0 0 / 0.1)">
            <DiscussionComment {comment} />
         </PanelGlass>
      {/each}
   </ol>
</main>
