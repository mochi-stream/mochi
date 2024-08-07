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

import sanitizeHtml from 'sanitize-html';

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
  MediaFragment,
  AnimeInfoPageQuery,
  AnimeInfoPageQueryVariables
} from "@/graphql/types";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { AnimeList, AnimeListSkeleton } from "@/components/anime/list";

import Link from "next/link";

import { ArrowUpRight, Check, CirclePlay, Eye, Play, Plus } from "lucide-react";
import { useState } from "react";

export default function AnimePage({ params }: AnimePageProps) {

  const { loading, error, data } = useQuery<AnimeInfoPageQuery, AnimeInfoPageQueryVariables>(QUERY, {
    variables: { id: parseInt(params.id), type: MediaType.Anime, isAdult: false },
  });

  if (!loading && (error || !data?.Media?.title?.userPreferred)) {
    toast.error("Failed to load anime data. Please try again later.", {
      duration: 2000,
    });
  }

  const recommendationsArray: (MediaFragment | null)[] = data?.Media?.recommendations?.nodes
    ?.filter(node => node?.mediaRecommendation !== undefined)
    ?.map(node => node!.mediaRecommendation ?? null) || [];

  const animeRelations = data?.Media?.relations?.nodes?.filter(
    (relation) => relation?.type === "ANIME"
  );

  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const getTextToShow = (text: string) => {
    if (isExpanded) {
      return text;
    }
    return text.length > 350 ? text.substring(0, 350).trim() + '…' : text;
  };

  const sanitizedDescription = sanitizeHtml(data?.Media?.description || "", {
    allowedTags: [],
    allowedAttributes: {},
  }
  );

  return (
    <div>
      {data && data.Media && data.Media.bannerImage
        ?
        <div className="relative h-48 w-full px-4 select-none">
          <div className="absolute inset-0">
            <Image
              src={data.Media.bannerImage}
              alt={data.Media.title?.userPreferred || "Cover Image"}
              layout="fill"
              className="w-full object-cover h-full z-[-5] select-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-[-4]"></div>
          <div className="relative hidden lg:flex justify-end items-end h-full w-full p-4 gap-2">
            {/* <Button className="shadow-lg">Create Thread<ArrowUpRight className="h-4 w-4 ml-1" /></Button> */}
            {data.Media.trailer ? (
              <Link
                href={data.Media.trailer?.site
                  ? `https://${data.Media.trailer?.site}.com/watch?v=${data.Media.trailer?.id}`
                  : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="shadow-lg" variant={"secondary"}>Watch Trailer <ArrowUpRight className="ml-1 h-4 w-4" /></Button>
              </Link>
            ) : null}
            <Button className="shadow-lg">Add to Collection</Button>
          </div>
        </div>
        : loading ? (

          <Skeleton className="h-48 w-full"></Skeleton>
        ) : (
          <div className="h-48 w-full bg-muted"></div>
        )
      }

      <div className="px-2 lg:px-12 py-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-start">
          {data && data.Media && data.Media.coverImage?.extraLarge ? (
            <>
              <Image
                src={data.Media.coverImage?.extraLarge}
                alt={data.Media.title?.userPreferred || "Cover Image"}
                width={1080}
                height={1080}
                loading="lazy"
                className="w-[200px] mt-[-100px] h-[320px] lg:h-[300px] rounded-lg object-cover shadow-lg"
              />
            </>
          ) : loading ? (
            <Skeleton className="w-[200px] mt-[-100px] h-[320px] lg:h-[300px] rounded-lg"></Skeleton>
          ) : (
            <div className="w-[200px] mt-[-100px] h-[320px] lg:h-[300px] rounded-lg bg-muted"></div>
          )}

          <div className="flex flex-col px-8 py-2">
            {loading ? (
              <div>
                <Skeleton className="w-[500px] h-[25px] mt-2"></Skeleton>
                <Skeleton className="w-[300px] h-[15px] mt-1"></Skeleton>
              </div>
            ) : <div>
              <h1 className="text-2xl font-bold">{data?.Media?.title?.userPreferred}</h1>
              {data?.Media?.title?.userPreferred === data?.Media?.title?.english
                ? <p className="text-sm font-bold text-muted-foreground">{data?.Media?.title?.native}</p>
                : <p className="text-sm font-bold text-muted-foreground">{data?.Media?.title?.userPreferred}</p>
              }
              <p className="text-sm text-muted-foreground mt-2">
                <span >
                  {getTextToShow(sanitizedDescription)}
                </span>

                {sanitizedDescription.length > 350 && (
                  <span
                    onClick={handleToggle}
                    className="hover:text-primary/70 text-primary cursor-pointer ml-2"
                  >
                    {isExpanded ? 'Read less' : 'Read more'}
                  </span>
                )}
              </p>
              <div className="flex lg:justify-start justify-center mt-4 gap-2">
                <Button className="shadow-lg">Watch Now<CirclePlay className="h-4 w-4 ml-1" /></Button>
                <Button className="shadow-lg" variant={"secondary"}>View on Threads<ArrowUpRight className="h-4 w-4 ml-1" /></Button>
              </div>
            </div>}

          </div>
        </div>
        {animeRelations && animeRelations.length > 1 && (
          <div className="pt-8">
            <div>
              <h1 className="text-[1.4rem] font-medium">Relation</h1>
            </div>
            <AnimeList list={animeRelations} quantity={6} />
          </div>
        )}
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
  )
}
