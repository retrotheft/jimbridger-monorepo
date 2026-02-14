<script lang="ts">

   let { testCSV } = $props()

   const metadata = $derived(testCSV?.metadata ?? { fields: [] })
   const rows = $derived(testCSV?.value.split('\n') ?? [])

   $inspect(testCSV)
</script>

<ol>
   {#each rows as row}
      <li>{row}</li>
   {/each}
</ol>

<table>
   <thead>
      <tr>
         {#each metadata.fields as field}
            <th>{field}</th>
         {/each}
      </tr>
   </thead>
   <tbody>
      {#each rows as row}
         <tr>
            {#each row.split(',') as value}
               <td><input type="text" {value} /></td>
            {/each}
         </tr>
      {/each}
   </tbody>
</table>

<style>
   td, th {
      background-color: oklch(75% 0 0 / 0.25);
   }

   input {
      all: unset;
      background-color: oklch(0 0 0 / 0.75);
      padding: 0.5em;
   }
</style>
