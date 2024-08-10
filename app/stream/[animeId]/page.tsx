"use client";

import WatchPage from './[episodeId]/page';

interface StreamPageProps {
    params: {
        animeId: string;
    }
}

export default function StreamPage({ params }: StreamPageProps) {
    return <WatchPage params={{ animeId: params.animeId, episodeId: "1" }} />
}