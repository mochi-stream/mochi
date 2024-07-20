import { useEffect, useState } from "react";
import { AnilistResult } from "@/types/anime";
import { getUpcomingAnime } from "@/lib/anime";
import { AnimeList, AnimeListSkeleton } from "@/components/anime/anime-list";

export default function Upcoming() {
  const [upcomingAnime, setUpcomingAnime] = useState<AnilistResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUpcomingAnime() {
      try {
        const response = await getUpcomingAnime();
        setUpcomingAnime(response.results);
      } catch (error) {
        console.error("Failed to fetch upcoming anime:", error);
        setError("Failed to load upcoming anime. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchUpcomingAnime();
  }, []);

  return (
    <div className="px-4 lg:px-8 py-6">
      <div>
        <h1 className="text-2xl font-medium">Upcoming Animes</h1>
        {/* <p className="text-sm text-muted-foreground">{description}</p> */}
      </div>
      {loading ? (
        <AnimeListSkeleton type="default" />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <AnimeList type="default" list={upcomingAnime} />
      )}
    </div>
  );
}
