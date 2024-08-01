/**
 * Renders the main application component.
 */

"use client";

import { useQuery, gql } from "@apollo/client";

import { HOME_PAGE_ANIME_QUERY } from "@/graphql/queries/homePageAnimeQuery";
import { MEDIA_FRAGMENT } from "@/graphql/fragments/mediaFragment";

const QUERY = gql`
  ${HOME_PAGE_ANIME_QUERY}
  ${MEDIA_FRAGMENT}
`;

export default function App() {
  const seasons = getAnimeSeasons();
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      season: seasons.currentSeason.season,
      seasonYear: seasons.currentSeason.year,
      nextSeason: seasons.nextSeason.season,
      nextYear: seasons.nextSeason.year,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="d">
        {seasons.currentSeason.season} {seasons.currentSeason.year}
      </h1>
      {data.season.media.map((media: any) => (
        <div key={media.id}>{media.title.userPreferred}</div>
      ))}
      <h1>Trending this season </h1>
      {data.nextSeason.media.map((media: any) => (
        <div key={media.id}>{media.title.userPreferred}</div>
      ))}
      {data.trending.media.map((media: any) => (
        <div key={media.id}>{media.title.userPreferred}</div>
      ))}
      {/* <Trending />
      <Popular /> */}
    </div>
  );
}

function getAnimeSeasons() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  let currentSeason;
  let nextSeason;
  let nextSeasonYear = year;

  if (month >= 3 && month <= 5) {
    currentSeason = "SPRING";
    nextSeason = "SUMMER";
  } else if (month >= 6 && month <= 8) {
    currentSeason = "SUMMER";
    nextSeason = "FALL";
  } else if (month >= 9 && month <= 11) {
    currentSeason = "FALL";
    nextSeason = "WINTER";
  } else {
    currentSeason = "WINTER";
    nextSeason = "SPRING";
    nextSeasonYear++;
  }

  return {
    currentSeason: {
      season: currentSeason,
      year: year,
    },
    nextSeason: {
      season: nextSeason,
      year: nextSeasonYear,
    },
  };
}
