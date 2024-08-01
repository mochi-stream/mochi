"use server";

import { config } from "dotenv";
config();

const CONSUMET_URL =
  process.env.CONSUMET_URL || "https://consumet-api-dev.vercel.app";

import axios from "axios";

// import { AnilistSearchResult, AnimeInfo } from "@/types/anime";

export async function getSpotlight() {
  // return await animeProvider.fetchSpotlight();
}

// Popular This Season
// Upcoming
// Airing
// Genre Search
// Add MAL Auto Adder

export async function searchAnime(
  query: string,
  page: number,
  format?: string
): Promise<any> {
  try {
    const response = await axios.get<any>(
      `${CONSUMET_URL}/meta/anilist/advanced-search`,
      {
        params: {
          query: query || undefined,
          page: page || undefined,
          format: format || undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error searching anime");
  }
}

export async function getAnimeDetails(
  id: string,
  provider: string
): Promise<any> {
  try {
    const response = await axios.get<any>(
      `${CONSUMET_URL}/meta/anilist/info/${id}`,
      {
        params: { provider },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching anime details");
  }
}
