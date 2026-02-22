<script lang="ts">
   import { onMount } from 'svelte'
   import { RS, US } from "$lib/constants.js";
   import Workout from './Workout.svelte';
   import DateDisplay from './DateDisplay.svelte';

   let data = $state<string[][]>([[]])
   let currentIndex = $state(0)
   const currentDate = $derived(data[currentIndex][0] ?? Date.now())

   onMount(async () => {
      const response = await fetch('workouts.txt')
      const body = await response.text()
      data = body.split(RS).map(r => r.split(US))
      currentIndex = data.length - 1
   })

   function moveIndex(step: number) {
      currentIndex = Math.max(0, Math.min(data.length - 1, currentIndex + step))
   }
</script>

<div>
   <header>
      <button onclick={() => moveIndex(-1)} disabled={currentIndex < 1}>Prev</button>
      <DateDisplay dateString={currentDate} />
      <button onclick={() => moveIndex(1)} disabled={currentIndex === data.length - 1}>Next</button>
   </header>
   {#if data.length > 0}
      <Workout workout={data[currentIndex]} {moveIndex} />
   {/if}
   <footer>
      <p>data via <strong>kv-sheets</strong>, my simplified spreadsheet app backed by Cloudflare KV.</p>
      <p>icons from <strong>thenounproject.com</strong></p>
   </footer>
</div>

<style>
   div {
      min-width: 40ch;
      display: grid;
      /*justify-items: space-around;*/
      justify-items: center;
      gap: 1em;
   }

   footer {
      font-size: 0.8rem;
   }
</style>
