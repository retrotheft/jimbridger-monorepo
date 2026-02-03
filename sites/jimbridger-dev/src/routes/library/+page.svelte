<script lang="ts">
   import { getArticles } from '$lib/remote/articles.remote';
   import ArticleCompact from '$lib/components/ArticleCompact.svelte'
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
