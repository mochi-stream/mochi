import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { searchAnime } from "@/providers/anime";
import { AnilistResult } from "@/types/anime";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AnimeList, AnimeListSkeleton } from "@/components/anime/anime-list";
import { ArrowDownUp } from "lucide-react";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<AnilistResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  // Extract and capitalize format from query
  const format = searchParams.get("format")?.toUpperCase() || "";

  const fetchSearchResults = useCallback(
    async (page: number) => {
      const query = searchParams.get("query") || undefined; // Ensure query is fetched from params
      if (!query) return;
      setIsLoading(true);
      try {
        const response = await searchAnime(query, page, format);
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
    [format, searchParams]
  );

  useEffect(() => {
    setSearchResults([]); // Clear previous results
    setCurrentPage(1); // Reset to the first page
    fetchSearchResults(1);
  }, [fetchSearchResults]);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">{`Search Results for "${searchParams.get(
            "query"
          )}"`}</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="shrink-0">
              <ArrowDownUp className="w-4 h-4 mr-2" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]" align="end">
            <DropdownMenuRadioGroup value="newest">
              <DropdownMenuRadioItem value="newest">
                Newest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">
                Oldest
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isLoading && currentPage === 1 ? (
        <AnimeListSkeleton type="search" />
      ) : (
        <AnimeList type="search" list={searchResults} />
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
