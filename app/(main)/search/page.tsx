"use client";

import { redirect } from "next/navigation";

import SearchResults from "./_components/search-results";

interface SearchPageProps {
  searchParams: {
    query?: string;
  };
}

function capitalize(str: string) {
  if (typeof str !== "string" || !str.length) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.query) {
    redirect("/");
  }
  return (
    <>
      <title>{`Search for ${capitalize(searchParams.query)} on Mochi`}</title>
      <div className="flex w-full px-4 lg:px-8 py-6">
        <SearchResults query={searchParams.query} />
      </div>
    </>
  );
}
