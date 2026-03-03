// Session management
export {
   checkPassword,
   signCookieValue,
   verifyCookieSignature,
   createSessionCookie,
   verifySessionCookie,
   clearSessionCookie
} from './session.ts';

export type { SessionData, CookieOptions } from './session.ts';

// SvelteKit actions
export {
   loginAction,
   logoutAction
} from './actions.ts';

export type { LoginActionOptions, LogoutActionOptions } from './actions.ts';

// SvelteKit hooks
export {
   authHandle
} from './hooks.ts';

export type { AuthHandleOptions } from './hooks.ts';

// Route guards
export {
   requireAuth,
   requireNoAuth,
   isAuthenticated,
   getCurrentUser
} from './guards.ts';

export type { GuardOptions } from './guards.ts';

// Utilities
export {
   base64URLEncode,
   base64URLDecode,
   generateRandomString,
   isExpired
} from './utils.ts';
