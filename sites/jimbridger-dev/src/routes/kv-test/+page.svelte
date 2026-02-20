<script lang="ts">
   import { getValue, getValueWithMetadata } from "$lib/remote/kv.remote";
   import { onMount } from "svelte";
   import { RS, US } from "$lib/constants";

   // const getValueQuery = getValue('video-tracker:1')
   const getWorkoutsQuery = getValueWithMetadata("workouts");

   let data = $state<string[][]>([[]]);

   onMount(async () => {
      const response = await getWorkoutsQuery;
      console.log(response);
      const array = response.value.split(RS).map((r) => r.split(US));
      data = array;
   });

   $inspect(getWorkoutsQuery);

   function formatDate(date: string) {
      return new Intl.DateTimeFormat("en-AU", {
         timeZone: "Australia/Melbourne",
         year: "numeric",
         month: "long",
         day: "numeric",
      }).format(new Date(date));
   }
</script>

<table>
   <tbody>
   {#each data as row}
      <tr>
         {#each row as col, i}
            <td>
               {#if i === 0}
                  {formatDate(col)}
               {:else}
                  {col}
               {/if}
            </td>
         {/each}
      </tr>
   {:else}
      <tr><td>Loading...</td></tr>
   {/each}
   </tbody>
</table>

<style>
   table {
      border-spacing: 1em 0.5em;
   }
</style>
