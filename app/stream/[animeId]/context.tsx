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
    StreamPageAnimeQueryVariables
} from "@/graphql/types";
import { Episode } from "@/types/anime";
import { getAnimeDetails } from "@/lib/anime";

// Define the context value type
interface AnimeInfoContextValue {
    info: StreamPageAnimeQuery | null;
    episodes: Episode[];
    isLoading: boolean;
}

const AnimeInfoContext = createContext<AnimeInfoContextValue | undefined>(undefined);

export const useAnimeInfo = () => {
    const context = useContext(AnimeInfoContext);
    if (!context) {
        throw new Error("useAnimeInfo must be used within an AnimeInfoContext.Provider");
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

export default function AnimeInfoProvider({ children, animeId }: AnimeInfoProviderProps) {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(true);

    // Using useQuery to fetch anime info
    const { loading: isLoadingInfo, data: animeInfo } = useQuery<StreamPageAnimeQuery, StreamPageAnimeQueryVariables>(QUERY, {
        variables: { id: parseInt(animeId), type: MediaType.Anime, isAdult: false },
    });

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const episodesData = await getAnimeDetails(animeId);
                setEpisodes(episodesData);
            } catch (err) {
                console.error("Failed to fetch episodes:", err);
            } finally {
                setIsLoadingEpisodes(false);
            }
        };

        fetchEpisodes();
    }, [animeId]);

    const animeInfoContextValue: AnimeInfoContextValue = {
        info: animeInfo || null,
        episodes,
        isLoading: isLoadingInfo || isLoadingEpisodes
    };

    return (
        <AnimeInfoContext.Provider value={animeInfoContextValue}>
            {children}
        </AnimeInfoContext.Provider>
    );
}
