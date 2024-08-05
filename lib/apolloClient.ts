import { ApolloClient, InMemoryCache } from "@apollo/client";

// Replace with your GraphQL endpoint
const ANILIST_GRAPHQL =
  process.env.NEXT_PUBLIC_ANILIST_API || "https://graphql.anilist.co";

const apolloClient = new ApolloClient({
  uri: ANILIST_GRAPHQL,
  cache: new InMemoryCache(),
});

export default apolloClient;
