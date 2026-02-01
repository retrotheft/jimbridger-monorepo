<script lang="ts">
   import { type DiscussionCommentType } from "$lib/types/index.js";

   let { comment }: { comment: DiscussionCommentType } = $props()
</script>

<article>
   <header>
      <span>{new Date(comment.createdAt).toLocaleDateString('en-au')}</span>
   </header>
   <p>{comment.body}</p>
   <footer>{comment.author.login}</footer>
</article>
