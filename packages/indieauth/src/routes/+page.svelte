<script lang="ts">
   import { login } from "$lib/auth.remote.js";
   import LoginForm from '$lib/components/LoginForm.svelte'

</script>

<LoginForm form={login} />
