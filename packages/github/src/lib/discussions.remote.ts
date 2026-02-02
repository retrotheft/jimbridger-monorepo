import { query } from '$app/server';
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
      const data = await client.request(GET_DISCUSSION, {
         owner: username,
         repo: username,
         number: discussionNum
      });

      return data.repository.discussion.comments.nodes || [];
   }
);
