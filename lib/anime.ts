"use server";

import { config } from "dotenv";
config();

const CONSUMET_URL = process.env.CONSUMET_URL;

import axios from "axios";

import {
  AnilistSearchResult,
  AnimeInfo,
  StreamAnimeInfo,
  Video,
} from "@/types/anime";

export async function getTrendingAnime(): Promise<AnilistSearchResult> {
  try {
    const response = await axios.get<AnilistSearchResult>(
      `${CONSUMET_URL}/meta/anilist/trending?perPage=25`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching trending anime");
  }
}

export async function getPopularAnime() {
  try {
    const response = await axios.get<AnilistSearchResult>(
      `${CONSUMET_URL}/meta/anilist/popular`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching popular anime");
  }
}

export async function getUpcomingAnime() {
  try {
    const response = await axios.get<AnilistSearchResult>(
      `${CONSUMET_URL}/meta/anilist/trending`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching upcoming anime");
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
    throw new Error("Error searching anime");
  }
}

export async function getAnimeDetails(
  id: string,
  provider: string
): Promise<AnimeInfo> {
  try {
    const response = await axios.get<AnimeInfo>(
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

export async function getStreamAnimeDetails(
  id: string
): Promise<StreamAnimeInfo> {
  try {
    const response = await axios.get<StreamAnimeInfo>(
      `${CONSUMET_URL}/anime/zoro/info?id=${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching anime details");
  }
}

export async function getAnimeEpisodes(
  animeId: string,
  watchId: string
): Promise<Video> {
  try {
    const episodeId = `${animeId}$episode$${watchId}$sub`;
    const response = await axios.get<Video>(
      `${CONSUMET_URL}/anime/zoro/watch`,
      {
        params: {
          episodeId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching anime episodes");
  }
}
