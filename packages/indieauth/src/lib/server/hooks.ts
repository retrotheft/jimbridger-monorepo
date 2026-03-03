import type { Handle, RequestEvent } from '@sveltejs/kit'
import { verifySessionCookie } from './session.ts'
import { type AuthLocals } from '$lib/types/index.js';

export interface AuthHandleOptions {
   cookieSecret: string,
   cookieName?: string,
   maxAgeMs?: number
}

// SvelteKit handle hook to verify session on every request
// Usage in hooks.server.ts:
//   export const handle = authHandle({ cookieSecret: env.COOKIE_SECRET });
//
// Or compose with other handles:
//   import { sequence } from '@sveltejs/kit/hooks';
//   export const handle = sequence(
//     authHandle({ cookieSecret: env.COOKIE_SECRET }),
//     otherHandle
//   );
export function authHandle(options: AuthHandleOptions): Handle {
   const { cookieSecret, cookieName = 'session', maxAgeMs = 7 * 24 * 60 * 60 * 1000 } = options;

   return async ({ event, resolve }: { event: RequestEvent; resolve: any }) => {
      const cookieValue = event.cookies.get(cookieName)

      const sessionData = await verifySessionCookie(cookieValue, cookieSecret, maxAgeMs)

      if (sessionData.valid && sessionData.userId) {
         (event.locals as AuthLocals).user = {
            id: sessionData.userId,
            authenticated: true
         }
      } else {
         (event.locals as AuthLocals).user = null
      }

      return resolve(event)
   }
}
