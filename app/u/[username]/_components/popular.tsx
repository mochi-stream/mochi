import { useEffect, useState } from "react";

import { AnimeList, AnimeListSkeleton } from "@/components/anime/anime-list";

import { toast } from "sonner";

export default function Watching() {
  const [watchingCollection, setWatchingCollection] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchingCollection() {
      try {
        const response: any = await null;
        setWatchingCollection(response.results);
      } catch (error) {
        toast.error("Failed to load popular anime. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchWatchingCollection();
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
        <AnimeList type="default" list={watchingCollection} />
      )}
    </div>
  );
}
