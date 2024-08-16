// FIXME: Getting Rate Limited easily. If cause much issue we will move to consumet.

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import lodash from "lodash";

import qs from "query-string";

import { useQuery } from "@apollo/client";
import {
    AutocompleteSearchQuery,
    AutocompleteSearchQueryVariables
} from "@/graphql/types";

import { AUTOCOMPLETE_SEARCH_QUERY } from "@/graphql/queries/autoCompleteSearchQuery";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search, X } from "lucide-react";

import { toast } from "sonner";
import { SearchResults, SearchResultsSkeleton } from "./results";

export default function SearchDialog() {
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
    const [results, setResults] = useState<AutocompleteSearchQuery["Page"]>();

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const resultsRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { data, loading, error, refetch } = useQuery<AutocompleteSearchQuery, AutocompleteSearchQueryVariables>(AUTOCOMPLETE_SEARCH_QUERY, {
        skip: !(debouncedSearchValue.trim()),
        variables: { search: debouncedSearchValue },
    });

    const handleInputChange = (userInput: string) => {
        setIsLoading(true);
        setResults(undefined);
        setDebouncedSearchValue(userInput);

        refetch({ search: userInput })
            .then((response) => {
                setResults(response.data.Page);
            })
            .catch((error) => {
                toast.error("Failed to load search results. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handler = useCallback(lodash.debounce(handleInputChange, 500), []);

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setOpen(true);
        if (event.target.value !== "") {
            handler(event.target.value);
        } else {
            setResults(undefined);
        }
    };

    const router = useRouter();
    function onSubmit() {
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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (inputRef.current && event.ctrlKey && event.key === "k") {
                event.preventDefault();
                inputRef.current.focus();
                const length = inputRef.current.value.length;
                inputRef.current.setSelectionRange(length, length);
                setOpen(true);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (
                resultsRef.current &&
                !resultsRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative hidden lg:block">
            <Input
                ref={inputRef}
                className="rounded-full pl-9 pr-4 py-2 z-10 w-[20rem]"
                value={searchValue}
                onChange={onSearchChange}
                onFocus={() => searchValue && setOpen(true)}
                placeholder="Search for an anime"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit();
                    }
                }}
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

            {searchValue && open && (
                <div
                    ref={resultsRef}
                    className="absolute top-full left-0 right-0 mt-2 w-[20rem] shadow-lg bg-background rounded-lg z-[ grid gap-1 p-4 border border-input"
                >
                    {isLoading ? (
                        <SearchResultsSkeleton />
                    ) : searchValue && results?.media && results?.media.length > 0 ? (
                        <SearchResults results={results} setOpen={setOpen} />
                    ) : debouncedSearchValue && (<div className="text-center text-sm text-muted-foreground">
                        No results found {results?.media && results?.media.length > 0 ? 'for "' + searchValue + '"' : ''}
                    </div>)
                    }
                </div>
            )}
        </div>
    );
}
