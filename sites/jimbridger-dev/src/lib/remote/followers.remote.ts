import { query, getRequestEvent } from '$app/server'
import { DEVTO_TOKEN } from '$env/static/private'

export const getFollowers = query(
   async () => {
      const kv = getRequestEvent().platform!.env.CACHE

      const cached = await kv.get('devto:followers')
      if (cached) return JSON.parse(cached)

      const response = await fetch('https://dev.to/api/followers/users', {
         headers: {
            'api-key': DEVTO_TOKEN,
            'User-Agent': "jimbridger.dev (retrotheft@github)"
        }
      })
      const data = await response.json()

      await kv.put('devto:followers', JSON.stringify(data), { expirationTtl: 60 })

      return data
   }
)
