"use client";

import { ApolloClient } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
let cacheInitialized = false;

export async function initializeApolloClient() {
  if (typeof window !== "undefined") {
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    });
    cacheInitialized = true;
  }
}

const ANILIST_GRAPHQL =
  process.env.NEXT_PUBLIC_ANILIST_API || "https://graphql.anilist.co";

const apolloClient = new ApolloClient({
  uri: ANILIST_GRAPHQL,
  cache,
});

export { apolloClient, cacheInitialized };
