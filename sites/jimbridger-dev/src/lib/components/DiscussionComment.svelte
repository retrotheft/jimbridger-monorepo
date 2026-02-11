<script lang="ts">
   import { type DiscussionCommentType } from "$lib/types/index.js";
   import markdownit from "markdown-it";

   let { comment }: { comment: DiscussionCommentType } = $props();

   const md = markdownit();
   let body = $state("");

   $effect(() => {
      body = md.render(comment.body);
   });
</script>

<!-- <article> -->
   <!-- <header>
      <span>{new Date(comment.createdAt).toLocaleString(undefined, {
        dateStyle: 'long',
        timeStyle: 'short',
      })}</span>
   </header> -->
   <div class="markdown">{@html body}</div>
   <footer>{new Date(comment.createdAt).toLocaleString(undefined, {
     weekday: 'short',
     year: '2-digit',
     month: 'short',
     day: 'numeric',
     // hour: 'numeric',
     // minute: 'numeric',
   })}</footer>
<!-- </article> -->

<style>
   footer {
      text-align: right;
   }
</style>
