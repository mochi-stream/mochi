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

import { AnimeList, AnimeListSkeleton } from "@/components/anime/list";

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


  if (!loading && !data) {
    toast.error("Failed to load anime data. Please try again later.", {
      duration: 2000,
    });
  }

  return (
    <div>
      <div className="px-4 lg:px-8 py-6">
        <div>
          <div>
            <h1 className="text-[1.4rem] font-medium">Trending Now</h1>
          </div>
          {data && data.trending && data.trending.media ? (
            <AnimeList list={data.trending.media} />
          ) : (
            <AnimeListSkeleton />
          )}
        </div>

        {/* FEAT: Show Recommended Anime Based on MAL History */}

        <div className="mt-6">
          <div>
            <h1 className="text-[1.4rem] font-medium">Popular This {seasons.currentSeason.season.charAt(0) + seasons.currentSeason.season.slice(1).toLowerCase()}</h1>
          </div>
          {data && data.season && data.season.media ? (
            <AnimeList list={data.season.media} />
          ) : (
            <AnimeListSkeleton />
          )}
        </div>

        <div className="mt-6">
          <div>
            <h1 className="text-[1.4rem] font-medium">Most Popular</h1>
          </div>
          {data && data.popular && data.popular.media ? (
            <AnimeList list={data.popular.media} />
          ) : (
            <AnimeListSkeleton />
          )}
        </div>

        <div className="mt-6">
          <div>
            <h1 className="text-[1.4rem] font-medium">Top Animes</h1>
          </div>
          {data && data.top && data.top.media ? (
            <AnimeList list={data.top.media} />
          ) : (
            <AnimeListSkeleton />
          )}
        </div>

        <div className="mt-6">
          <div>
            <h1 className="text-[1.4rem] font-medium">Upcoming This {seasons.nextSeason.season.charAt(0) + seasons.nextSeason.season.slice(1).toLowerCase()}</h1>
          </div>
          {data && data.nextSeason && data.nextSeason.media ? (
            <AnimeList list={data.nextSeason.media} />
          ) : (
            <AnimeListSkeleton />
          )}
        </div>


      </div>
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
