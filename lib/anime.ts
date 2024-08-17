"use server";

const CONSUMET_URL = process.env.NEXT_PUBLIC_CONSUMET_URL;

import { Episode, VideoDetails } from "@/types/anime";

import axios from "axios";

export async function getAnimeDetails(id: string): Promise<Episode[]> {
  try {
    const response = await axios.get<any>(
      `${CONSUMET_URL}/meta/anilist/info/${id}?provider=zoro`
    );
    return response.data.episodes;
  } catch (error) {
    throw new Error("Error fetching anime details");
  }
}

export async function getStreamingLinks(id: string): Promise<VideoDetails> {
  try {
    const response = await axios.get<VideoDetails>(
      `${CONSUMET_URL}/anime/zoro/watch?episodeId=${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching streaming links");
  }
}
