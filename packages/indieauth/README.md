# IndieAuth Session Library

Simple signed cookie session authentication for SvelteKit apps.

## Setup

### 1. Configure environment variables

```bash
# .env
ADMIN_PASSWORD=your-secure-password
COOKIE_SECRET=your-random-secret-min-32-chars
```

### 2. Set up hooks

Create or update `src/hooks.server.ts`:

```typescript
import { authHandle } from '$lib/server/auth';
import { env } from '$env/dynamic/private';

export const handle = authHandle({
   cookieSecret: env.COOKIE_SECRET
});
```

### 3. Create login page

`src/routes/login/+page.svelte`:

```svelte
<script lang="ts">
   import { enhance } from '$app/forms';
   export let form;
</script>

<h1>Login</h1>

<form method="POST" use:enhance>
   <input 
      type="password" 
      name="password" 
      placeholder="Password"
      required 
   />
   <button type="submit">Login</button>
   
   {#if form?.error}
      <p class="error">{form.error}</p>
   {/if}
</form>
```

`src/routes/login/+page.server.ts`:

```typescript
import { loginAction, requireNoAuth } from '$lib/server/auth';
import { env } from '$env/dynamic/private';

export async function load({ locals }) {
   requireNoAuth(locals, { redirectTo: '/admin' });
}

export const actions = {
   default: async (event) => loginAction(event, {
      passwordEnvVar: env.ADMIN_PASSWORD,
      cookieSecret: env.COOKIE_SECRET,
      redirectTo: '/admin'
   })
};
```

### 4. Create logout action

`src/routes/logout/+page.server.ts`:

```typescript
import { logoutAction } from '$lib/server/auth';

export const actions = {
   default: logoutAction
};
```

Or in a `+layout.server.ts` to have logout available everywhere:

```typescript
import { logoutAction } from '$lib/server/auth';

export const actions = {
   logout: (event) => logoutAction(event, { redirectTo: '/login' })
};
```

### 5. Protect routes

`src/routes/admin/+layout.server.ts`:

```typescript
import { requireAuth } from '$lib/server/auth';

export async function load({ locals }) {
   requireAuth(locals, { redirectTo: '/login' });
   
   return {
      user: locals.user
   };
}
```

### 6. Use authentication state in pages

`src/routes/+layout.server.ts`:

```typescript
export async function load({ locals }) {
   return {
      user: locals.user
   };
}
```

`src/routes/+layout.svelte`:

```svelte
<script lang="ts">
   export let data;
</script>

<nav>
   {#if data.user}
      <span>Logged in as {data.user.id}</span>
      <form method="POST" action="?/logout">
         <button>Logout</button>
      </form>
   {:else}
      <a href="/login">Login</a>
   {/if}
</nav>

<slot />
```

## API Reference

### Actions

#### `loginAction(event, options)`

Handle login form submission.

Options:
- `passwordEnvVar: string` - The admin password from env
- `cookieSecret: string` - Secret for signing cookies
- `cookieName?: string` - Cookie name (default: 'session')
- `redirectTo?: string` - Where to redirect on success (default: '/')
- `userId?: string` - User ID to store (default: 'admin')

#### `logoutAction(event, options)`

Handle logout form submission.

Options:
- `cookieName?: string` - Cookie name (default: 'session')
- `redirectTo?: string` - Where to redirect (default: '/')

### Hooks

#### `authHandle(options)`

SvelteKit handle hook to verify sessions.

Options:
- `cookieSecret: string` - Secret for verifying cookies
- `cookieName?: string` - Cookie name (default: 'session')
- `maxAgeMs?: number` - Max session age in ms (default: 7 days)

Populates `event.locals.user` with:
```typescript
{
   id: string;
   authenticated: boolean;
} | null
```

### Guards

#### `requireAuth(locals, options)`

Protect authenticated routes. Throws redirect if not logged in.

Options:
- `redirectTo: string` - Where to redirect (default: '/login')

#### `requireNoAuth(locals, options)`

Protect unauthenticated routes (login page). Throws redirect if already logged in.

Options:
- `redirectTo: string` - Where to redirect (default: '/')

#### `isAuthenticated(locals)`

Returns `boolean` - check auth status without throwing.

#### `getCurrentUser(locals)`

Returns `App.Locals['user']` - get current user or null.

## TypeScript

Add type definitions to `src/app.d.ts`:

```typescript
declare global {
   namespace App {
      interface Locals {
         user: {
            id: string;
            authenticated: boolean;
         } | null;
      }
   }
}

export {};
```

## Security Notes

- Always use HTTPS in production (cookies are `secure: true`)
- Use a strong random string for `COOKIE_SECRET` (min 32 chars)
- Cookies are `httpOnly`, `sameSite: 'lax'`, signed with HMAC-SHA256
- Session expires after 7 days by default
- No session storage needed - all state is in signed cookie
