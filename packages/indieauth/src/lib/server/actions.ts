import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { checkPassword, createSessionCookie, clearSessionCookie } from './session.ts';

export interface LoginActionOptions {
   passwordEnvVar: string;
   cookieSecret: string;
   cookieName?: string;
   redirectTo?: string;
   userId?: string;
}

export interface LogoutActionOptions {
   cookieName?: string;
   redirectTo?: string;
}

// Handle login form submission
// Usage in +page.server.ts:
//   export const actions = {
//     login: async (event) => loginAction(event, { ... })
//   }
export async function loginAction(
   event: RequestEvent,
   options: LoginActionOptions
) {
   const { passwordEnvVar, cookieSecret, cookieName = 'session', redirectTo = '/', userId = 'admin' } = options;

   const formData = await event.request.formData();
   const password = formData.get('password');

   if (typeof password !== 'string' || !password) {
      return fail(400, { error: 'Password is required' });
   }

   try {
      const isValid = checkPassword(password, passwordEnvVar);

      if (!isValid) {
         return fail(401, { error: 'Invalid password' });
      }

      // Create signed session cookie
      const cookieValue = await createSessionCookie(userId, cookieSecret);

      event.cookies.set(cookieName, cookieValue, {
         path: '/',
         httpOnly: true,
         secure: true,
         sameSite: 'lax',
         maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      throw redirect(303, redirectTo);
   } catch (error) {
      if (error instanceof Response) throw error; // Re-throw redirect
      console.error('Login error:', error);
      return fail(500, { error: 'Login failed' });
   }
}

// Handle logout form submission
// Usage in +page.server.ts:
//   export const actions = {
//     logout: async (event) => logoutAction(event, { ... })
//   }
export async function logoutAction(
   event: RequestEvent,
   options: LogoutActionOptions = {}
) {
   const { cookieName = 'session', redirectTo = '/' } = options;

   // Clear the session cookie
   event.cookies.delete(cookieName, {
      path: '/'
   });

   throw redirect(303, redirectTo);
}
