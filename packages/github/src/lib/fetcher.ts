import { GITHUB_TOKEN } from "$env/static/private";
import { error } from '@sveltejs/kit';

type FetcherOptions = {
  query: string;
  variables?: Record<string, unknown>;
  fetch: typeof fetch;
};

const fetcher = async <T>({ query, variables = {}, fetch }: FetcherOptions): Promise<T> => {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      throw error(res.status, 'GitHub API request failed');
    }

    const { data, errors } = await res.json();

    if (errors) {
      console.error('GraphQL Errors:', errors);
      throw error(500, 'GraphQL query failed');
    }

    return data as T;
  } catch (err) {
    console.error('Fetcher error:', err);
    throw error(500, 'Failed to fetch data');
  }
};

export default fetcher;
