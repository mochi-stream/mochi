import { useEffect, useRef } from "react";
import { Episode } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";

interface ProcessedEpisode {
    title: string;
    number: number;
    thumbnail: string;
}

export default function Episodes({
    episodes,
    anilistEpisodes,
    currentEpisodeNumber
}: {
    episodes: Episode[];
    anilistEpisodes: ProcessedEpisode[];
    currentEpisodeNumber: number;
}) {
    const processedEpisodes = mapEpisodesToProcessedEpisodes(episodes, anilistEpisodes);
    const containerRef = useRef<HTMLDivElement>(null);

    const hasThumbnail = processedEpisodes.length > 0 && processedEpisodes[0].thumbnail;

    useEffect(() => {
        if (containerRef.current) {
            const currentEpisodeElement = containerRef.current.querySelector(
                `[data-episode-number="${currentEpisodeNumber}"]`
            );

            if (currentEpisodeElement) {
                currentEpisodeElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }, [currentEpisodeNumber]);

    return (
        <div className="bg-accent rounded-md shadow-lg space-y-2 h-full relative">
            <div
                ref={containerRef}
                className="absolute inset-0 rounded-md overflow-y-auto episodes-container"
            >
                {processedEpisodes.length < 24 && hasThumbnail && processedEpisodes.map((episode) => (
                    <Link key={episode.number} href={`${episode.number}`}>
                        <div
                            data-episode-number={episode.number}
                            className={`p-4 border-b border-primary/10 transition-colors ${episode.number === currentEpisodeNumber ? 'bg-secondary' : 'bg-primary-foreground hover:bg-secondary'} grid grid-cols-3 gap-2`}
                        >
                            {episode.thumbnail && (
                                <div className="relative row-span-1 w-[6rem] h-[3.3rem]">
                                    <Image
                                        src={episode.thumbnail}
                                        alt={episode.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                            )}
                            <div className="col-span-2 row-span-1 flex items-center">
                                <h3 className="text-md">
                                    {`${episode.number}: ${episode.title}`}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Function to map from Episode to ProcessedEpisode
function mapEpisodesToProcessedEpisodes(
    episodes: Episode[],
    anilistEpisodes: ProcessedEpisode[]
): ProcessedEpisode[] {

    return episodes
        .map((episode) => {
            const matchedAnilistEpisode = anilistEpisodes.find(
                (anilistEp) => anilistEp.number === episode.number
            );

            if (matchedAnilistEpisode) {
                return {
                    title: episode.title, // Use the title from Episode
                    number: episode.number, // Use the number from Episode
                    thumbnail: matchedAnilistEpisode.thumbnail, // Use the thumbnail from ProcessedEpisode
                };
            }

            return null; // Return null if no match found
        })
        .filter((processedEpisode): processedEpisode is ProcessedEpisode => processedEpisode !== null); // Filter out null values
}
