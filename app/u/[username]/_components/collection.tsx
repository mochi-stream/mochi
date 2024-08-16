"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, Folder, Bookmark } from "lucide-react";
import { Status } from "@prisma/client";
import { getCollections } from "@/services/collection";

// import {
//   GetAnimesByIdsQuery,
//   GetAnimesByIdsQueryVariables,
// } from "@/graphql/types";

import { AnimeList, AnimeListSkeleton } from "@/components/anime/list";

import { useQuery } from "@apollo/client";

import { GET_ANIMES_QUERY } from "@/graphql/queries/getAnimesQuery";

export default function Collection(
  { userId }: { userId: string },
) {
  const [collections, setCollections] = useState<any[]>([]);
  const [animeIds, setAnimeIds] = useState<number[]>([]);

  // Query to fetch anime details
  const { data, loading, error } = useQuery<any, any>(
    GET_ANIMES_QUERY,
    {
      variables: { idMals: animeIds },
      skip: animeIds.length === 0,
    }
  );

  useEffect(() => {
    async function fetchCollections() {
      const allCollections = await getCollections(userId);
      setCollections(allCollections);

      // Extract anime IDs and update state
      const ids = allCollections.map((collection) => parseInt(collection.animeId, 10));
      setAnimeIds(ids);
    }

    fetchCollections();
  }, [userId]);

  console.log(collections);
  console.log(animeIds);
  console.log(data);

  return (
    <div className="flex flex-col w-full py-8 px-6 lg:px-12">
      <Tabs defaultValue="watching" className="flex flex-col gap-2 items-start">
        <TabsList className="w-full flex gap-4 items-center">
          <TabsTrigger value="watching">
            <Eye className="w-5 h-5 mr-2" />
            Watching
          </TabsTrigger>
          <TabsTrigger value="to-watch">
            <Bookmark className="w-5 h-5 mr-2" />
            To Watch
          </TabsTrigger>
          <TabsTrigger value="collections">
            <Folder className="w-5 h-5 mr-2" />
            Collections
          </TabsTrigger>
        </TabsList>
        <TabsContent value="watching">
          <div className="px-4 py-2">Watching content</div>
        </TabsContent>
        <TabsContent value="to-watch">
          <div className="px-4 py-2">To Watch content</div>
        </TabsContent>
        <TabsContent value="collections">
          <div className="px-4 py-2">Collections content</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
