<script lang="ts">
   import { getActivityFeed, DiscussionComment } from "github";
</script>

<main id="activity">
   <ol>
      {#each await getActivityFeed({ username: 'retrotheft', discussionNum: 3 }) as comment}
         <li><DiscussionComment {comment} /></li>
      {/each}
   </ol>
</main>
