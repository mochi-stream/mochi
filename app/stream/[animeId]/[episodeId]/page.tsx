"use client";

import { toast } from "sonner";
import useNetworkStatus from "@/app/_components/networkstatus";
import { useAnimeInfo } from "../context";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import PlayerContainer from "./player";
import { useState, useEffect } from "react";
import { Episode } from "@/types/anime";

interface WatchPageProps {
    params: {
        animeId: string;
        episodeId: string;
    };
}

export default function WatchPage({ params }: WatchPageProps) {
    const { isOnline } = useNetworkStatus();
    const { info, isLoading, episodes } = useAnimeInfo();
    const [matchingEpisode, setMatchingEpisode] = useState<Episode>();

    useEffect(() => {
        if (episodes) {
            const matchingEpisode = episodes.find((episode) => episode.number === parseInt(params.episodeId));
            setMatchingEpisode(matchingEpisode);
        }
    }, [episodes, params.episodeId]);

    useEffect(() => {
        if (!isOnline) {
            toast.error("You are offline. Please connect to the internet.");
        }
    }, [isOnline]);

    return (
        <div>
            <div className="px-2 lg:px-12 pt-6">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 lg:col-span-8 aspect-video">
                        {matchingEpisode ? (
                            <PlayerContainer episodeId={matchingEpisode.id} />
                        ) : (
                                <Skeleton className="aspect-video" />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
