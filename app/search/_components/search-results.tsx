/**
 * Component that displays the search results.
 * Fetches the data from the API and displays a loading skeleton while fetching.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { searchAnime } from "@/lib/anime";
// import { AnilistResult } from "@/types/anime";

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
  // Get the search parameters from the URL
  const searchParams = useSearchParams();

  // State to store the search results
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // State to indicate if the search results are being loaded
  const [isLoading, setIsLoading] = useState(false);

  // State to indicate if there are more pages of search results to load
  const [hasNextPage, setHasNextPage] = useState(false);

  // State to keep track of the current page of search results being loaded
  const [currentPage, setCurrentPage] = useState(1);

  // Ref to the IntersectionObserver instance
  const observer = useRef<IntersectionObserver | null>(null);

  // Extract and capitalize format from query
  const format = searchParams.get("format")?.toUpperCase() || "";

  /**
   * Fetches the search results from the API.
   * @param page - The page number of the search results to fetch.
   */
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
        throw new Error("Error fetching search results");
      } finally {
        setIsLoading(false);
      }
    },
    [format, searchParams]
  );

  // Fetch the first page of search results when the component mounts
  useEffect(() => {
    setSearchResults([]); // Clear previous results
    setCurrentPage(1); // Reset to the first page
    fetchSearchResults(1);
  }, [fetchSearchResults]);

  /**
   * Loads the next page of search results when the sentinel element is visible in the viewport.
   */
  const loadMoreResults = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchSearchResults(nextPage);
  }, [currentPage, fetchSearchResults]);

  // Set up the IntersectionObserver to load more results when the sentinel element is visible
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
      {/* Display the search query and sorting options */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">
            {`Search Results for "${searchParams.get("query")}"`}
          </h1>
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

      {/* Display the search results */}
      {isLoading && currentPage === 1 ? (
        <AnimeListSkeleton type="search" />
      ) : (
        <AnimeList type="search" list={searchResults} />
      )}

      {/* Display a message if there are no search results */}
      {!isLoading && searchResults.length === 0 && (
        <div className="text-center mt-6">
          <p className="text-muted-foreground">No results found</p>
        </div>
      )}

      {/* Display a sentinel element to load more results */}
      {hasNextPage && (
        <div id="sentinel" className="flex justify-center mt-4"></div>
      )}
    </div>
  );
}
