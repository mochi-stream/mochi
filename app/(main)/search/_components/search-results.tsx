import { useState, useEffect, useCallback, useRef } from "react";

import { searchAnime } from "@/handlers/anime";
import { IAnimeResult } from "@consumet/extensions";

import { AnimeList, AnimeListSkeleton } from "@/components/anime/anime-list";
import { Button } from "@/components/ui/button";

export default function SearchResults({ query }: { query: string }) {
  const [searchResults, setSearchResults] = useState<IAnimeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchSearchResults = useCallback(
    async (page: number) => {
      if (!query) return;
      setIsLoading(true);
      try {
        const response = await searchAnime(query, page);
        setHasNextPage(response.hasNextPage || false);
        setSearchResults((prevResults) => [
          ...prevResults,
          ...response.results,
        ]);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    setSearchResults([]); // Clear previous results
    setCurrentPage(1); // Reset to the first page
    fetchSearchResults(1);
  }, [query, fetchSearchResults]);

  const loadMoreResults = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchSearchResults(nextPage);
  }, [currentPage, fetchSearchResults]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isLoading) {
        loadMoreResults();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);
    const sentinel = document.querySelector("#sentinel");
    if (sentinel) {
      observer.current.observe(sentinel);
    }

    return () => {
      if (observer.current && sentinel) {
        observer.current.unobserve(sentinel);
      }
    };
  }, [loadMoreResults, hasNextPage, isLoading]);

  return (
    <div className="flex-1 overflow-auto">
      {isLoading && currentPage === 1 ? (
        <AnimeListSkeleton
          title={`Search Results for "${query}"`}
          type="default"
          description=""
        />
      ) : (
        <AnimeList
          title={`Search Results for "${query}"`}
          type="default"
          list={searchResults}
          description=""
        />
      )}

      {!isLoading && searchResults.length === 0 && (
        <div className="text-center mt-6">
          <p className="text-muted-foreground">No results found</p>
        </div>
      )}

      {hasNextPage && (
        <div id="sentinel" className="flex justify-center mt-4"></div>
      )}
    </div>
  );
}
