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
    <></>
    // <div className="relative w-full h-96">
    //   {/* Banner Image */}
    //   <div className="absolute inset-0 h-[70%] w-full">
    //     <Image
    //       src={anime.cover}
    //       alt={
    //         anime.title.userPreferred ||
    //         anime.title.english ||
    //         anime.title.romaji
    //       }
    //       layout="fill"
    //       className="object-cover w-full h-full opacity-80"
    //     />
    //   </div>
    //   {/* Content */}
    //   <div className="relative z-10 flex flex-col items-start p-8 space-y-4">
    //     <div className="flex items-center">
    //       <div className="w-32 h-48 relative mr-4">
    //         <Image
    //           src={anime.image}
    //           alt={
    //             anime.title.userPreferred ||
    //             anime.title.english ||
    //             anime.title.romaji
    //           }
    //           layout="fill"
    //           objectFit="cover"
    //           className="rounded-lg shadow-lg"
    //         />
    //       </div>
    //       <div>
    //         <h1 className="text-3xl font-bold text-white">
    //           {anime.title.userPreferred ||
    //             anime.title.english ||
    //             anime.title.romaji}
    //         </h1>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
