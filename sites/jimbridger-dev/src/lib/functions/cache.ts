interface CacheItem<T> {
  value: T;
  expiresAt: number;
}

/**
 * Retrieves a value from localStorage cache if it exists and hasn't expired
 * @param key - The cache key to look up
 * @returns The cached value if valid, undefined otherwise
 */
export function getFromCache<T>(key: string): T | undefined {
  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return undefined;
    }

    const cached: CacheItem<T> = JSON.parse(item);
    const now = Date.now();

    // Check if the cached item has expired
    if (cached.expiresAt && now > cached.expiresAt) {
      localStorage.removeItem(key);
      return undefined;
    }

    return cached.value;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return undefined;
  }
}

/**
 * Sets a value in localStorage cache with an expiration time
 * @param key - The cache key
 * @param value - The value to cache
 * @param ttlMs - Time to live in milliseconds
 */
export function setCache<T>(key: string, value: T, ttlMs: number): void {
  try {
    const item: CacheItem<T> = {
      value,
      expiresAt: Date.now() + ttlMs,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
}
