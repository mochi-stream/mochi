import Link from "next/link";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SearchDialog() {
  const [searchValue, setSearchValue] = useState("");
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
                onChange={(e) => setSearchValue(e.target.value)}
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
            <div className="grid gap-2">
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted/50 transition-colors"
                prefetch={false}
              >
                <div className="flex-1 overflow-hidden text-sm text-muted-foreground text-ellipsis whitespace-nowrap">
                  One Piece (1999)
                </div>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
