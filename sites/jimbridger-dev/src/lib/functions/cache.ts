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

/**
 * Synthetic query object that mimics SvelteKit remote query interface with cached data
 */
class SyntheticQuery<T> {
   loading: boolean = false;
   error: Error | null = null;
   current: T;

   constructor(cachedData: T) {
      this.current = cachedData;
   }

   // Make it thenable so it works like a Promise
   then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
   ): Promise<TResult1 | TResult2> {
      return Promise.resolve(this.current).then(onfulfilled, onrejected);
   }

   catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
   ): Promise<T | TResult> {
      return Promise.resolve(this.current).catch(onrejected);
   }

   finally(onfinally?: (() => void) | null): Promise<T> {
      return Promise.resolve(this.current).finally(onfinally);
   }

   // Required for Promise compatibility
   [Symbol.toStringTag] = 'Promise';
}

type RemoteQueryFunction<TArg, TResult> = (arg?: TArg) => any;

// Map to track in-flight requests and prevent duplicate fetches
const inFlight = new Map<string, any>();

/**
 * Wraps a SvelteKit remote query function with caching
 * Returns cached data as a SyntheticQuery on cache hit, or the real query on cache miss
 * Prevents duplicate requests for the same query while one is already in progress
 * @param record - Object containing the query function (e.g., { getArticles })
 * @param arg - Single argument to pass to the query function (can be object, array, or primitive)
 * @param ttl - Time to live in milliseconds (default: 5000)
 * @returns Either a SyntheticQuery with cached data or the original query object
 */
export function cache<TArg, TResult>(
   record: Record<string, RemoteQueryFunction<TArg, TResult>>,
   arg?: TArg,
   ttl = 60000
) {
   const fnName = Object.keys(record)[0];
   const key = arg !== undefined ? `${fnName}:${JSON.stringify(arg)}` : fnName;

   const fromCache = getFromCache<TResult>(key);
   if (fromCache) {
      console.log("Cache HIT", key)
      return new SyntheticQuery(fromCache);
   }
   console.log("Cache MISS", key)
   // Check if already fetching
   if (inFlight.has(key)) {
      return inFlight.get(key);
   }

   const query = record[fnName];
   const realQuery = arg !== undefined ? query(arg) : query();

   inFlight.set(key, realQuery);

   realQuery
      .then((res: TResult) => setCache(key, res, ttl))
      .catch((error: Error) => console.error('Error caching query result:', error))
      .finally(() => inFlight.delete(key));

   return realQuery;
}
