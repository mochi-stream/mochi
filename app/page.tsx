/**
 * Renders the main application component.
 */

"use client";

import { useQuery, gql } from "@apollo/client";

import { HOME_PAGE_ANIME_QUERY } from "@/graphql/queries/homePageAnimeQuery";
import { MEDIA_FRAGMENT } from "@/graphql/fragments/mediaFragment";

// Combine queries and fragments
const QUERY = gql`
  ${HOME_PAGE_ANIME_QUERY}
  ${MEDIA_FRAGMENT}
`;

export default function App() {
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      season: "SUMMER",
      seasonYear: 2024,
      nextSeason: "FALL",
      nextYear: 2024,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <div>
      {/* <Trending />
      <Popular /> */}
    </div>
  );
}
