<script lang="ts">
   import { JoinLoop } from 'svelte-mainloop'

   let seconds = $state(Date.now())

   function update(_: number) {
      seconds = Date.now()
   }
</script>

<JoinLoop {update} />

{new Date(seconds).toLocaleTimeString("en-au", {
   timeZone: 'Australia/Melbourne'
})}
