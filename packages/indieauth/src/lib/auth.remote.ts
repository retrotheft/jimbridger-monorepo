import { form, command, getRequestEvent } from '$app/server';
import { redirect, invalid } from '@sveltejs/kit';
import { z } from 'zod';
import { checkPassword, createSessionCookie } from '$lib/server/session.js';
import { ADMIN_PASSWORD, COOKIE_SECRET } from '$env/static/private';

// Validation schema for login
const loginSchema = z.object({
   username: z.string().min(1, 'Username is required'),
   password: z.string().min(1, 'Password is required')
});

// Login form with validation
export const login = form(
   loginSchema,
   async ({ username, password }) => {
      const { cookies } = getRequestEvent()

      const isValid = checkPassword(password, ADMIN_PASSWORD);

      if (!isValid) {
         console.log("Not valid")
         invalid('Invalid username or password');
      }

      // Create signed session cookie
      const cookieValue = await createSessionCookie(username, COOKIE_SECRET);

      cookies.set('session', cookieValue, {
         path: '/',
         httpOnly: true,
         secure: true,
         sameSite: 'lax',
         maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      throw redirect(303, '/admin');
   }
);

// Logout command
export const logout = command(async () => {
   const { cookies } = getRequestEvent()
   cookies.delete('session', {
      path: '/'
   });
});
