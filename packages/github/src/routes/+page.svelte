<script lang="ts">
   import { getActivityFeed } from "$lib/discussions.remote.js";
   import DiscussionComment from '$lib/components/DiscussionComment.svelte'
   // const activityFeed = getActivityFeed('retrotheft')

   // $effect(() => {
   //    console.log(activityFeed.current)
   // })
</script>

{#each await getActivityFeed({ username: 'retrotheft', discussionNum: 3 }) as comment}
   <DiscussionComment {comment} />
{/each}
