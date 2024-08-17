import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import lodash from "lodash";
import { AnimeList, AnimeListSkeleton } from "@/components/anime/list";
import { useQuery } from "@apollo/client";
import {
  MediaType,
  SearchPageQuery,
  SearchPageQueryVariables
} from "@/graphql/types";
import { SEARCH_PAGE_QUERY } from "@/graphql/queries/searchPageQuery";
import SearchFilter from "./search-filter";

export default function SearchResults() {
  const searchParams = useSearchParams();

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const query = searchParams.get("query") || undefined;

  const { data, loading, fetchMore, refetch } = useQuery<
    SearchPageQuery,
    SearchPageQueryVariables
  >(SEARCH_PAGE_QUERY, {
    variables: {
      page: currentPage,
      search: query,
      type: MediaType.Anime,
    },
    skip: !query, // Skip query if no search term is provided
    notifyOnNetworkStatusChange: true, // Allow refetching with fetchMore
  });

  const searchResultsData = useMemo(
    () => data?.Page?.media || [],
    [data?.Page?.media]
  );

  const hasNextPage = data?.Page?.pageInfo?.hasNextPage || false;

  const debouncedSearch = useMemo(
    () =>
      lodash.debounce(() => {
        setSearchResults([]); // Clear previous results
        setCurrentPage(1); // Reset to the first page
        refetch({
          page: 1,
          search: query,
        });
      }, 500),
    [query, refetch]
  );

  useEffect(() => {
    debouncedSearch();

    // Cancel the debounce on cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (currentPage === 1) {
      setSearchResults(searchResultsData);
    } else {
      setSearchResults((prevResults) => [
        ...prevResults,
        ...searchResultsData,
      ]);
    }
  }, [searchResultsData, currentPage]);

  const loadMoreResults = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchMore({
        variables: {
          page: currentPage + 1,
        },
      });
    }
  }, [currentPage, hasNextPage, fetchMore]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !loading) {
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
  }, [loadMoreResults, hasNextPage, loading]);

  return (
    <div className="flex-1 overflow-auto">
      {searchParams.get("query") && (
        <>
          <title>{`Search Results for "${searchParams.get("query")}"`}</title>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium">
                {`Search Results for "${searchParams.get("query")}"`}
              </h1>
            </div>
          </div>
        </>
      )}

      <SearchFilter />

      {loading && currentPage === 1 ? (
        <AnimeListSkeleton />
      ) : (
        <AnimeList list={searchResults} />
      )}

      {!loading && searchResults.length === 0 && (
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
