<script lang="ts">
   import { type DiscussionCommentType } from "$lib/types/index.js";
   import markdownit from 'markdown-it'

   let { comment }: { comment: DiscussionCommentType } = $props()

   const md = markdownit()
   let body = $state('')

   $effect(() => {
      body = md.render(comment.body)
   })
</script>

<article>
   <header>
      <span>{new Date(comment.createdAt).toLocaleDateString('en-au')}</span>
   </header>
   <div class="markdown">{@html body}</div>
   <footer>{comment.author.login}</footer>
</article>
