<script lang="ts">
   import { getArticles } from "$lib/articles.remote.js";
   import ArticleCompact from '$lib/components/ArticleCompact.svelte'

   const articles = getArticles()

   $effect(() => {
      console.log(articles.current)
   })
</script>

{#each await getArticles() as article}
   <ArticleCompact {article} />
{/each}
