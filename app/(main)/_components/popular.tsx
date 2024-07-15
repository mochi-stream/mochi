import { useEffect, useState } from "react";

import { IAnimeResult } from "@consumet/extensions";

import { getPopularAnime } from "@/handlers/anime";

import { AnimeList } from "@/components/anime/anime-list";

export default function Popular() {
  const [popularAnime, setPopularAnime] = useState<IAnimeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingAnime() {
      try {
        const response = await getPopularAnime();
        setPopularAnime(response.results);
      } catch (error) {
        console.error("Failed to fetch trending anime:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingAnime();
  }, []);

  // TODO: Add Skeleton

  return (
    <div className="px-4 lg:px-8">
      <AnimeList
        title="Popular Animes"
        type="default"
        list={popularAnime}
        description=""
      />
    </div>
  );
}
