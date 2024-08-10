"use client";

import { toast } from "sonner";
import useNetworkStatus from "@/app/_components/networkstatus";

import { useAnimeInfo } from "../context";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import PlayerContainer from "./player";


interface WatchPageProps {
    params: {
        animeId: string;
        episodeId: string;
    };
}

export default function WatchPage({ params }: WatchPageProps) {
    const { isOnline } = useNetworkStatus();

    if (!isOnline) {
        toast.error("You are offline. Please connect to the internet.");
    }

    const { info, episodes } = useAnimeInfo();

    const matchingEpisode = episodes.find((episode) => episode.number === parseInt(params.episodeId));

    if (matchingEpisode) {
        return <><PlayerContainer episodeId={matchingEpisode.id} /></>
    }
}