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
import { AnilistResult } from "@/types/anime";

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
  const [results, setResults] = useState<AnilistResult[]>([]);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Search className="w-5 h-5 text-primary cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Find what you&apos;re looking for.</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={onSubmit}>
            <div className="flex justify-between">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-muted-foreground" />
                </div>
                <Input
                  type="search"
                  value={searchValue}
                  onChange={onSearchChange}
                  placeholder="Search for an anime"
                  className="w-[95%] md:w-full h-10 pl-10 pr-10 text-sm bg-background border border-input rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setSearchValue("")}
                  className={cn(
                    "absolute inset-y-0 right-5 md:right-0 flex items-center pr-3",
                    {
                      hidden: !searchValue,
                    }
                  )}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                  <span className="sr-only">Clear</span>
                </Button>
              </div>
              <Button type="submit">Search</Button>
            </div>
          </form>
          <div className="max-h-[300px] overflow-auto">
            <div className="grid gap-3">
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
                results.map((result, index) => (
                  <Link
                    href={`/anime/${result.id}`}
                    key={index}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted/50 transition-colors"
                    prefetch={false}
                  >
                    <div className="flex-1 overflow-hidden text-sm text-muted-foreground text-ellipsis">
                      {result.title.english || result.title.userPreferred}
                    </div>
                  </Link>
                ))
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
