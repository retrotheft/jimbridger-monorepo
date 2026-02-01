<script lang="ts">
   import { getArticles, ArticleCompact } from 'dev-to'
</script>

<main id="library">
   <ol>
      {#each await getArticles() as article}
         <li><ArticleCompact {article} /></li>
      {/each}
   </ol>
</main>
