import type { HandleServerError } from '@sveltejs/kit';

// this just passes through the server error to the client
// Svelte normally obfuscates it as an http 500 error, for security
export const handleError: HandleServerError = async ({ error, status, message }) => {
   console.error(error);

   return {
      message: error instanceof Error ? error.message : message
   };
};
