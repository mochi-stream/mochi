import { useEffect, useState, useRef } from "react";

import Link from "next/link";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

import { getTrendingAnime } from "@/handlers/anime";
import { ITitle, IAnimeResult } from "@consumet/extensions";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const animation = { duration: 20000, easing: (t: number) => t };

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
    slides: {
      perView: 5,
      spacing: 15,
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    mode: "snap",
    loop: true,
    renderMode: "precision",
    drag: true,
  });

  if (loading) {
    return <TrendingSkeleton />;
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium">Trending</h1>
        <p className="text-sm text-muted-foreground">Popular animes for you.</p>
      </div>
      <div className="mt-6 keen-slider relative" ref={ref}>
        {trendingAnime.map((anime, index) => (
          <div
            key={index}
            className="keen-slider__slide group overflow-hidden shadow-lg p-2 rounded-lg"
          >
            <Link href={`/anime/${anime.id}`}>
              <Image
                src={anime.image || "default.png"}
                alt={(anime.title as ITitle).userPreferred || "Anime"}
                width={460}
                height={650}
                className="object-cover w-full h-[350px] rounded-lg hover:scale-105 transition-all duration-300 hover:opacity-80"
              />
              <div className="pt-3 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold tracking-tighter">
                  {(anime.title as ITitle).userPreferred || "No Title"}
                </h2>
              </div>
            </Link>
          </div>
        ))}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none opacity-65"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none opacity-65"></div>
      </div>
    </div>
  );
}

function TrendingSkeleton() {
  return (
    <div>
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
