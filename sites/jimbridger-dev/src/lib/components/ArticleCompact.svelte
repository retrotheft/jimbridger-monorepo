<script lang="ts">
   import { type DevToArticle } from "$lib/types/index.js";

   let { article }: { article: DevToArticle } = $props()
</script>

<article>
   <img src={article.cover_image} alt={article.title} title={article.title} />
   <header>
      <p>{article.title}</p>
   </header>
   <footer>
      <p>Reading time: {article.reading_time_minutes}min</p>
   </footer>
</article>
