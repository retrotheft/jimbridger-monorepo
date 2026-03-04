<script lang="ts">
   import { type RemoteCommand } from "@sveltejs/kit";
   let { command }: { command: RemoteCommand<void, void> } = $props()

   import { goto } from "$app/navigation";

   function onclick() {
      command();
      goto("/");
   }
</script>

<button {onclick}>Logout</button>
