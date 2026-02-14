<script lang="ts">
   import { getValue } from '$lib/remote/kv.remote'
   import { onMount } from 'svelte';

   const getValueQuery = getValue('video-tracker:1')

   let data = $state('')

   onMount(async () => {
      const response = await getValueQuery
      const result = await JSON.parse(response)
      data = result.data
      console.log(data.length)
   })
</script>

{#if data}
   {#each data.split('') as char}
      {char}<br />
   {/each}
{/if}
