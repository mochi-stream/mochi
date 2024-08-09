"use client";

import { useQuery, gql } from "@apollo/client";
import { STREAM_PAGE_ANIME_QUERY } from "@/graphql/queries/streamPageAnimeQuery";
import { STREAM_MEDIA_FRAGMENT } from "@/graphql/fragments/streamMediaFragment";
import { createContext, useContext, ReactNode } from 'react';

import {
    MediaType,
    StreamPageAnimeQuery,
    StreamPageAnimeQueryVariables
} from "@/graphql/types";

// Define the context value type
interface AnimeInfoContextValue {
    info: StreamPageAnimeQuery;
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

interface StreamLayoutProps {
    children: ReactNode;
    params: { animeId: string };
}

export default function StreamLayout({ children, params }: StreamLayoutProps) {
    const { animeId } = params;

    // Using useQuery to fetch anime info
    const { loading, error, data } = useQuery<StreamPageAnimeQuery, StreamPageAnimeQueryVariables>(QUERY, {
        variables: { id: parseInt(animeId), type: MediaType.Anime, isAdult: false },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>Error: {error ? error.message : "Data not found"}</div>;
    }

    const animeInfoContextValue: AnimeInfoContextValue = { info: data };

    return (
        <AnimeInfoContext.Provider value={animeInfoContextValue}>
            {children}
        </AnimeInfoContext.Provider>
    );
}
