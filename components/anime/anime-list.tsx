import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";

import WatchListIcon from "@/components/ui/WatchListIcon";
import { Skeleton } from "@/components/ui/skeleton";

import { MediaFragment } from "@/graphql/types";

import { TvMinimal } from "lucide-react";

interface AnimeListProps {
  type: "default" | "search";
  list: (MediaFragment | null)[];
}

const listVariants = cva("mt-6 grid grid-cols-2 gap-2 lg:gap-4 select-none", {
  variants: {
    type: {
      default: "sm:grid-cols-4 lg:grid-cols-5",
      search: "sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

export function AnimeList({ type, list }: AnimeListProps) {
  const addToWatchListHandler = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    console.log("TODO: Adding", id, "to watch list");

    // TODO: Save watchlist into DB
  };

  const mediaList =
    list?.filter((item): item is MediaFragment => item !== null) || [];

  return (
    <div className={cn(listVariants({ type }))}>
      {/* Map over the anime list and render each anime component */}
      {mediaList.map((anime, index) => (
        <div
          key={index}
          className="group relative overflow-hidden shadow-lg p-2 rounded-lg"
        >
          <Link href={`/anime/${anime.id}`}>
            <div className="relative">
              <Image
                src={anime.coverImage?.extraLarge || "default.png"}
                alt={anime.title?.userPreferred || "No Title"}
                width={460}
                height={650}
                loading="lazy"
                className="object-cover w-full h-[300px] lg:h-[370px] rounded-lg transition-all hover:opacity-80"
              />
              {/* Render the anime details */}
              <div className="absolute flex w-11/12 justify-between top-2 left-2">
                <div className="flex">
                  <div
                    className={`bg-purple-800 text-white text-xs font-semibold  px-2 py-1 rounded`}
                  >
                    {/* Render the anime type */}
                    {(anime.type || "").replace(/_/g, " ")}
                  </div>
                  {/* Render the anime total episodes */}
                  {/* {anime.episodes && (
                    <div className="bg-teal-600 text-white text-xs font-semibold rounded-tr rounded-br px-2 py-1 flex items-center">
                      <TvMinimal className="h-3 w-3 mr-1" />
                      {anime.episodes}
                    </div>
                  )} */}
                </div>
                <WatchListIcon
                  id={anime.id}
                  addToWatchList={addToWatchListHandler}
                ></WatchListIcon>
              </div>
              {/* Render the anime gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-10% from-black via-[transparent] to-transparent opacity-70 rounded-lg pointer-events-none"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              {/* Render the anime title */}
              <h2 className="text-md lg:text-lg lg:w-[80%] font-semibold leading-5">
                {(anime.title?.userPreferred || "No Title").length > 40
                  ? (anime.title?.userPreferred || "No Title").slice(0, 37) +
                  "..."
                  : anime.title?.userPreferred || "No Title"}
              </h2>
              {/* Render the anime release date and status */}
              <p className="text-sm mt-1">
                {anime.seasonYear} • {anime.season}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

/**
 * Renders a skeleton of anime results.
 * @function AnimeListSkeleton
 * @param {Omit<AnimeListProps, "list">} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
export function AnimeListSkeleton({ type }: Omit<AnimeListProps, "list">) {
  return (
    <div className={cn(listVariants({ type }))}>
      {/* Map over the number of anime results and render each skeleton */}
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="group relative overflow-hidden shadow-lg p-2 rounded-lg"
          >
            {/* Render the anime image skeleton */}
            <Skeleton className="object-cover w-full h-[300px] lg:h-[370px] rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              {/* Render the anime details skeleton */}
              <Skeleton className="text-md lg:text-lg lg:w-[80%] font-semibold leading-5" />
              <Skeleton className="text-sm mt-1" />
            </div>
          </div>
        ))}
    </div>
  );
}
