"use server";

import { META, ANIME } from "@consumet/extensions";

const anilistProvider = new META.Anilist();
const malProvider = new META.Myanimelist();

const animeProvider = new ANIME.Crunchyroll();

export async function getTrendingAnime() {
  return await anilistProvider.fetchTrendingAnime();
}

export async function getPopularAnime() {
  return await anilistProvider.fetchPopularAnime();
}

export async function searchAnime(
  query: string,
  page: number,
  format?: string
) {
  return await anilistProvider.advancedSearch(
    query,
    undefined,
    page,
    undefined,
    format === "" ? undefined : format
  );
}
