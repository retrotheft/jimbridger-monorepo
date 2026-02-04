import { getRequestEvent, query } from '$app/server';
import { GITHUB_TOKEN } from '$env/static/private';
import z from 'zod';
import { GraphQLClient, gql } from 'graphql-request'

const client = new GraphQLClient('https://api.github.com/graphql', {
   headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'User-Agent': 'retrotheft'
   },
})

const GET_DISCUSSION = gql`
   query GetDiscussion($owner: String!, $repo: String!, $number: Int!) {
       repository(owner: $owner, name: $repo) {
         discussion(number: $number) {
           title
           body
           comments(first: 100) {
             nodes {
               id
               body
               createdAt
               updatedAt
               author { login }
             }
           }
         }
       }
     }
`

export const getActivityFeed = query(
   z.object({
      username: z.string(),
      discussionNum: z.number()
   }),
   async ({ username, discussionNum }) => {
      const kv = getRequestEvent().platform!.env.CACHE

      const cached = await kv.get('github:activity-feed')
      if (cached) return JSON.parse(cached)

      const data = await client.request(GET_DISCUSSION, {
         owner: username,
         repo: username,
         number: discussionNum
      });


      kv.put('github:activity-feed', JSON.stringify(data), { expirationTtl: 60 })

      return data.repository.discussion.comments.nodes || [];
   }
);
