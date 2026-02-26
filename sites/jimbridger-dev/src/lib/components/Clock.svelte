<script lang="ts">
   import { onMount } from "svelte";

   let timestamp = $state(Date.now())

   onMount(() => {
      const intervalId = setInterval(() => {
         timestamp = Date.now()
      }, 1000)

     return () => {
        clearInterval(intervalId)
     }
   })
</script>

{new Date(timestamp).toLocaleTimeString("en-au", {
   timeZone: 'Australia/Melbourne'
})}
