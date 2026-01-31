<script lang="ts">
   import { type DiscussionComment } from "$lib/types/index.js";

   let { comment }: { comment: DiscussionComment } = $props()
</script>

<article>
   <header>
      <span>{comment.createdAt}</span>
   </header>
   <p>{comment.body}</p>
   <footer>{comment.author.login}</footer>
</article>
