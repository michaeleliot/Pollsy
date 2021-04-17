import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, makeVar, useReactiveVar } from "@apollo/client";
import { Poll } from "@prisma/client";

let apolloClient: ApolloClient<InMemoryCache>;

export const deletedVar = makeVar({});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        deletedVar: {
          read() {
            return deletedVar();
          }
        },
        getPolls: {
          keyArgs: false,
          merge(existing = [], incoming, { args }) {
            let { offset = 0 } = args as Record<string, any>
            let merged = existing ? existing.slice(0) : [];
            const deletedItems = deletedVar() as Record<string, boolean>;
            merged = merged.filter((poll: Poll) => !deletedItems[poll.id]);
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        }
      }
    }
  }
})

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: new HttpLink({
      uri: "http://localhost:3000/api/graphql",
    }),
    cache: cache,
  });
}

export function initializeApollo(initialState: any = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
      // Get existing cache, loaded during client side data fetching
      const existingCache = _apolloClient.extract();

      // Restore the cache using the data passed from
      // getStaticProps/getServerSideProps combined with the existing cached data
      _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
  }

export function useApollo(initialState: any = null) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}