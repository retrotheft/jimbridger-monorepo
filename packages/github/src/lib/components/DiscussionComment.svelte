<script lang="ts">
   import { type DiscussionComment } from "$lib/types/index.js";

   let { comment }: { comment: DiscussionComment } = $props()
</script>

<article>
   <header>
      <span>{new Date(comment.createdAt).toLocaleDateString('en-au')}</span>
   </header>
   <p>{comment.body}</p>
   <footer>{comment.author.login}</footer>
</article>
