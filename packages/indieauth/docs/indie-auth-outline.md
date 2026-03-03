# Indie Auth Library

Here's the final structure:

```
lib/server/
├── session.js           # Your password-based admin auth
│   # - checkPassword()
│   # - signCookieValue()
│   # - verifyCookieSignature()
│   # - createSessionCookie()
│   # - verifySessionCookie()
│   # - clearSessionCookie()
│
├── oauth-server.js      # OAuth provider (when others log in via you)
│   # - generateAuthorizationCode()
│   # - validateOAuthParams()
│   # - buildRedirectUrl()
│   # - verifyPKCE()
│   # - hashCodeVerifier()
│
├── indieauth.js         # IndieAuth discovery
│   # - fetchClientMetadata()
│   # - validateRedirectUri()
│
├── storage.js           # Durable Objects (auth codes only)
│   # - storeAuthCode()
│   # - getAuthCode()
│   # - deleteAuthCode()
│   # - cleanupExpired()
│
├── hooks.js             # SvelteKit handle function
│   # - authHandle()
│
├── actions.js           # SvelteKit form actions
│   # - loginAction()
│   # - logoutAction()
│
├── guards.js            # Route protection
│   # - requireAuth()
│   # - requireNoAuth()
│
├── utils.js             # Shared utilities
│   # - base64URLEncode()
│   # - base64URLDecode()
│   # - generateRandomString()
│   # - isExpired()
│
└── index.js             # Public exports
```

This is clean, focused, and covers both your admin session auth and IndieAuth server functionality without any OAuth client bloat.

**Realistic timeline: 6-10 hours total**

Breakdown:
- **Session auth (2-3 hours)**: Password checking, HMAC signing, cookies. Pretty straightforward.
- **OAuth server basics (2-3 hours)**: Generating codes, validating params, building redirect URLs. Mostly string manipulation and validation.
- **PKCE verification (1 hour)**: SHA-256 hashing and comparison. Simple once you understand the flow.
- **Durable Objects integration (2-3 hours)**: This is likely your biggest learning curve - understanding DO API, setting up bindings, testing locally.
- **IndieAuth discovery (1-2 hours)**: Fetching and parsing HTML/HTTP headers. Can be finicky with edge cases.

**Suggested approach:**
1. **Day 1 (3-4 hours)**: Get session auth working end-to-end. Login, logout, protected routes.
2. **Day 2 (3-4 hours)**: OAuth server flow without PKCE. Get the authorization endpoint working.
3. **Day 3 (2-3 hours)**: Add PKCE, Durable Objects, polish IndieAuth discovery.

The actual code isn't massive, but you'll spend time debugging the OAuth flow, testing with a real IndieAuth client, and getting DO working locally. Budget extra time for "wait, why isn't this redirect working?" moments.

Sound reasonable?
