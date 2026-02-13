<script lang="ts">
   import Fields from '$lib/components/Fields.svelte'

   function callback(fields: string[]) {
      console.log("Updating", fields)
   }
</script>

<Fields {callback} />
