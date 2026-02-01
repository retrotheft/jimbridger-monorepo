import { query } from '$app/server'
import { DEVTO_TOKEN } from '$env/static/private'

export const getArticles = query(
   async () => {
      const response = await fetch('https://dev.to/api/articles/me/published', {
        headers: {
          'api-key': DEVTO_TOKEN
        }
      })
      return await response.json()
   }
)
