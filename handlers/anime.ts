"use server";

import { META } from "@consumet/extensions";

const metaProvider = new META.Anilist();

export async function getTrendingAnime() {
  return await metaProvider.fetchTrendingAnime();
}

export async function searchAnime(query: string) {
  return await metaProvider.advancedSearch(query);
}
