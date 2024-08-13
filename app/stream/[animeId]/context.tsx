// TODO: REMOVE GRAPHQL IN STREAM PAGE

"use client";

import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { STREAM_PAGE_ANIME_QUERY } from "@/graphql/queries/streamPageAnimeQuery";
import { STREAM_MEDIA_FRAGMENT } from "@/graphql/fragments/streamMediaFragment";
import { createContext, useContext, ReactNode } from "react";
import {
  MediaType,
  StreamPageAnimeQuery,
  StreamPageAnimeQueryVariables,
  MediaStreamingEpisode,
} from "@/graphql/types";
import { Episode } from "@/types/anime";
import { getAnimeDetails } from "@/lib/anime";
import { toast } from "sonner";

// Define the context value type
interface AnimeInfoContextValue {
  info: StreamPageAnimeQuery | null;
  episodes: Episode[];
  episodesParsed: ProcessedEpisode[];
  isLoading: boolean;
}

const AnimeInfoContext = createContext<AnimeInfoContextValue | undefined>(
  undefined
);

export const useAnimeInfo = () => {
  const context = useContext(AnimeInfoContext);
  if (!context) {
    throw new Error(
      "useAnimeInfo must be used within an AnimeInfoContext.Provider"
    );
  }
  return context;
};

// Define the GraphQL query
const QUERY = gql`
  ${STREAM_PAGE_ANIME_QUERY}
  ${STREAM_MEDIA_FRAGMENT}
`;

interface AnimeInfoProviderProps {
  children: ReactNode;
  animeId: string;
}

export default function AnimeInfoProvider({
  children,
  animeId,
}: AnimeInfoProviderProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(true);

  // Using useQuery to fetch anime info
  const { loading: isLoadingInfo, data: animeInfo } = useQuery<
    StreamPageAnimeQuery,
    StreamPageAnimeQueryVariables
  >(QUERY, {
    variables: { id: parseInt(animeId), type: MediaType.Anime, isAdult: false },
  });

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodesData = await getAnimeDetails(animeId);
        setEpisodes(episodesData);
      } catch (err) {
        toast.error("Failed to load episodes. Please try again later.");
      } finally {
        setIsLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [animeId]);

  const initialPreviousEpisodeNumber = 0;

  const streamingEpisodes = animeInfo?.Media?.streamingEpisodes || [];
  const filteredEpisodes = streamingEpisodes.filter(
    (episode): episode is MediaStreamingEpisode => episode !== null
  );

  const episodesParsed = processEpisodes(
    filteredEpisodes,
    initialPreviousEpisodeNumber
  );

  const animeInfoContextValue: AnimeInfoContextValue = {
    info: animeInfo || null,
    episodes,
    episodesParsed: processEpisodes(
      episodesParsed,
      initialPreviousEpisodeNumber
    ),
    isLoading: isLoadingInfo || isLoadingEpisodes,
  };

  return (
    <AnimeInfoContext.Provider value={animeInfoContextValue}>
      {children}
    </AnimeInfoContext.Provider>
  );
}

interface ProcessedEpisode {
  title: string;
  number: number;
  thumbnail: string;
}

function processEpisodes(
  list: MediaStreamingEpisode[],
  initialPreviousEpisodeNumber: number
): ProcessedEpisode[] {
  let previousEpisodeNumber = initialPreviousEpisodeNumber;
  let firstEpisodeProcessed = false;

  return list
    .map((episode) => {
      // Attempt to match the episode title with the regex pattern
      const match = episode.title?.match(/Episode (\d+)( - (.+))?/);
      let episodeNumber = previousEpisodeNumber;
      let title = episode.title;

      if (match) {
        // Extract episode number and title if available
        episodeNumber = match[1] ? parseInt(match[1], 10) : episodeNumber;
        title = match[3] || title;

        // Update the previous episode number
        previousEpisodeNumber = episodeNumber;
        firstEpisodeProcessed = true; // Mark that we've processed an episode with a valid number
      } else if (!firstEpisodeProcessed) {
        // Add 1 if the first episode does not have a match
        episodeNumber = previousEpisodeNumber + 1;
        previousEpisodeNumber = episodeNumber; // Update the previous episode number
      } else {
        // Increment by 0.5 if there's no match but there was a previous valid episode
        episodeNumber = previousEpisodeNumber + 0.5;
        previousEpisodeNumber = episodeNumber; // Update the previous episode number
      }

      // Return an object with the episode details
      return {
        title: title || "Unknown",
        number: episodeNumber || 0,
        thumbnail: episode.thumbnail || "",
      };
    })
    .sort((a, b) => a.number - b.number); // Sort by episode number
}