"use client";

import { useEffect, useState } from "react";

import { getAnimeEpisodes } from "@/lib/anime";

import { Video, PlayerSubtitle } from "@/types/anime";

import { toast } from "sonner";

import Player from "@/components/anime/player";
import useNetworkStatus from "@/app/_components/networkstatus";

import { Skeleton } from "@/components/ui/skeleton";

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

  const [episodes, setEpisodes] = useState<Video>();
  const [subtitle, setSubtitle] = useState<PlayerSubtitle[]>();
  const [thumbnail, setThumbnail] = useState<string>();

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await getAnimeEpisodes(
          props.params.animeId,
          props.params.watchId
        );

        const subtitleResponse = response.subtitles;

        const formattedSubtitles = subtitleResponse
          .filter((sub) => sub.lang !== "Thumbnails")
          .map((sub) => ({
            src: `${sub.url}`,
            label: sub.lang,
            language: sub.lang,
            kind: "subtitles" as TextTrackKind,
            default: sub.lang.toLowerCase().includes("english"),
          }));

        setSubtitle(formattedSubtitles);

        const thumbnailResponse = subtitleResponse.find(
          (sub) => sub.lang === "Thumbnails"
        );
        if (thumbnailResponse) {
          setThumbnail(`${thumbnailResponse.url}`);
        }

        setEpisodes(response);
      } catch (error) {
        toast.error("Failed to load episodes. Please try again later.");
      }
    }
    fetchEpisodes();
  }, [props.params.animeId, props.params.watchId]);

  return (
    <div className="grid lg:grid-cols-12 gap-4 py-6 px-6 lg:px-12">
      <div className="lg:col-span-8">
        {episodes ? (
          <Player
            title="test"
            src={episodes?.sources[0].url}
            subtitles={subtitle}
            poster="a"
            thumbnail={thumbnail}
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>
    </div>
  );
}
