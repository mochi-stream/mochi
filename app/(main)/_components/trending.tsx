import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

import { getTrendingAnime } from "@/handlers/anime";
import { ITitle, IAnimeResult } from "@consumet/extensions";

const shuffle = (array: IAnimeResult[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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

  if (loading) {
    return <TrendingSkeleton />;
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium">Trending</h1>
        <p className="text-sm text-muted-foreground">Popular animes for you.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-6">
        {shuffle(trendingAnime.slice(0, 5)).map((anime, index) => (
          <div key={index} className="group overflow-hidden shadow-lg">
            <Link href={`/anime/${anime.id}`}>
              <Image
                src={anime.image || "default.png"}
                alt={(anime.title as ITitle).userPreferred || "Anime"}
                width={460}
                height={650}
                className="object-cover w-full h-[350px] rounded-lg hover:scale-105 transition-all duration-300 hover:opacity-80"
              />
              <div className="pt-3 flex-1 flex flex-col ">
                <h2 className="text-lg font-semibold tracking-tighter">
                  {(anime.title as ITitle).userPreferred || "No Title"}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="group overflow-hidden rounded-lg shadow-lg h-[350px]"
        >
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}
