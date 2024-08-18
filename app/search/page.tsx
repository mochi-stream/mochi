"use client";

import SearchResults from "./_components/search-results";

export default function SearchPage() {
  return (
    <>
      <div className="flex w-full px-4 lg:px-8 py-6">
        <SearchResults />
      </div>
    </>
  );
}