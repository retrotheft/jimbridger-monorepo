<script lang="ts">
   import markdownit from 'markdown-it'

   let { content }: { content: string } = $props()

   const md = markdownit()
   let body = $state('')

   $effect(() => {
      body = md.render(content)
   })
</script>

<div class="markdown">
   {@html body}
</div>
