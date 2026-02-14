// src/hooks.server.ts
import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async ({ error, status, message }) => {
  console.error(error);

  return {
    message: error instanceof Error ? error.message : message
  };
};
