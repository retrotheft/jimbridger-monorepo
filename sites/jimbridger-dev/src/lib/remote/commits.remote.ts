import { getRequestEvent, query } from '$app/server';
import { GITHUB_REPOS_TOKEN } from '$env/static/private';
import z from 'zod';
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('https://api.github.com/graphql', {
   headers: {
      'Authorization': `Bearer ${GITHUB_REPOS_TOKEN}`,
      'User-Agent': 'retrotheft'
   },
});

const GET_REPOS_WITH_STATS = gql`
   query GetReposWithStats($login: String!, $first: Int!) {
      user(login: $login) {
         repositories(first: $first, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
               name
               url
               stargazerCount
               defaultBranchRef {
                  target {
                     ... on Commit {
                        history {
                           totalCount
                        }
                     }
                  }
               }
               languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                  edges {
                     size
                     node {
                        name
                        color
                     }
                  }
                  totalSize
               }
            }
         }
      }
   }
`;

export const getReposWithStats = query(
   z.object({
      username: z.string(),
      first: z.number().default(10)
   }),
   async ({ username, first }) => {
      const kv = getRequestEvent().platform!.env.CACHE;
      const cacheKey = `github:repos:${username}:${first}`;
      const cached = await kv.get(cacheKey);
      if (cached) return JSON.parse(cached);

      const data = await client.request(GET_REPOS_WITH_STATS, {
         login: username,
         first: first
      });

      const repos = data.user.repositories.nodes.map((repo: any) => ({
         name: repo.name,
         url: repo.url,
         stars: repo.stargazerCount,
         commitCount: repo.defaultBranchRef?.target?.history?.totalCount ?? 0,
         languages: repo.languages.edges.map((edge: any) => ({
            name: edge.node.name,
            color: edge.node.color,
            size: edge.size,
            percentage: ((edge.size / repo.languages.totalSize) * 100).toFixed(1)
         }))
      }));

      kv.put(cacheKey, JSON.stringify(repos), { expirationTtl: 86400 }); // 24 hour cache
      return repos;
   }
);
