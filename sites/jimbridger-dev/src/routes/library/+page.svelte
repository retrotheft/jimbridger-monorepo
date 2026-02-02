<script lang="ts">
   import { getArticles, ArticleCompact } from 'dev-to'
   import '$lib/assets/library.css'
   import { cache } from "$lib/functions/cache";
</script>

<main id="library">
   <ol>
      {#each await cache({ getArticles }) as article}
         <li><ArticleCompact {article} /></li>
      {/each}
   </ol>
</main>
