"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import lodash from "lodash";

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { MediaFormat, MediaSeason } from "@/graphql/types";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"

const currentYear = new Date().getFullYear();
const years: number[] = [];

for (let year = currentYear; year >= 1980; year--) {
  years.push(year);
}

const mediaFormatLabels: Partial<Record<MediaFormat, string>> = {
  [MediaFormat.Tv]: 'TV',
  [MediaFormat.TvShort]: 'TV Short',
  [MediaFormat.Ona]: 'ONA',
  [MediaFormat.Ova]: 'OVA',
  [MediaFormat.Special]: 'Special',
  [MediaFormat.Movie]: 'Movie',
  [MediaFormat.OneShot]: 'One Shot'
};

const mediaSeasonLabels: Partial<Record<MediaSeason, string>> = {
  [MediaSeason.Spring]: 'Spring',
  [MediaSeason.Summer]: 'Summer',
  [MediaSeason.Fall]: 'Fall',
  [MediaSeason.Winter]: 'Winter'
};

const mediaSeasons = Object.keys(mediaSeasonLabels) as MediaSeason[];
const mediaFormats = Object.keys(mediaFormatLabels) as MediaFormat[];

export default function SearchFilter() {
  const [yearOpen, setYearOpen] = useState(false)
  const [yearValue, setYearValue] = useState("")
  const [formatOpen, setFormatOpen] = useState(false);
  const [formatValue, setFormatValue] = useState("");

  const [seasonOpen, setSeasonOpen] = useState(false);
  const [seasonValue, setSeasonValue] = useState("");

  const [queryValue, setQueryValue] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const year = searchParams.get("year");
    if (year) {
      setYearValue(year);
    }

    const format = searchParams.get("format")?.toLocaleUpperCase();
    if (format) {
      setFormatValue(format);
    }

    const season = searchParams.get("season")?.toLocaleUpperCase();
    if (season) {
      setSeasonValue(season);
    }

    const query = searchParams.get("query");
    if (query) {
      setQueryValue(query);
    }
  }, [searchParams]);

  const handleFormatSelect = (currentValue: string) => {
    const newValue = currentValue === formatValue ? "" : currentValue;
    setFormatValue(newValue);
    setFormatOpen(false);

    const params = new URLSearchParams(searchParams.toString());

    if (newValue) {
      params.set("format", newValue.toLocaleLowerCase());
    } else {
      params.delete("format");
    }

    router.push(`/search?${params.toString()}`);
  };


  const handleYearSelect = (currentValue: string) => {
    const newValue = currentValue === yearValue ? "" : currentValue;
    setYearValue(newValue);
    setYearOpen(false);

    const params = new URLSearchParams(searchParams.toString());

    if (newValue) {
      params.set("year", newValue);
    } else {
      params.delete("year");
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleSeasonSelect = (currentValue: string) => {
    const newValue = currentValue === seasonValue ? "" : currentValue;
    setSeasonValue(newValue);
    setSeasonOpen(false);

    const params = new URLSearchParams(searchParams.toString());

    if (newValue) {
      params.set("season", newValue.toLocaleLowerCase());
    } else {
      params.delete("season");
    }

    router.push(`/search?${params.toString()}`);
  };


  const debouncedQueryChange = useMemo(
    () =>
      lodash.debounce((newValue: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newValue) {
          params.set("query", newValue);
        } else {
          params.delete("query");
        }

        router.push(`/search?${params.toString()}`);
      }, 500), // 500ms debounce delay
    [searchParams, router]
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQueryValue(newValue);

    debouncedQueryChange(newValue);
  };

  return (

    <div className="w-full grid md:grid-cols-10 pt-4 justify-between">
      <div className="col-span-2 flex flex-col gap-2 justify-between">
        <p className="text-sm text-muted-foreground ml-2">Search</p>
        <Input
          placeholder="Search..."
          className="w-fit rounded-full"
          value={queryValue}
          onChange={handleQueryChange}
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2 justify-between">
        <p className="text-sm text-muted-foreground ml-2">Format</p>
        <Popover open={formatOpen} onOpenChange={setFormatOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={formatOpen}
              className="w-[200px] justify-between"
            >
              {formatValue
                ? mediaFormatLabels[formatValue as MediaFormat] || "Unknown"
                : "Select Format..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Format..." />
              <CommandList>
                <CommandEmpty>No format found.</CommandEmpty>
                <CommandGroup>
                  {mediaFormats.map((format) => (
                    <CommandItem
                      key={format}
                      value={format}
                      onSelect={handleFormatSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          formatValue === format ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {mediaFormatLabels[format]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="col-span-2 flex flex-col gap-2 justify-between">
        <p className="text-sm text-muted-foreground ml-2">Year</p>
        <Popover open={yearOpen} onOpenChange={setYearOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={yearOpen}
              className="w-[200px] justify-between"
            >
              {yearValue
                ? years.find((year) => year === Number(yearValue))
                : "Select Year..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Year..." />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  {years.map((year) => (
                    <CommandItem
                      key={year}
                      value={year.toString()}
                      onSelect={handleYearSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          yearValue === year.toString() ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {year}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="col-span-2 flex flex-col gap-2 justify-between">
        <p className="text-sm text-muted-foreground ml-2">Season</p>
        <Popover open={seasonOpen} onOpenChange={setSeasonOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={seasonOpen}
              className="w-[200px] justify-between"
            >
              {seasonValue
                ? mediaSeasonLabels[seasonValue as MediaSeason] || "Unknown"
                : "Select Season..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Season..." />
              <CommandList>
                <CommandEmpty>No season found.</CommandEmpty>
                <CommandGroup>
                  {mediaSeasons.map((season) => (
                    <CommandItem
                      key={season}
                      value={season}
                      onSelect={handleSeasonSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          seasonValue === season ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {mediaSeasonLabels[season]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>

  )
}