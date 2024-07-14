import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

import { getTrendingAnime } from "@/handlers/anime";
import { ITitle, IAnimeResult } from "@consumet/extensions";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export function Trending() {
  const [trendingAnime, setTrendingAnime] = useState<IAnimeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingAnime() {
      try {
        const response = await getTrendingAnime();
        setTrendingAnime(response.results);
      } catch (error) {
        console.error("Failed to fetch trending anime:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingAnime();
  }, []);

  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 15,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 5,
          spacing: 15,
        },
      },
    },
    mode: "snap",
    renderMode: "precision",
    drag: true,
    loop: true,
  });

  if (loading) {
    return <TrendingSkeleton />;
  }

  return (
    <div className="px-4 lg:px-8 py-6">
      <div>
        <h1 className="text-2xl font-medium">Trending</h1>
        <p className="text-sm text-muted-foreground">Popular animes for you.</p>
      </div>
      <div
        className="mt-6 keen-slider relative pl-0 lg:pl-[5%]"
        ref={ref}
      >
        {trendingAnime.map((anime, index) => (
          <div
            key={index}
            className="keen-slider__slide group overflow-hidden shadow-lg p-2 rounded-lg"
          >
            <Link href={`/anime/${anime.id}`}>
              <Image
                src={anime.image || "default.png"}
                alt={
                  (anime.title as ITitle).english ||
                  (anime.title as ITitle).userPreferred ||
                  "No Title"
                }
                width={460}
                height={650}
                className="object-cover w-full h-[250px] lg:h-[350px] rounded-lg hover:scale-105 transition-all duration-300 hover:opacity-80"
              />
              <div className="py-3 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold leading-6">
                  {(
                    (anime.title as ITitle).english ||
                    (anime.title as ITitle).userPreferred ||
                    "No Title"
                  ).length > 40
                    ? (
                        (anime.title as ITitle).english ||
                        (anime.title as ITitle).userPreferred ||
                        "No Title"
                      ).slice(0, 37) + "..."
                    : (anime.title as ITitle).english ||
                      (anime.title as ITitle).userPreferred ||
                      "No Title"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {anime.releaseDate} • {anime.status}
                </p>
              </div>
            </Link>
          </div>
        ))}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none opacity-65"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none opacity-65"></div>
      </div>
    </div>
  );
}

function TrendingSkeleton() {
  return (
    <div className="px-4 lg:px-8 py-6">
      <div>
        <h1 className="text-2xl font-medium">Trending</h1>
        <p className="text-sm text-muted-foreground">Popular animes for you.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mt-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-lg shadow-lg h-[350px]"
          >
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
