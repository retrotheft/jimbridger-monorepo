<script lang="ts">
   let { row, field, value = $bindable(), callback }: { row: string, field: string, value: string, callback: () => void } = $props()

   function onkeydown(e: KeyboardEvent) {
      if (e.code === "Enter") callback()
   }
</script>

<input type="text" placeholder={`${row}-${field}`} bind:value {onkeydown} />
