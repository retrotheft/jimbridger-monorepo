<script lang="ts">
   import { cache } from "$lib/functions/cache";
   import { getFollowers } from "$lib/remote/followers.remote";
</script>

{#each await cache({ getFollowers }) as follower}
   {JSON.stringify(follower)}
{/each}
