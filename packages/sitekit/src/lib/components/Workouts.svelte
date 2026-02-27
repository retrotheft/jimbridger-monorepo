<script lang="ts">
   import { onMount } from "svelte";
   import { RS, US } from "$lib/constants.js";
   import Workout from "./Workout.svelte";
   import DateDisplay from "./DateDisplay.svelte";
   import LineChart from "./LineChart.svelte";
   import type { DataSet, DataPoint } from "$lib/types/index.js";

   let data = $state<string[][]>([[]]);
   let currentIndex = $state(0);
   const currentDate = $derived(data[currentIndex][0] ?? Date.now());
   const [data1, data2] = $derived(mapChartData());

   onMount(async () => {
      const response = await fetch("workouts.txt");
      const body = await response.text();
      data = body.split(RS).map((r) => r.split(US));
      currentIndex = data.length - 1;
   });

   function moveIndex(step: number) {
      currentIndex = Math.max(
         0,
         Math.min(data.length - 1, currentIndex + step),
      );
   }

   function mapChartData() {
      const hrData: DataPoint[] = [];
      const powerData: DataPoint[] = [];
      if (data.length < 2) return [hrData, powerData];
      data.forEach((row) => {
         hrData.push({ date: row[0], value: +row[3] });
         powerData.push({ date: row[0], value: +row[2] });
      });
      return [hrData, powerData];
   }
</script>

<div>
   <header>
      <button onclick={() => moveIndex(-1)} disabled={currentIndex < 1}
         >◀</button
      >
      <DateDisplay dateString={currentDate} />
      <button
         onclick={() => moveIndex(1)}
         disabled={currentIndex === data.length - 1}>▶</button
      >
   </header>
   {#if data.length > 0}
      <Workout workout={data[currentIndex]} {moveIndex} />
   {/if}
   {#if data1.length > 0 && data2.length > 0}
      <div id="chart-container">
         <LineChart
            {currentIndex}
            datasets={[
               { data: data1, color: "hotpink", label: "heart" },
               { data: data2, color: "gold", label: "power" },
            ]}
            yMin={120}
            yMax={250}
            aspectRatio={2}
         />
      </div>
   {/if}
   <footer>
      <p>data via <strong>Cloudflare KV</strong></p>
      <p>icons from <strong>thenounproject.com</strong></p>
   </footer>
</div>

<style>
   header {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      text-align: center;
      align-items: center;
      /*display: flex;
      justify-content: space-around;*/
   }

   div {
      min-width: 40ch;
      display: grid;
      /*justify-items: space-around;*/
      /*justify-items: center;*/
      gap: 1em;
   }

   footer {
      border-top: 1px solid grey;
      font-size: 0.8rem;
      display: flex;
      justify-content: space-between;
   }

   /*div#chart-container {
      border: 1px dotted yellow;
   }*/
</style>
