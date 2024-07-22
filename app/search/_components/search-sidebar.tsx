/**
 * Component that renders the search sidebar.
 * It allows the user to filter the search results by anime format.
 */

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

/**
 * Array of anime formats.
 */
const formats: string[] = [
  "TV",
  "TV_SHORT",
  "MOVIE",
  "SPECIAL",
  "OVA",
  "ONA",
  "MUSIC",
];

export default function SearchSidebar() {
  // Get the router and search parameters from Next.js
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the selected format from the search parameters
  const [selectedFormat, setSelectedFormat] = useState<string>(() => {
    const formatParams = searchParams.get("format");
    return formatParams || "";
  });

  /**
   * Handle the checkbox change event.
   * Toggle the selection of the format.
   * @param format - The format that was clicked.
   */
  const handleCheckboxChange = (format: string) => {
    setSelectedFormat((prevFormat) => (prevFormat === format ? "" : format));
  };

  /**
   * Update the URL with the new query parameters when the selected format changes.
   */
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);

    // Update the 'format' query parameter with the selected format
    if (selectedFormat) {
      currentParams.set("format", selectedFormat.toLowerCase());
    } else {
      currentParams.delete("format");
    }

    // Update the URL with the new query parameters
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  }, [selectedFormat, router]);

  return (
    <div className="hidden lg:block lg:w-72 lg:shrink-0">
      {/* Container for the sidebar */}
      <div className="flex h-full flex-col justify-between py-2 px-4">
        {/* Main content */}
        <div className="space-y-6">
          <nav className="space-y-1">
            <div className="space-y-4 select-none">
              {/* Title */}
              <div className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Type
              </div>
              {/* Formats */}
              <div className="w-full space-y-2.5">
                {formats.map((format) => (
                  <div key={format} className="flex items-center text-sm">
                    {/* Checkbox */}
                    <Checkbox
                      className="mr-2"
                      checked={
                        selectedFormat.toLowerCase() === format.toLowerCase()
                      }
                      onClick={() => handleCheckboxChange(format)}
                    />
                    {/* Label */}
                    <Label>{format.replace(/_/g, " ")}</Label>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
