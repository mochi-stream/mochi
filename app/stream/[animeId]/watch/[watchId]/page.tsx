"use client";

const CORS_URL = process.env.CORS_URL || "https://cors.j21.dev";

import { useEffect, useState } from "react";

import { getAnimeEpisodes, getStreamAnimeDetails } from "@/lib/anime";

import { Video, PlayerSubtitle, StreamAnimeInfo } from "@/types/anime";

import { toast } from "sonner";

import Player from "@/components/anime/player";
import useNetworkStatus from "@/app/_components/networkstatus";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

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

  const [video, setVideo] = useState<Video>();
  const [streamAnime, setStreamAnime] = useState<StreamAnimeInfo>();
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
            src: `${CORS_URL}/${sub.url}`,
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
          setThumbnail(`${CORS_URL}/${thumbnailResponse.url}`);
        }

        setVideo(response);

        const streamAnimeResponse = await getStreamAnimeDetails(
          props.params.animeId
        );
        setStreamAnime(streamAnimeResponse);
      } catch (error) {
        toast.error("Failed to load episodes. Please try again later.");
      }
    }
    fetchEpisodes();
  }, [props.params.animeId, props.params.watchId]);

  return (
    <div className="grid lg:grid-cols-12 gap-4 py-6 px-6 lg:px-12">
      <div className="lg:col-span-8">
        {video ? (
          <Player
            title="test"
            src={`${CORS_URL}/${video?.sources[0].url}`}
            subtitles={subtitle}
            poster="a"
            intro={video.intro}
            outro={video.outro}
            thumbnail={thumbnail}
          />
        ) : (
          <Skeleton className="" />
        )}
      </div>
      <div className="lg:col-span-4 flex-grow">
        <div className="bg-[#141219] rounded-lg p-2">
          {streamAnime &&
            streamAnime.episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/stream/${props.params.animeId}/watch/${
                  episode.id.split("$")[2]
                }`}
              >
                <div
                  className={`px-4 py-4 ${
                    parseInt(props.params.watchId) ===
                    parseInt(episode.id.split("$")[2])
                      ? "bg-[#202020]"
                      : "hover:bg-[#262626]"
                  }`}
                >
                  {episode.title}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
