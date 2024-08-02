/**
 * Renders the main application component.
 */

"use client";

import { useQuery, gql } from "@apollo/client";

import {
  HomePageAnimeQuery,
  HomePageAnimeQueryVariables,
  MediaSeason,
} from "@/graphql/types";

import { HOME_PAGE_ANIME_QUERY } from "@/graphql/queries/homePageAnimeQuery";
import { MEDIA_FRAGMENT } from "@/graphql/fragments/mediaFragment";

import { toast } from "sonner";

import { AnimeList, AnimeListSkeleton } from "@/components/anime/anime-list";

const QUERY = gql`
  ${HOME_PAGE_ANIME_QUERY}
  ${MEDIA_FRAGMENT}
`;

export default function App() {
  const seasons = getAnimeSeasons();
  const { loading, error, data } = useQuery<
    HomePageAnimeQuery,
    HomePageAnimeQueryVariables
  >(QUERY, {
    variables: {
      season: seasons.currentSeason.season,
      seasonYear: seasons.currentSeason.year,
      nextSeason: seasons.nextSeason.season,
      nextYear: seasons.nextSeason.year,
    },
  });

  console.log(data?.popular?.media);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!data || error) {
    toast.error("Failed to load anime data. Please try again later.", {
      duration: 2000,
    });
    return <div></div>;
  }

  return (
    <div>
      <div className="px-4 lg:px-8 py-6">
        {/* Trending */}
        <div>
          <div>
            <h1 className="text-2xl font-medium">Popular Anime (All Time)</h1>
          </div>
          {data.popular && data.popular.media ? (
            <AnimeList type="default" list={data.popular.media} />
          ) : (
            <AnimeListSkeleton type="default" />
          )}
        </div>
      </div>
      {/* <Trending />
      <Popular /> */}
    </div>
  );
}

function getAnimeSeasons() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  let currentSeason: MediaSeason;
  let nextSeason: MediaSeason;
  let nextSeasonYear = year;

  if (month >= 3 && month <= 5) {
    currentSeason = MediaSeason.Spring;
    nextSeason = MediaSeason.Summer;
  } else if (month >= 6 && month <= 8) {
    currentSeason = MediaSeason.Summer;
    nextSeason = MediaSeason.Fall;
  } else if (month >= 9 && month <= 11) {
    currentSeason = MediaSeason.Fall;
    nextSeason = MediaSeason.Winter;
  } else {
    currentSeason = MediaSeason.Winter;
    nextSeason = MediaSeason.Spring;
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
