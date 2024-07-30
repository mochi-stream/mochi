import { ApolloClient, InMemoryCache } from "@apollo/client";

// Replace with your GraphQL endpoint
const ANILIST_ENDPOINT = "https://graphql.anilist.co";

const apolloClient = new ApolloClient({
  uri: ANILIST_ENDPOINT,
  cache: new InMemoryCache(),
});

export default apolloClient;
