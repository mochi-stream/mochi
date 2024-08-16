import Link from "next/link";
import CustomImage from "@/components/ui/custom-image";
import sanitizeHtml from 'sanitize-html'

import {
    AutocompleteSearchQuery,
} from "@/graphql/types";

import { Skeleton } from "@/components/ui/skeleton";

export function SearchResults({ results, setOpen }: { results: AutocompleteSearchQuery["Page"], setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            {results?.media && results?.media.length > 0 && results?.media.slice(0, 3).map((result, index: number) => (
                <Link
                    href={`/anime/${result?.id}`}
                    key={result?.id || index}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-md hover:bg-muted/50 transition-colors p-2"
                    prefetch={false}
                >
                    <div className="w-20 h-28 mr-4">
                        <CustomImage
                            src={result?.coverImage?.extraLarge || '/default-cover-image.jpg'}
                            alt={result?.title?.userPreferred || 'Cover Image'}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="text-sm font-semibold text-muted-foreground mb-1">
                            {result?.title?.userPreferred || 'Untitled'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {result?.description && sanitizeHtml(
                                result.description.length > 80
                                    ? `${result.description.substring(0, 80)}...`
                                    : result.description,
                                {
                                    allowedTags: [],
                                    allowedAttributes: {},
                                }
                            )}
                            <div className="mt-1">
                                {result?.seasonYear || "Unknown"}, {result?.genres?.[0] || "Unknown"}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
}

export function SearchResultsSkeleton() {
    return <>
        {Array.from({ length: 3 }).map((_, index) => (
            <div
                key={index}
                className="flex items-center rounded-md p-2 space-x-4 animate-pulse"
            >
                <Skeleton className="w-20 h-28 rounded-md"></Skeleton>

                <div className="flex-1 space-y-2">
                    <Skeleton className="w-3/4 h-4 rounded"></Skeleton>
                    <Skeleton className="w-full h-3 rounded"></Skeleton>
                    <Skeleton className="w-5/6 h-3 rounded"></Skeleton>
                </div>
            </div>
        ))}
    </>;
}