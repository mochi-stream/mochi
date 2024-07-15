import { useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

import { IAnimeResult, ITitle } from "@consumet/extensions";

interface IAnimeListProps {
  title: string;
  description: string;
  type: "default" | "search"; // Define the type variant options here
  list: IAnimeResult[];
}

const listVariants = cva("mt-6 grid grid-cols-2 gap-2 lg:gap-4", {
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

export function AnimeList({ title, description, type, list }: IAnimeListProps) {
  return (
    <>
      <div>
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className={cn(listVariants({ type }))}>
        {list.map((anime, index) => (
          <div
            key={index}
            className="group relative overflow-hidden shadow-lg p-2 rounded-lg"
          >
            <Link href={`/anime/${anime.id}`}>
              <div className="relative">
                <Image
                  src={anime.image || "default.png"}
                  alt={
                    (anime.title as ITitle).english ||
                    (anime.title as ITitle).userPreferred ||
                    "No Title"
                  }
                  width={460}
                  height={650}
                  className="object-cover w-full h-[300px] lg:h-[370px] rounded-lg transition-all hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-10% from-black via-[transparent] to-transparent opacity-70 rounded-lg pointer-events-none"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h2 className="text-md lg:text-lg lg:w-[80%] font-semibold leading-5">
                  {(
                    (anime.title as ITitle).english ||
                    (anime.title as ITitle).userPreferred ||
                    "No Title"
                  ).length > 40
                    ? (
                        (anime.title as ITitle).english ||
                        (anime.title as ITitle).userPreferred ||
                        "No Title"
                      ).slice(0, 37) + "..."
                    : (anime.title as ITitle).english ||
                      (anime.title as ITitle).userPreferred ||
                      "No Title"}
                </h2>
                <p className="text-sm mt-1">
                  {anime.releaseDate} • {anime.status}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export function AnimeListSkeleton({
  title,
  description,
  type,
}: IAnimeListProps) {
  return (
    <>
      <div>
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className={cn(listVariants({ type }))}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="group relative overflow-hidden shadow-lg p-2 rounded-lg"
            >
              <Skeleton className="object-cover w-full h-[300px] lg:h-[370px] rounded-lg" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <Skeleton className="text-md lg:text-lg lg:w-[80%] font-semibold leading-5" />
                <Skeleton className="text-sm mt-1" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
