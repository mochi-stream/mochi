"use client";

import { toast } from "sonner";

import useNetworkStatus from "@/app/_components/networkstatus";
import { useAnimeInfo } from "../layout";

interface WatchPageProps {
    params: {
        animeId: string;
        watchId: string;
    };
}

export default function WatchPage(props: WatchPageProps) {
    const { isOnline } = useNetworkStatus();

    if (!isOnline) {
        toast.error("You are offline. Please connect to the internet.");
    }

    const { info } = useAnimeInfo();

    return <div></div>;
}