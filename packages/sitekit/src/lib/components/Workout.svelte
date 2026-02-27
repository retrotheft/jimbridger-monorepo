<script lang="ts">
   import DateDisplay from "./DateDisplay.svelte";
   import Heart from '$lib/assets/svelte-svgs/Heart.svelte'
   import Power from "$lib/assets/svelte-svgs/Power.svelte";
   import Time from "$lib/assets/svelte-svgs/Time.svelte";

   let { workout, moveIndex } = $props()
</script>

<div class="workout">
   <div class="stats">
      <span><Time />{workout[1]}m</span>
      <span><Power />{workout[2]}W</span>
      <span><Heart />{workout[3]}bpm</span>
   </div>
   <!-- <li>METs: {workout[4]}</li> -->
</div>

<style>
   div.stats {
      display: flex;
      justify-content: space-evenly;
      gap: 1em;
   }

   span {
      display: flex;
      align-items: center;
      gap: 0.5ch;
   }
</style>
