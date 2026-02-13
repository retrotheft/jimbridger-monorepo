<script lang="ts">
   let { currentValue, callback }: { currentValue: string[], callback: (fields: string[]) => void } = $props()

   // this is done to suppress the state_referenced_locally warning
   const currentValueJoined = (() => currentValue)().join(", ")

   let value = $state(currentValueJoined)

   const parse = (s: string) => s.split(",").map(f => `${f.trim()}`);

   const fields = $derived(parse(value))

   function onclick() {
      callback(fields)
   }

   function onkeydown(e: KeyboardEvent) {
      if (e.code === "Enter") callback(fields)
   }
</script>

<input type="text" bind:value {onkeydown} />
<button {onclick}>Update</button>
