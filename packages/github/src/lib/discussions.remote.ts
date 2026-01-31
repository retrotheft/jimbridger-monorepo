import { query } from '$app/server';
import { GITHUB_TOKEN } from '$env/static/private';
import z from 'zod';

export const getActivityFeed = query(
   z.string(),
   async (username: string) => {
      const graphqlQuery = `
           query($owner: String!, $repo: String!) {
             repository(owner: $owner, name: $repo) {
               discussions(first: 100) {
                 nodes {
                   number
                   title
                   body
                   comments(first: 100) {
                     nodes {
                       id
                       body
                       createdAt
                       updatedAt
                       author {
                         login
                       }
                     }
                   }
                 }
               }
             }
           }
         `;

      const response = await fetch('https://api.github.com/graphql', {
         method: 'POST',
         headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            query: graphqlQuery,
            variables: { owner: username, repo: username }
         })
      });

      const body = await response.json();
      const discussion = body.data.repository.discussions.nodes.find(
         (d: any) => d.title === 'activity-feed'
      );

      return discussion?.comments.nodes || [];
   }
);
