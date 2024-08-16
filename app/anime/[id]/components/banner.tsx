import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import Subscriptions from "./subscriptions";

import { AnimeInfoPageQuery } from "@/graphql/types";
import { ArrowUpRight } from "lucide-react";
import AddToCollection from "@/components/anime/add-to-collection";

import { AddToCollection as AddToCollectionType } from "@/types/anime";
import { useState } from "react";

export default function Banner({
  data,
  loading,
}: {
  data: AnimeInfoPageQuery | undefined;
  loading: boolean;
}) {

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

  return (
    <>
      {data && data.Media && data.Media.bannerImage ? (
        <div className="relative h-56 w-full px-2 select-none">
          <div className="absolute inset-0">
            <Image
              src={data.Media.bannerImage}
              alt={data.Media.title?.userPreferred || "Cover Image"}
              layout="fill"
              className="object-cover z-[-5] select-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-[-4]"></div>
          <div className="relative hidden lg:flex justify-end items-end h-full w-full p-4 gap-2">
            {data.Media.trailer ? (
              <Link
                href={
                  data.Media.trailer?.site
                    ? `https://${data.Media.trailer?.site}.com/watch?v=${data.Media.trailer?.id}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="shadow-lg" variant={"secondary"}>
                  Watch Trailer <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            ) : null}
            <Button className="shadow-lg" onClick={() => handleAddToCollection(data?.Media)}>Add to Collection</Button>
            <Subscriptions animeId={data?.Media?.id} />

            {selectedAnime &&
              <AddToCollection
                anime={selectedAnime}
                shownAddToCollection={shownAddToCollection}
                setShownAddToCollection={setShownAddToCollection}
              />
            }
          </div>
        </div>
      ) : loading ? (
          <Skeleton className="h-56 w-full"></Skeleton>
      ) : (
            <div className="h-56 w-full bg-muted"></div>
      )}
    </>
  );
}
