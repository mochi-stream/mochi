const CORS_URL = process.env.NEXT_PUBLIC_CORS_URL;

import { useEffect, useState } from "react";

import { getStreamingLinks } from "@/lib/anime";

import Player from "@/components/player";

import { toast } from "sonner";

import { VideoDetails } from "@/types/anime";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlayerContainer({
    episodeId,
    poster
}: {
    episodeId: string;
    poster?: string;
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
    return <div className="relative aspect-video w-full">
        {videoDetails ? (
            <Player
                title="Anime"
                poster={poster}
                src={`${CORS_URL}/${videoDetails?.sources[0].url}`}
                intro={videoDetails.intro}
                outro={videoDetails.outro}
            />
        ) : (
            <Skeleton className="aspect-video" />
        )}
        {/* <div className="h-16 bg-accent mt-2 rounded-sm"></div> */}
    </div>
}