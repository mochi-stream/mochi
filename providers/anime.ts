"use server";

import { config } from "dotenv";
config();

const CONSUMET_URL = process.env.CONSUMET_URL;

import axios from "axios";

import { AnilistSearchResult } from "@/types/anime";

export async function getTrendingAnime(): Promise<AnilistSearchResult> {
  try {
    const response = await axios.get<AnilistSearchResult>(
      `${CONSUMET_URL}/meta/anilist/trending?perPage=25`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getPopularAnime() {
  try {
    const response = await axios.get<AnilistSearchResult>(
      `${CONSUMET_URL}/meta/anilist/popular`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getUpcomingAnime() {
  try {
    const response = await axios.get<AnilistSearchResult>(
      `${CONSUMET_URL}/meta/anilist/trending`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

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
): Promise<AnilistSearchResult> {
  try {
    const response = await axios.get<AnilistSearchResult>(
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
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getAnimeDetails(id: string) {
  // return await anilistProvider.fetchAnimeInfo(id);
}
