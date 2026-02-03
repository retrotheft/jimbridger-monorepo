<script lang="ts">
   import { getActivityFeed } from "$lib/remote/discussions.remote";
   import DiscussionComment from '$lib/components/DiscussionComment.svelte'
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
