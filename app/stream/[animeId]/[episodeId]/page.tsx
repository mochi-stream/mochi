"use client";

import { useEffect, useState } from "react";
import { PlayerSubtitle } from "@/types/anime";

import { toast } from "sonner";

import useNetworkStatus from "@/app/_components/networkstatus";

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

    return <div></div>;
}