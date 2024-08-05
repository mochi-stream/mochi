/**
 * Search dialog component.
 *
 * Allows users to search for anime.
 */

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { cn } from "@/lib/utils";

import lodash from "lodash";

import { searchAnime } from "@/lib/anime";
// import { AnilistResult } from "@/types/anime";

import qs from "query-string";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { Search, X } from "lucide-react";

import { toast } from "sonner";

export default function SearchDialog() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * Handle input change event and perform search.
   *
   * @param {string} userInput - The user input value.
   */
  const handleInputChange = (userInput: string) => {
    setIsLoading(true);
    setResults([]);
    searchAnime(userInput, 1)
      .then((response) => {
        setResults(response.results);
      })
      .catch((error) => {
        toast.error("Failed to load search results. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * Debounce the handleInputChange function.
   */
  const handler = useCallback(lodash.debounce(handleInputChange, 500), []);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (event.target.value !== "") {
      handler(event.target.value);
    } else {
      setResults([]);
    }
  };

  const router = useRouter();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchValue) {
      return;
    }
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { query: searchValue },
      },
      { skipEmptyString: true }
    );
    setOpen(false);
    router.push(url);
  }

  /**
   * Handle keydown event and open the search dialog when Ctrl+K is pressed.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative">
      <Input
        className="rounded-full pl-9 pr-4 py-2 z-10 w-[20rem]"
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search for an anime"
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary/70 cursor-pointer"
      />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => setSearchValue("")}
        className={cn(
          "absolute inset-y-0 right-5 md:right-0 flex items-center pr-2",
          {
            hidden: !searchValue,
          }
        )}
      >
        <X className="w-4 h-4 text-muted-foreground" />
        <span className="sr-only">Clear</span>
      </Button>


      {/* {searchValue && (
        <div className="absolute top-full left-0 right-0 mt-2 w-[20rem] shadow-lg bg-background rounded-lg z-20 grid gap-1 p-4">
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <Link
                  href="#"
                  key={index}
                  className="block"
                  prefetch={false}
                >
                  <Skeleton className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors">
                    <div className="flex-1 h-5 w-40 rounded bg-muted"></div>
                  </Skeleton>
                </Link>
              ))}
            </>
          ) : results && results.length > 1 ? (
            results.slice(0, 10).map((result, index) => (
              <Link
                href={`/anime/${result.id}`}
                key={index}
                onClick={() => setOpen(false)}
                className="flex items-center rounded-md hover:bg-muted/50 transition-colors p-2"
                prefetch={false}
              >
                <div className="flex-1 overflow-hidden text-sm text-muted-foreground text-ellipsis">
                  {result.title.userPreferred}
                </div>
              </Link>
            ))
          ) : null}
        </div>
      )} */}
    </div>

  );
}
