import { useState, useCallback, useEffect } from "react";

import { searchAnime } from "@/handlers/anime";
import { IAnimeResult } from "@consumet/extensions";

import { AnimeList, AnimeListSkeleton } from "@/components/anime/anime-list";

export default function SearchResults({ query }: { query: string }) {
  const [searchResults, setSearchResults] = useState<IAnimeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        const response = await searchAnime(query);
        setSearchResults(response.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="flex-1 overflow-auto">
      {isLoading ? (
        <AnimeListSkeleton
          title={`Search Results for "${query}"`}
          type="search"
          description=""
        />
      ) : (
        <AnimeList
          title={`Search Results for "${query}"`}
          type="search"
          list={searchResults}
          description=""
        />
      )}
    </div>
  );
}
