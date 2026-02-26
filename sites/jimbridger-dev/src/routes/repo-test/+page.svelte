<script lang="ts">
   import { getReposWithStats } from "$lib/remote/commits.remote";
   import { calculateCommitsByLanguage, calculateTotalStars } from "$lib/functions/commits-by-language";

   const getReposWithStatsQuery = getReposWithStats({ username: "retrotheft", first: 13 })

   $inspect(getReposWithStatsQuery.current)
</script>

<button onclick={() => calculateCommitsByLanguage(getReposWithStatsQuery.current)}>Calculate</button>
<button onclick={() => console.log(calculateTotalStars(getReposWithStatsQuery.current))}>Stars</button>
