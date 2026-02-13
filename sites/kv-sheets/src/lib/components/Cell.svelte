<script lang="ts">
   let { row, field, value = $bindable() }: { row: string, field: string, value: string } = $props()
</script>

<input type="text" placeholder={`${row}-${field}`} bind:value />
