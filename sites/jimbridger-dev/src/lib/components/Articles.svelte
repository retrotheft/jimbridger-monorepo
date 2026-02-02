<script lang="ts">
   let { data: articles } = $props();

   $effect(() => {
      console.log($state.snapshot(articles));
   });
</script>

{#each articles as article}
   {article.title}
{/each}
