// TODO: Skeleton
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import sanitizeHtml from "sanitize-html";

import { AnimeInfoPageQuery, MediaStatus } from "@/graphql/types";

import AnimeInfoTabs from "./details-tabs";

import { ArrowUpRight, CirclePlay, Plus } from "lucide-react";

import { format, addSeconds } from 'date-fns';

import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert"


// import { Skeleton } from "@/components/ui/skeleton";

export function AnimeInformation({
    data,
    id,
    loading,
}: {
    id: string;
    data: AnimeInfoPageQuery | undefined;
    loading: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const getTextToShow = (text: string) => {
        if (isExpanded) {
            return text;
        }
        return text.length > 350 ? text.substring(0, 350).trim() + "…" : text;
    };

    const sanitizedDescription = sanitizeHtml(data?.Media?.description || "", {
        allowedTags: [],
        allowedAttributes: {},
    });

    // Convert seconds to milliseconds
    const secondsUntilAiring = data?.Media?.nextAiringEpisode?.timeUntilAiring || 0;
    const date = new Date();
    const airingDate = addSeconds(date, secondsUntilAiring);

    // Format the date according to the user's local timezone
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // e.g., 'Sunday'
        day: 'numeric',   // e.g., '18'
        month: 'short',   // e.g., 'Aug'
        year: 'numeric',  // e.g., '2024'
        hour: 'numeric',  // e.g., '6'
        minute: 'numeric',// e.g., '00'
        timeZoneName: 'short', // e.g., 'GMT+5:30'
    };

    const formattedDate = new Intl.DateTimeFormat(undefined, options).format(airingDate);


    return (
        <>
            <meta
                name="description"
                content={
                    sanitizedDescription.length > 150
                        ? sanitizedDescription.substring(0, 150).trim() + "…"
                        : sanitizedDescription
                }
            />
            <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-start">
                {data && data.Media && data.Media.coverImage?.extraLarge ? (
                    <>
                        <Image
                            src={data.Media.coverImage?.extraLarge}
                            alt={data.Media.title?.userPreferred || "Cover Image"}
                            width={1080}
                            height={1080}
                            className="w-[200px] mt-[-100px] h-[320px] lg:h-[300px] rounded-lg object-cover shadow-lg"
                        />
                    </>
                ) : (
                    <div className="w-[200px] mt-[-100px] h-[320px] lg:h-[300px] rounded-lg"></div>
                )}

                <div className="flex flex-col px-8 py-2 w-[95%] md:w-full">
                    {!loading && (
                        <div>
                            <h1 className="text-2xl font-bold">
                                {data?.Media?.title?.english ?? data?.Media?.title?.userPreferred}
                            </h1>
                            <p className="text-sm font-bold text-muted-foreground">
                                {data?.Media?.title?.romaji} • {data?.Media?.title?.native}
                            </p>
                            {sanitizedDescription && (
                                <p className="text-sm text-muted-foreground mt-2">
                                    <span>{getTextToShow(sanitizedDescription)}</span>

                                    {sanitizedDescription.length > 350 && (
                                        <span
                                            onClick={handleToggle}
                                            className="hover:text-primary/70 text-primary cursor-pointer ml-2 select-none"
                                        >
                                            {isExpanded ? "Read less" : "Read more"}
                                        </span>
                                    )}
                                </p>
                            )}
                            <div className="flex flex-col lg:flex-row items-center md:justify-start justify-center mt-4 gap-2">
                                <div className="flex gap-2 py-2">
                                    <Link href={`/stream/${id}/1`}>
                                        {data?.Media?.status === MediaStatus.NotYetReleased ? (
                                            <Button className="shadow-lg">
                                                Plan To Watch
                                                <Plus className="h-4 w-4 ml-1" />
                                            </Button>
                                        ) : (
                                            <Button className="shadow-lg">
                                                Watch Now
                                                <CirclePlay className="h-4 w-4 ml-1" />
                                            </Button>
                                        )}

                                    </Link>
                                    <Button className="shadow-lg w-fit" variant={"secondary"}>
                                        Start a Thread
                                        <ArrowUpRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                                {data?.Media?.nextAiringEpisode?.episode &&
                                    <Alert>
                                        <AlertDescription className="text-muted-foreground">
                                            Episode {data?.Media?.nextAiringEpisode?.episode} is estimated to air on <span className="text-primary">{formattedDate}</span>
                                        </AlertDescription>
                                    </Alert>}
                            </div>
                        </div>
                    )}
                </div>
            </div >
            {data && (
                <div className="flex md:grid grid-cols-16 flex-col lg:flex-row justify-between pt-2 md:pt-8 gap-4">
                    <div className="grid col-span-4 px-4 md:px-6 lg:px-0 pt-2 h-fit w-[95%]">
                        <h1 className="text-xl select-none font-semibold">Details</h1>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            <span className="text-primary font-semibold">Status:</span>{" "}
                            {data?.Media?.status
                                ? data?.Media?.status === MediaStatus.NotYetReleased
                                    ? "Upcoming"
                                    : data?.Media?.status.charAt(0) + data?.Media?.status.slice(1).toLowerCase()
                                : "-"}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            <span className="text-primary font-semibold">Format:</span>{" "}
                            {data?.Media?.format || "-"}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            <span className="text-primary font-semibold">Genres:</span>{" "}
                            {data?.Media?.genres?.map((name, index) => (
                                <Link
                                    href={`/search?genre=${name?.toLowerCase()}`}
                                    key={index}
                                    className="hover:text-primary cursor-pointer select-none"
                                >
                                    {name}
                                    {index < (data?.Media?.genres?.length || 0) - 1 && ", "}
                                </Link>
                            ))}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            <span className="text-primary font-semibold">Score:</span>{" "}
                            {data?.Media?.averageScore !== null ? `${data?.Media?.averageScore}%` : "Unknown"}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            <span className="text-primary font-semibold">Episodes:</span>{" "}
                            {data?.Media?.episodes || "Unknown"}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            <span className="text-primary font-semibold">Duration:</span>{" "}
                            {data?.Media?.duration ? `${data?.Media?.duration} min` : "Unknown"}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            <span className="text-primary font-semibold">Season:</span>{" "}
                            {data?.Media?.season
                                ? `${data?.Media?.season?.charAt(0) +
                                data?.Media?.season?.slice(1).toLowerCase()
                                } ${data?.Media?.seasonYear || "-"}`
                                : "-"}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            {data?.Media?.startDate?.year && (
                                <span className="text-primary font-semibold">Start Date: </span>
                            )}
                            {data?.Media?.startDate?.year &&
                                new Date(
                                    data?.Media?.startDate?.year!,
                                    data?.Media?.startDate?.month! - 1 || 0,
                                    data?.Media?.startDate?.day! || 0
                                ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            {data?.Media?.endDate?.year && (
                                <span className="text-primary font-semibold">End Date: </span>
                            )}
                            {data?.Media?.endDate?.year &&
                                new Date(
                                    data?.Media?.endDate?.year!,
                                    data?.Media?.endDate?.month! - 1 || 0,
                                    data?.Media?.endDate?.day! || 0
                                ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                        </p>
                    </div>
                    <div className="col-span-12 flex flex-col flex-grow">
                        <AnimeInfoTabs
                            animeId={data?.Media?.id ?? null}
                            characters={data?.Media?.characterPreview}
                            staff={data?.Media?.staffPreview?.edges}
                            episodes={data?.Media?.streamingEpisodes}
                        />
                    </div>
                </div>
            )
            }
        </>
    );
}