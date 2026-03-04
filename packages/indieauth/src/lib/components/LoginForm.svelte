<script lang="ts">
   import { type RemoteForm } from "@sveltejs/kit";
   let { form }: { form: RemoteForm<any, any> } = $props()
</script>

<form id="login-form" {...form}>
   <label for="username">Username</label>
   <input type="text" id="username" />
   <label for="password">Password</label>
   <input type="password" id="password" />
   <button type="submit">Login</button>
</form>
