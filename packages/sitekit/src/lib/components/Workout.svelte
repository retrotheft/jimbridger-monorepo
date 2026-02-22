<script lang="ts">
   import DateDisplay from "./DateDisplay.svelte";
   import Heart from '$lib/assets/Heart.svelte'
   import Power from "$lib/assets/Power.svelte";
   import Time from "$lib/assets/Time.svelte";

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
