import Image from "next/image";

import { Button } from "@/components/ui/button";

import { MediaStreamingEpisode } from "@/graphql/types";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CustomImage from "@/components/ui/custom-image";

interface EpisodeListProps {
    quantity?: number;
    animeId: number;
    list: MediaStreamingEpisode[];
}

export function EpisodeList({ list, animeId, quantity }: EpisodeListProps) {
    quantity = quantity || 4;

    let previousEpisodeNumber = 0;
    let firstEpisodeProcessed = false;

    const processedEpisodes = list
        .map((episode) => {
            // Attempt to match the episode title with the regex pattern
            const match = (episode.title as string).match(/Episode (\d+)( - (.+))?/);
            let episodeNumber = previousEpisodeNumber + 0.5; // Default to previous + 0.5 if no match
            let title = episode.title as string; // Default to the original title if match[3] doesn't exist

            if (match) {
                // Extract episode number and title if available
                episodeNumber = match[1] ? parseInt(match[1], 10) : episodeNumber;
                title = match[3] || title;
                firstEpisodeProcessed = true; // Mark that we've processed an episode with a valid number
            } else if (!firstEpisodeProcessed) {
                // Add 1 if the first episode does not have a match
                episodeNumber = previousEpisodeNumber + 1;
                firstEpisodeProcessed = true; // Mark that the first episode is processed
            }

            previousEpisodeNumber = episodeNumber; // Update previous episode number

            // Return an object with the episode details
            return {
                title,
                number: episodeNumber,
                thumbnail: episode.thumbnail || ""
            };
        })
        .sort((a, b) => a.number - b.number); // Sort by episode number

    return (
        <>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 select-none relative">
                {processedEpisodes &&
                    processedEpisodes.slice(0, quantity).map((episode, index) => (
                        <Link href={`/stream/${animeId}/${episode.number}`} key={index}>
                            <div className="relative overflow-hidden cursor-pointer group h-[150px]">
                                <CustomImage
                                    index={index}
                                    src={episode.thumbnail || "/default.png"}
                                    alt={episode.title || "No Title"}
                                    width={1080}
                                    height={600}
                                    className="w-full h-full rounded-lg transition-pacity object-cover opacity-80 group-hover:opacity-100"
                                />

                                <div className="absolute bottom-0 w-full p-4 z-50 font-aeonik">
                                    <h2 className="font-medium text-md lg:w-[80%] leading-5 text-primary/80">
                                        {episode.title.length > 40 ? episode.title.substring(0, 40) + '...' : episode.title}
                                    </h2>
                                    <p className="text-[12px] mt-1 text-primary/70">
                                        Episode {episode.number}
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
