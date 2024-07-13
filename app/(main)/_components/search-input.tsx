import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <div className="block sm:hidden">
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
      <div className="hidden sm:block relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <Input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="w-full h-10 pl-10 pr-10 text-sm bg-background border border-input rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSearchValue("")}
          className={cn("absolute inset-y-0 right-0 flex items-center pr-3", {
            hidden: !searchValue,
          })}
        >
          <X className="w-5 h-5 text-muted-foreground" />
          <span className="sr-only">Clear</span>
        </Button>
      </div>
    </>
  );
}
