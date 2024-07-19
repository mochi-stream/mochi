import { useEffect, useState } from "react";

import { IAnimeResult } from "@consumet/extensions";

import { getPopularAnime } from "@/handlers/anime";

import { AnimeList, AnimeListSkeleton } from "@/components/anime/anime-list";

export default function Popular() {
  const [popularAnime, setPopularAnime] = useState<IAnimeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopularAnime() {
      try {
        const response = await getPopularAnime();
        setPopularAnime(response.results);
      } catch (error) {
        console.error("Failed to fetch popular anime:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularAnime();
  }, []);

  return (
    <div className="px-4 lg:px-8 py-6">
      <div>
        <h1 className="text-2xl font-medium">Popular Animes of All Time</h1>
        {/* <p className="text-sm text-muted-foreground">{description}</p> */}
      </div>
      {loading ? (
        <AnimeListSkeleton type="default" />
      ) : (
        <AnimeList type="default" list={popularAnime} />
      )}
    </div>
  );
}
