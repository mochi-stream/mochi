/**
 * Component that displays a list of popular anime.
 * Fetches the data from the API and displays a loading skeleton while fetching.
 */

import { useEffect, useState } from "react";

import { AnilistResult } from "@/types/anime";

import { getPopularAnime } from "@/lib/anime";

import { AnimeList, AnimeListSkeleton } from "@/components/anime/anime-list";

import { toast } from "sonner";

export default function Popular() {
  const [popularAnime, setPopularAnime] = useState<AnilistResult[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches the popular anime data from the API and updates the state.
   * Shows a toast error if there is an error fetching the data.
   */
  useEffect(() => {
    async function fetchPopularAnime() {
      try {
        const response = await getPopularAnime();
        setPopularAnime(response.results);
      } catch (error) {
        toast.error("Failed to load popular anime. Please try again later.");
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
      </div>
      {/* Display a loading skeleton if the data is still being loaded */}
      {loading ? (
        <AnimeListSkeleton type="default" />
      ) : (
        // Display the list of popular anime
        <AnimeList type="default" list={popularAnime} />
      )}
    </div>
  );
}
