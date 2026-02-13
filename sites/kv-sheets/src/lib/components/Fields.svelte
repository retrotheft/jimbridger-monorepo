<script lang="ts">
   let { currentValue, callback }: { currentValue?: string[], callback: (fields: string[]) => void } = $props()

   let value = $state("")

   const parse = (s: string) => s.split(",").map(f => `${f.trim()}`);

   const fields = $derived(parse(value))

   function onclick() {
      const json = JSON.stringify(fields)
      callback(fields)
   }

   function onkeydown(e: KeyboardEvent) {
      if (e.code === "Enter") callback(fields)
   }
</script>

<input type="text" bind:value {onkeydown} />
<button {onclick}>Update</button>

{fields}

<h2>Fields</h2>
<ul>
   {#each fields as field}
      <li>{field}</li>
   {/each}
</ul>

{JSON.stringify(fields)}
