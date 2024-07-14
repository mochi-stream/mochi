import { useState, useCallback } from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";

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

import lodash from "lodash";

import { searchAnime } from "@/handlers/anime";
import { IAnimeResult, ITitle } from "@consumet/extensions";

export default function SearchDialog() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<IAnimeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (userInput: string) => {
    setIsLoading(true);
    searchAnime(userInput)
      .then((response) => {
        setResults(response.results);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handler = useCallback(lodash.debounce(handleInputChange, 500), []);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handler(event.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Search className="w-5 h-5 text-primary cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Find what you&apos;re looking for.</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                type="search"
                value={searchValue}
                onChange={onSearchChange}
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-10 text-sm bg-background border border-input rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchValue("")}
                className={cn(
                  "absolute inset-y-0 right-0 flex items-center pr-3",
                  {
                    hidden: !searchValue,
                  }
                )}
              >
                <X className="w-5 h-5 text-muted-foreground" />
                <span className="sr-only">Clear</span>
              </Button>
            </div>
            <Button>Search</Button>
          </div>
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
                    className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted/50 transition-colors"
                    prefetch={false}
                  >
                    <div className="flex-1 overflow-hidden text-sm text-muted-foreground text-ellipsis">
                      {(result.title as ITitle).english ||
                        (result.title as ITitle).userPreferred}
                    </div>
                  </Link>
                ))
              ) : !results ? (
                <div className="text-muted-foreground text-sm">
                  No results found
                </div>
              ) : error ? (
                <div className="text-muted-foreground text-sm">{error}</div>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
