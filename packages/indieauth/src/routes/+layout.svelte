<script lang="ts">
   import '../app.css'
   import LogoutButton from '$lib/components/LogoutButton.svelte';
   import { logout } from "$lib/auth.remote.js";

   let { children } = $props()
</script>

<header>
   <LogoutButton command={logout} />
</header>

{@render children?.()}
