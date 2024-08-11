"use client";

import { toast } from "sonner";
import useNetworkStatus from "@/app/_components/networkstatus";
import { useAnimeInfo } from "../context";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import PlayerContainer from "./player";
import { useState, useEffect } from "react";
import { Episode } from "@/types/anime";
import {
    MediaFragment,
} from "@/graphql/types";
import sanitizeHtml from 'sanitize-html';

import { AnimeList } from "@/components/anime/list";
import Comments from "./_components/comments";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface WatchPageProps {
    params: {
        animeId: string;
        episodeId: string;
    };
}

export default function WatchPage({ params }: WatchPageProps) {
    const { isOnline } = useNetworkStatus();
    const { info, isLoading, episodes } = useAnimeInfo();
    const [matchingEpisode, setMatchingEpisode] = useState<Episode>();

    useEffect(() => {
        if (episodes) {
            const matchingEpisode = episodes.find((episode) => episode.number === parseInt(params.episodeId));
            setMatchingEpisode(matchingEpisode);
        }
    }, [episodes, params.episodeId]);

    useEffect(() => {
        if (!isOnline) {
            toast.error("You are offline. Please connect to the internet.");
        }
    }, [isOnline]);

    const recommendationsArray: (MediaFragment | null)[] = info?.Media?.recommendations?.nodes
        ?.filter(node => node?.mediaRecommendation !== undefined)
        ?.map(node => node!.mediaRecommendation ?? null) || [];

    const [isExpanded, setIsExpanded] = useState(false)

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const getTextToShow = (text: string) => {
        if (isExpanded) {
            return text;
        }
        return text.length > 250 ? text.substring(0, 250).trim() + '…' : text;
    };

    const sanitizedDescription = sanitizeHtml(info?.Media?.description || "", {
        allowedTags: [],
        allowedAttributes: {},
    }
    );


    return (
        <div>
            <div className="px-2 lg:px-12 pt-6">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 lg:col-span-8 aspect-video">
                        {matchingEpisode ? (
                            <PlayerContainer episodeId={matchingEpisode.id} />
                        ) : (
                            <Skeleton className="aspect-video" />
                        )}
                    </div>
                </div>
                <div className="pt-8">
                    <Comments />
                </div>
                <div className="pt-6">
                    <h2 className="text-[1.4rem]">Anime Details</h2>
                    <div className="grid grid-cols-4 mt-4"><div className="flex flex-col col-span-3 lg:flex-row items-center lg:items-start text-center lg:text-start">
                        {info && info.Media && info.Media.coverImage?.extraLarge ? (
                            <>
                                <Image
                                    src={info.Media.coverImage?.extraLarge}
                                    alt={info.Media.title?.userPreferred || "Cover Image"}
                                    width={1080}
                                    height={1080}

                                    className="w-[200px]  h-[320px] lg:h-[300px] rounded-lg object-cover shadow-lg"
                                />
                            </>
                        ) : (
                            <div className="w-[200px]  h-[320px] lg:h-[300px] rounded-lg"></div>
                        )}
                        <div className="flex flex-col px-8 py-2">
                            {isLoading ? (
                                <div>
                                    <Skeleton className="w-[500px] h-[25px] mt-2"></Skeleton>
                                    <Skeleton className="w-[300px] h-[15px] mt-1"></Skeleton>
                                </div>
                            ) : <div>
                                <h1 className="text-2xl font-bold">
                                    {info?.Media?.title?.english ?? info?.Media?.title?.userPreferred}
                                </h1>
                                <p className="text-sm font-bold text-muted-foreground">{info?.Media?.title?.romaji} • {info?.Media?.title?.native}</p>
                                {sanitizedDescription &&
                                    <p className="text-sm text-muted-foreground mt-2 w-[95%]">
                                        <span >
                                            {getTextToShow(sanitizedDescription)}
                                        </span>

                                        {sanitizedDescription.length > 350 && (
                                            <span
                                                onClick={handleToggle}
                                                className="hover:text-primary/70 text-primary cursor-pointer ml-2 select-none"
                                            >
                                                {isExpanded ? 'Read less' : 'Read more'}
                                            </span>
                                        )}
                                    </p>}


                                {info && (
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="px-6 lg:px-0 pt-2 h-fit w-[95%]">
                                            <p className="text-sm font-medium text-muted-foreground mt-2">
                                                <span className="text-primary font-semibold">Status:</span> {info?.Media?.status ? info?.Media?.status?.charAt(0) + info?.Media?.status?.slice(1).toLowerCase() : '-'}
                                            </p>
                                            <p className="text-sm font-medium text-muted-foreground mt-2">
                                                <span className="text-primary font-semibold">Genres:</span> {info?.Media?.genres?.map((name, index) => (
                                                    <>
                                                        <Link
                                                            href={`/search?genre=${name?.toLowerCase()}`}
                                                            key={index}
                                                            className="hover:text-primary cursor-pointer select-none"
                                                        >
                                                            {name}
                                                            {index < (info?.Media?.genres?.length || 0) - 1 && ', '}
                                                        </Link>
                                                    </>
                                                ))}
                                            </p>                                            <p className="text-sm font-medium text-muted-foreground mt-2">
                                                <span className="text-primary font-semibold">Episodes:</span> {info?.Media?.episodes || "-"}
                                            </p>
                                            <p className="text-sm font-medium text-muted-foreground mt-2">
                                                <span className="text-primary font-semibold">Duration:</span> {info?.Media?.duration || "-"} min
                                            </p>
                                        </div>

                                    </div>
                                )}

                                <div className="flex lg:justify-start justify-center mt-3 gap-2">
                                    <Link href={`/anime/${params.animeId}/`} target="_blank">
                                            <Button className="shadow-lg">More Details<ArrowUpRight className="h-4 w-4 ml-1" /></Button>
                                    </Link>
                                </div>

                            </div>}
                        </div>
                    </div></div>
                    <div></div>
                </div>
                {recommendationsArray && recommendationsArray.length > 0 &&
                    <div className="pt-8">
                        <div>
                            <h1 className="text-[1.4rem] font-medium">Recommendations</h1>
                        </div>
                        <AnimeList list={recommendationsArray} />
                    </div>
                }
            </div>
        </div >
    );
}
