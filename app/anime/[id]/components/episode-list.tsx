import Image from "next/image";

import { Button } from "@/components/ui/button";

import { MediaStreamingEpisode } from "@/graphql/types";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface EpisodeListProps {
    quantity?: number;
    animeId: number;
    list: MediaStreamingEpisode[];
}

export function EpisodeList({ list, animeId, quantity }: EpisodeListProps) {
    quantity = quantity || 4;

    const regex = /Episode (\d+) - (.+)/;

    return (
        <>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 select-none relative">
                {list &&
                    list.slice(0, quantity).map((episode, index) => (
                        <Link href={`/map/${animeId}/${episode.url}`} key={index}>
                            <div className="relative overflow-hidden cursor-pointer group h-[150px]">
                                <Image
                                    loading="lazy"
                                    src={episode.thumbnail || "/default.png"}
                                    alt={episode.title || "No Title"}
                                    width={1080}
                                    height={600}
                                    className="w-full h-full rounded-lg transition-pacity object-cover opacity-80 group-hover:opacity-100"
                                />

                                <div className="absolute bottom-0 w-full p-4 z-50 font-aeonik">
                                    <h2 className="font-medium text-md lg:w-[80%] leading-5 text-primary/80">
                                        {episode.title?.match(regex)?.[2] || episode.title}
                                    </h2>
                                    <p className="text-[12px] mt-1 text-primary/70">
                                        {
                                            (episode.title?.match(regex) ? "Episode " + episode.title?.match(regex)?.[1] : episode.title) || ""
                                        }
                                    </p>
                                </div>
                                {/* Render the anime gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-20% from-black via-[transparent] to-transparent opacity-70 rounded-lg pointer-events-none"></div>
                            </div>
                        </Link>
                    ))}
            </div>
            {list.length > quantity && (
                <div className="flex justify-center mt-4 w-full">
                    <Button variant={"secondary"} className="flex items-center">
                        View All
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            )}
        </>
    );
}
