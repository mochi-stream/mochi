import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formats: string[] = [
  "TV",
  "TV Short",
  "Movie",
  "Special",
  "OVA",
  "ONA",
  "Music",
];

export default function SearchSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFormat, setSelectedFormat] = useState<string>(() => {
    const formatParams = searchParams.get("format");
    return formatParams || ""; // Initialize with the existing format if available
  });

  const handleCheckboxChange = (format: string) => {
    setSelectedFormat(
      (prevFormat) => (prevFormat === format ? "" : format) // Toggle selection
    );
  };

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
      <div className="flex h-full flex-col justify-between py-2 px-4">
        <div className="space-y-6">
          <nav className="space-y-1">
            <div className="space-y-4 select-none">
              <div className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Type
              </div>
              <div className="w-full space-y-2.5">
                {formats.map((format) => (
                  <div key={format} className="flex items-center text-sm">
                    <Checkbox
                      className="mr-2"
                      checked={selectedFormat === format}
                      onClick={() => handleCheckboxChange(format)}
                    />
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
