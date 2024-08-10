import { useEffect, useState } from "react";

import { getStreamingLinks } from "@/lib/anime";

import Player from "@/components/player";

import { toast } from "sonner";

import { VideoDetails } from "@/types/anime";

export default function PlayerContainer({
    episodeId,
}: {
    episodeId: string;
}) {
    const [videoDetails, setVideoDetails] = useState<VideoDetails>();

    useEffect(() => {
        async function fetchEpisodes() {
            try {
                const response = await getStreamingLinks(
                    episodeId
                );
                setVideoDetails(response);
            } catch (error) {
                toast.error("Failed to load episodes. Please try again later.");
            }
        }
        fetchEpisodes();
    }, [episodeId]);
    return <></>
}