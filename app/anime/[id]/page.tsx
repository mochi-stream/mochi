"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { getAnimeDetails } from "@/providers/anime";
import { AnimeInfo } from "@/types/anime";

const provider = "zoro"; // Use the appropriate provider

interface AnimePageProps {
  params: { id: string };
}

export default function AnimePage({ params }: AnimePageProps) {
  const id = params.id;

  const [anime, setAnime] = useState<AnimeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getAnimeDetails(id, provider)
        .then((data) => {
          setAnime(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch anime data");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!anime) {
    return <div>No anime data found</div>;
  }

  return (
    <div className="relative w-full h-96">
      {/* Banner Image */}
      <div className="absolute inset-0 h-[70%] w-full">
        <Image
          src={anime.cover}
          alt={
            anime.title.userPreferred ||
            anime.title.english ||
            anime.title.romaji
          }
          layout="fill"
          className="object-cover w-full h-full opacity-80"
        />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start p-8 space-y-4">
        <div className="flex items-center">
          <div className="w-32 h-48 relative mr-4">
            <Image
              src={anime.image}
              alt={
                anime.title.userPreferred ||
                anime.title.english ||
                anime.title.romaji
              }
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {anime.title.userPreferred ||
                anime.title.english ||
                anime.title.romaji}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
