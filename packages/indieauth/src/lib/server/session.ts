import { base64URLEncode, base64URLDecode } from "./utils.ts";

// does userId make sense when I'm the only user?
export interface SessionData {
   valid: boolean;
   userId: string | null;
   timestamp: number | null;
}

export interface CookieOptions {
   value: string;
   path: string;
   expires: Date;
   httpOnly: boolean;
   secure: boolean;
   sameSite: 'lax' | 'strict' | 'none'
}

// Compare input password against env variable
export function checkPassword(inputPassword: string, envPassword: string): boolean {
   if (!envPassword) {
      throw new Error('ADMIN_PASSWORD not configured');
   }
   return inputPassword === envPassword
}

// Sign a value using HMAC-SHA256
// Returns: "value.signature"
export async function signCookieValue(value: string, secret: string): Promise<string> {
   const encoder = new TextEncoder();
   const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
   )

   const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(value)
   )

   const signatureB64 = base64URLEncode(new Uint8Array(signature))
   return `${value}.${signatureB64}`;
}


// Verify signature and extract original value
// Returns: { valid: boolean, value: string | null }
export async function verifyCookieSignature(signedValue: string, secret: string): Promise<{ valid: boolean, value: string | null }> {
   const parts = signedValue.split('.')
   if (parts.length !== 2) {
      return { valid: false, value: null };
   }

   const [ value, _signature ] = parts
   const expectedSigned = await signCookieValue(value, secret)

   // Constant-time comparison to prevent timing attacks
   const valid = expectedSigned === signedValue

   return { valid, value: valid ? value : null };
}

// Create a signed session cookie value
// Format: "userId:timestamp.signature"
export async function createSessionCookie(userId: string, secret: string): Promise<string> {
   const timestamp = Date.now()
   const payload = `${userId}:${timestamp}`
   return await signCookieValue(payload, secret)
}

// Verify and parse a session cookie
// Returns: { valid: boolean, userId: string | null, timestamp: number | null }
export async function verifySessionCookie(
   cookieValue: string | undefined,
   secret: string,
   maxAgeMs: number = 7 * 24 * 60 * 60 * 1000
): Promise<SessionData> {

   if (!cookieValue) return invalidSessionData()

   const { valid, value } = await verifyCookieSignature(cookieValue, secret)

   if (!valid || !value) return invalidSessionData()

   const [userId, timestampStr] = value.split(':')
   const timestamp = parseInt(timestampStr, 10)

   if (!userId || isNaN(timestamp)) return invalidSessionData()

   if (Date.now() - timestamp > maxAgeMs) return invalidSessionData()

   return { valid: true, userId, timestamp }
}

// Generate cookie options to clear the session
export function clearSessionCookie(cookieName: string = 'session'): Record<string, CookieOptions> {
   return {
      [cookieName]: {
         value: '',
         path: '/',
         expires: new Date(0),
         httpOnly: true,
         secure: true,
         sameSite: 'lax'
      }
   }
}

function invalidSessionData(): SessionData {
   return { valid: false, userId: null, timestamp: null }
}
