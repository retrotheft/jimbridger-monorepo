// Encode a buffer to base64url format (URL-safe, no padding)
export function base64URLEncode(buffer: ArrayBuffer | Uint8Array): string {
   const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
   return Buffer.from(bytes)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}

// Decode a base64url string back to a buffer
export function base64URLDecode(str: string): Buffer {
   // add back padding if needed
   const padding = '='.repeat((4 - (str.length % 4)) % 4);
   const base64 = str.replace(/-/g, '+').replace(/_/g, '/') + padding;
   return Buffer.from(base64, 'base64');
}

// Generate a cryptographically secure random string
export function generateRandomString(length: number = 32): string {
   const bytes = crypto.getRandomValues(new Uint8Array(length));
   return base64URLEncode(bytes)
}

// Check if a timestamp is expired
export function isExpired(timestamp: number, maxAgeMs: number): boolean {
   return Date.now() - timestamp > maxAgeMs
}
