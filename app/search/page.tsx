/**
 * This component is the main entry point for the search page.
 *
 * @param {SearchPageProps} props - The component props.
 * @returns {JSX.Element} The search page JSX.
 */

"use client";

import { redirect } from "next/navigation";

import SearchResults from "./_components/search-results";
import SearchSidebar from "./_components/search-sidebar";

interface SearchPageProps {
  searchParams: {
    query?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  /**
   * Redirects the user to the home page if no query is provided.
   */
  if (!searchParams.query) {
    redirect("/");
  }

  return (
    <>
      {/* Set the page title based on the query parameter */}
      <title>{`Search for ${capitalize(searchParams.query)} on Mochi`}</title>
      <div className="flex w-full px-4 lg:px-8 py-6">
        {/* Render the search sidebar */}
        <SearchSidebar />
        {/* Render the search results */}
        <SearchResults />
      </div>
    </>
  );
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalize(str: string) {
  if (typeof str !== "string" || !str.length) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Props for the search page.
 */
interface SearchPageProps {
  searchParams: {
    query?: string;
  };
}
