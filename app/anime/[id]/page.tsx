/**
 * AnimePage component.
 * Renders the details of a specific anime.
 *
 * @param {AnimePageProps} props - The props object containing the id of the anime.
 */

"use client";

import Image from "next/image";

import { useQuery, gql } from "@apollo/client";

import { ANIME_PAGE_INFO_QUERY } from "@/graphql/queries/animePageInfoQuery";
import { FULL_MEDIA_FRAGMENT } from "@/graphql/fragments/fullMediaFragment";

interface AnimePageProps {
  params: { id: string };
}

const QUERY = gql`
  ${ANIME_PAGE_INFO_QUERY}
  ${FULL_MEDIA_FRAGMENT}
`;

import { toast } from "sonner";

import {
  MediaType,
  AnimeInfoPageQuery,
  AnimeInfoPageQueryVariables
} from "@/graphql/types";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import Link from "next/link";


export default function AnimePage({ params }: AnimePageProps) {

  const { loading, error, data } = useQuery<AnimeInfoPageQuery, AnimeInfoPageQueryVariables>(QUERY, {
    variables: { id: parseInt(params.id), type: MediaType.Anime, isAdult: false },
  });

  if (!loading && (!data || error || !data?.Media?.title?.userPreferred)) {
    toast.error("Failed to load anime data. Please try again later.", {
      duration: 2000,
    });
  }

  return (
    <div>
      {/* Banner */}
      {data && data.Media && data.Media.bannerImage
        ?
        <div className="relative h-48 w-full select-none">
          <div className="absolute inset-0">
            <Image
              src={data.Media.bannerImage}
              alt={data.Media.title?.userPreferred || "Cover Image"}
              layout="fill"
              objectFit="cover"
              className="w-full h-full z-[-5] select-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-[-4]"></div>
          <div className="relative flex justify-end items-end h-full w-full p-4">
            {data.Media.trailer ? (
              <Link
                href={data.Media.trailer?.site
                  ? `https://${data.Media.trailer?.site}.com/watch?v=${data.Media.trailer?.id}`
                  : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="shadow-lg">Watch Trailer</Button>
              </Link>
            ) : null}
          </div>
        </div>
        : loading ? (

          <Skeleton className="h-48 w-full"></Skeleton>
        ) : (
          <div className="h-48 w-full bg-muted"></div>
        )
      }

      <div className="px-4 lg:px-12 py-6">
        <div>
          {data && data.Media && data.Media.coverImage?.extraLarge ? (
            <Image
              src={data.Media.coverImage?.extraLarge}
              alt={data.Media.title?.userPreferred || "Cover Image"}
              width={1080}
              height={1080}
              loading="lazy"
              className="w-[200px] mt-[-100px] h-[320px] lg:h-[300px] rounded-lg object-cover shadow-lg"
            />
          ) : loading ? (
            <Skeleton className="w-[200px] mt-[-100px] h-[320px] lg:h-[300px] rounded-lg"></Skeleton>
          ) : (
            <div className="w-[200px] mt-[-100px] h-[320px] lg:h-[300px] rounded-lg bg-muted"></div>
          )}
        </div>


        {/* Content */}
        {/* <div className="relative z-10 flex flex-col items-start p-8 space-y-4">
        <div className="flex items-center">
          <div className="w-32 h-48 relative mr-4">
            <Image
              src={anime.image}
              alt={
                anime.title.userPreferred ||
                anime.title.english ||
                anime.title.romaji
              }
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {anime.title.userPreferred ||
                anime.title.english ||
                anime.title.romaji}
            </h1>
          </div>
        </div>
      </div> */}
      </div>
    </div >
  )
}
