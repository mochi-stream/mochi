import { useState } from "react";

import Link from "next/link";

import { Plus, ArrowDown, ArrowUp } from 'lucide-react';

import { Skeleton } from "@/components/ui/skeleton";

import { MediaFragment } from "@/graphql/types";
import { Button } from "@/components/ui/button";
import CustomImage from "../ui/custom-image";
import AddToCollection from "./add-to-collection";

import { AddToCollection as AddToCollectionType } from "@/types/anime";


interface AnimeListProps {
    quantity?: number;
    list: (MediaFragment | null)[];
}

export function AnimeList({
    list,
    quantity,
}: AnimeListProps) {

    quantity = quantity || list.length;

    const mediaList =
        list?.filter((item): item is MediaFragment => item !== null) || [];

    const [isExpanded, setIsExpanded] = useState(false);
    const displayedList = isExpanded ? mediaList : mediaList.slice(0, quantity);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const [shownAddToCollection, setShownAddToCollection] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState<AddToCollectionType | null>(null);

    const handleAddToCollection = (anime: any) => {
        setSelectedAnime({
            id: anime.id.toString(),
            title: anime.title?.userPreferred || "No Title",
            description: anime.description || "No Description",
            coverImage: anime.coverImage?.extraLarge || "/default.png",
        } as AddToCollectionType);
        setShownAddToCollection(true);
    };


    return (<>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-4 select-none relative">
            {mediaList.length > quantity && !isExpanded && (
                <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-[81]"></div>
            )}
            {displayedList.map((anime, index) => (
                <div
                    key={index}
                    className="relative overflow-hidden cursor-pointer rounded-lg group"
                >
                    <Link key={index} href={`/anime/${anime.id}`} className="z-[80]">
                        <CustomImage
                            index={index}
                            src={anime.coverImage?.extraLarge || "/default.png"}
                            alt={anime.title?.userPreferred || "No Title"}
                            width={460}
                            height={650}
                            className="w-full h-[320px] lg:h-[300px] rounded-lg object-cover scale-100 group-hover:scale-105"
                        />
                    </Link>

                    <div className="absolute bottom-0 w-full p-4 z-50 font-aeonik">
                        <h2 className="font-medium text-md lg:w-[80%] leading-5 text-primary/80">
                            {(anime.title?.userPreferred || "No Title").length > 40
                                ? (anime.title?.userPreferred || "No Title").slice(0, 37) + "..."
                                : anime.title?.userPreferred || "No Title"}
                        </h2>
                        <p className="text-[12px] mt-1 text-primary/70">
                            {anime.seasonYear || "Unknown"}, {anime.genres?.[0] || "Unknown"}
                        </p>
                    </div>
                    {/* Render the anime gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-10% from-black via-[transparent] to-transparent opacity-70 rounded-lg pointer-events-none"></div>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-[100] hidden md:block">
                        <div className="bg-primary rounded-full p-2 shadow-lg hover:bg-secondary-foreground/90 z-50" onClick={() => handleAddToCollection(anime)}>
                            <Plus className="text-secondary h-4 w-4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        {mediaList.length > quantity && (
            <div className="flex justify-center mt-4 w-full">
                <Button
                    onClick={toggleExpanded}
                    variant={"secondary"}
                    className="flex items-center"
                >
                    <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                    {isExpanded ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="h-4 w-4 ml-1" />}
                </Button>
            </div>
        )}

        {selectedAnime &&
            <AddToCollection
                anime={selectedAnime}
                shownAddToCollection={shownAddToCollection}
                setShownAddToCollection={setShownAddToCollection}
            />
        }
    </>);
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