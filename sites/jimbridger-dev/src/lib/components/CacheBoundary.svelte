<script lang="ts">
   import { onMount, type Component } from 'svelte';
   import { type RemoteQueryFunction } from '@sveltejs/kit';
   import { getFromCache, setCache } from '$lib/functions/cache';

   let { key, query, Child, ttl = 2000 }: { key: string, query: RemoteQueryFunction<void, any>, Child: Component<{ data: any}>, ttl?: number } = $props()

   let data = $state<any>(null)

   onMount(async () => {
      const fromCache = getFromCache(key)
      if (fromCache) {
         console.log("Cache Hit!")
         return data = fromCache
      }
      console.log('Cache Miss...')
      const result = await query()
      setCache(key, result, ttl)
      data = result
   })
</script>

{#if data}
   <Child {data} />
{:else}
   waiting for dev.to api...
{/if}
