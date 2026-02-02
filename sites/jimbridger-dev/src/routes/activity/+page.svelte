<script lang="ts">
   import { getActivityFeed, DiscussionComment } from "github";
   import "$lib/assets/activity.css";
   import { cache } from '$lib/functions/cache'
</script>

<main id="activity">
   <ol>
      {#each await cache({ getActivityFeed }, { username: "retrotheft", discussionNum: 3 }, ) as comment}
         <li><DiscussionComment {comment} /></li>
      {/each}
   </ol>
</main>
