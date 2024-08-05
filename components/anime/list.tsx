import { Plus, StarIcon } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

import { MediaFragment } from "@/graphql/types";

// @ts-ignore
import sanitizeHtml from 'sanitize-html';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

interface AnimeListProps {
    list: (MediaFragment | null)[];
}

export function AnimeList({
    list,
}: AnimeListProps) {

    const mediaList =
        list?.filter((item): item is MediaFragment => item !== null) || [];

    return <div className="mt-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-y-6 gap-4 select-none">
        {mediaList.map((anime, index) => (
            <Link key={index} href={`/anime/${anime.id}`}>
                <HoverCard openDelay={250} closeDelay={50}>
                    <HoverCardTrigger>
                        <div
                            className="relative overflow-hidden cursor-pointer group"
                        >
                            <Image
                                loading="lazy"
                                src={anime.coverImage?.extraLarge || "default.png"}
                                alt={anime.title?.userPreferred || "No Title"}
                                width={460}
                                height={650}
                                className="w-full h-[320px] lg:h-[300px] rounded-lg transition-opacity object-cover opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute bottom-0 w-full p-4 z-50 font-aeonik">
                                <h2 className="font-medium text-md lg:w-[80%] leading-5 text-primary/80">
                                    {(anime.title?.userPreferred || "No Title").length > 40
                                        ? (anime.title?.userPreferred || "No Title").slice(0, 37) + "..."
                                        : anime.title?.userPreferred || "No Title"}
                                </h2>
                                <p className="text-[12px] mt-1 text-primary/70">
                                    {anime.seasonYear}, {anime.genres?.[0]}
                                </p>
                            </div>
                            {/* Render the anime gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-10% from-black via-[transparent] to-transparent opacity-70 rounded-lg pointer-events-none"></div>

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-primary rounded-full p-2 shadow-lg hover:bg-secondary-foreground/90 z-50">
                                    <Plus className="text-secondary h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="z-[1000]">
                        <span className="font-bold">{(anime.title?.userPreferred || "No Title")}</span>
                        <p className="text-sm"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(
                                    (anime.description && anime.description.length > 200
                                        ? anime.description.slice(0, 200) + '...'
                                        : anime.description),
                                    {
                                        allowedTags: [], // No tags allowed
                                        allowedAttributes: {},
                                    }
                                )
                            }}
                        >
                        </p>
                        <div className="mt-1 space-x-1 flex">
                            <span className="bg-purple-600 py-1 px-2 rounded text-xs">{anime.format}</span>
                            <span className="bg-blue-600 py-1 px-2 rounded text-xs">{anime.seasonYear}</span>
                            <span className="bg-orange-500 py-1 px-2 rounded text-xs flex justify-between gap-1 items-center w-fit"><StarIcon className="h-3 w-3" />{anime.averageScore && (anime.averageScore * 5 / 100).toFixed(1)}</span>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </Link>
        ))}
    </div>;
}

export function AnimeListSkeleton() {
    return <div className="mt-4 w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 select-none gap-4">
        {Array(6)
            .fill(0)
            .map((_, index) => (
                <div
                    key={index}
                    className="group relative overflow-hidden shadow-lg rounded-lg"
                >
                    {/* Render the anime image skeleton */}
                    <Skeleton className="object-cover w-auto h-[320px] lg:h-[300px] rounded-lg" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        {/* Render the anime details skeleton */}
                        <Skeleton className="text-md lg:text-lg lg:w-[80%] font-semibold leading-5" />
                        <Skeleton className="text-sm mt-1" />
                    </div>
                </div>
            ))}
    </div>;
}