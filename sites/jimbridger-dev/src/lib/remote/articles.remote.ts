import { query, getRequestEvent } from '$app/server'
import { DEVTO_TOKEN } from '$env/static/private'

export const getArticles = query(
   async () => {
      const kv = getRequestEvent().platform!.env.CACHE

      const cached = await kv.get('devto:articles')
      if (cached) return JSON.parse(cached)

      const response = await fetch('https://dev.to/api/articles/me/published', {
        headers: {
          'api-key': DEVTO_TOKEN
        }
      })
      const data = await response.json()

      await kv.put('devto:articles', JSON.stringify(data), { expirationTtl: 60 })

      return data
   }
)
