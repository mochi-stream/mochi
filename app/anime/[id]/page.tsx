"use client";

import { useQuery, gql } from "@apollo/client";import { toast } from "sonner";

import { ANIME_PAGE_INFO_QUERY } from "@/graphql/queries/animePageInfoQuery";
import { FULL_MEDIA_FRAGMENT } from "@/graphql/fragments/fullMediaFragment";
import {
  MediaType,
  MediaFragment,
  AnimeInfoPageQuery,
  AnimeInfoPageQueryVariables,
} from "@/graphql/types";

import { AnimeList } from "@/components/anime/list";

import { AnimeInformation } from "./components/information";
import Banner from "./components/banner";

interface AnimePageProps {
  params: { id: string };
}

const QUERY = gql`
  ${ANIME_PAGE_INFO_QUERY}
  ${FULL_MEDIA_FRAGMENT}
`;

export default function AnimePage({ params }: AnimePageProps) {
  const { loading, error, data } = useQuery<
    AnimeInfoPageQuery,
    AnimeInfoPageQueryVariables
  >(QUERY, {
    variables: {
      id: parseInt(params.id),
      type: MediaType.Anime,
      isAdult: false,
    },
  });

  if (!loading && (error || !data?.Media?.title?.userPreferred)) {
    toast.error("Failed to load anime data. Please try again later.", {
      duration: 2000,
    });
  }

  const recommendationsArray: (MediaFragment | null)[] =
    data?.Media?.recommendations?.nodes
      ?.filter((node) => node?.mediaRecommendation !== undefined)
      ?.map((node) => node!.mediaRecommendation ?? null) || [];

  const animeRelations = data?.Media?.relations?.nodes?.filter(
    (relation) => relation?.type === "ANIME"
  );

  return (
    <div>
      <title>{`Stream ${data?.Media?.title?.userPreferred || "Anime"
        } on Mochi.`}</title>
      <meta
        property="og:title"
        content={`Stream ${data?.Media?.title?.userPreferred || "Anime"
          } on Mochi.`}
      />

      <Banner data={data} loading={loading} />
      
      <div className="px-2 lg:px-12 py-6">
        <AnimeInformation data={data} id={params.id} />

        {animeRelations && animeRelations.length > 1 && (
          <div className="pt-8">
            <div>
              <h1 className="text-[1.4rem] font-medium">Relation</h1>
            </div>
            <AnimeList list={animeRelations} quantity={6} />
          </div>
        )}
        {recommendationsArray && recommendationsArray.length > 0 && (
          <div className="pt-8">
            <div>
              <h1 className="text-[1.4rem] font-medium">Recommendations</h1>
            </div>
            <AnimeList list={recommendationsArray} />
          </div>
        )}
      </div>
    </div>
  );
}
