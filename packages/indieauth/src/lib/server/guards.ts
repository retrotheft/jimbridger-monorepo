import { redirect, type RequestEvent } from '@sveltejs/kit'
import type { AuthLocals } from '$lib/types/index.js'

export interface GuardOptions {
   redirectTo: string;
}

// Require authentication to access a route
// Throws redirect if user is not authenticated
// Usage in +page.server.ts or +layout.server.ts:
//   export async function load({ locals }) {
//     requireAuth(locals, { redirectTo: '/login' });
//     return { ... };
//   }
export function requireAuth(
   locals: AuthLocals,
   options: GuardOptions = { redirectTo: '/login' }
): void {
   if (!locals.user || !locals.user.authenticated) {
      throw redirect(303, options.redirectTo)
   }
}

// Require NO authentication (for login/signup pages)
// Throws redirect if user is already authenticated
// Usage in +page.server.ts (e.g., login page):
//   export async function load({ locals }) {
//     requireNoAuth(locals, { redirectTo: '/dashboard' });
//     return { ... };
//   }
export function requireNoAuth(
   locals: AuthLocals,
   options: GuardOptions = { redirectTo: '/' }
): void {
   if (locals.user && locals.user.authenticated) {
      throw redirect(303, options.redirectTo);
   }
}

// Helper to check authentication status without throwing
// Useful when you want to conditionally render content
export function isAuthenticated(locals: AuthLocals): boolean {
   return !!(locals.user && locals.user.authenticated);
}

// Helper to get current user or null
export function getCurrentUser(locals: AuthLocals): AuthLocals['user'] {
   return locals.user;
}
