"use server";

import { db } from "@/lib/db";

export async function getWatchHistory({ userId }: { userId: string }) {
  const watchHistory = await db.watchHistory.findMany({
    where: {
      userId: userId,
    },
    orderBy: [
      {
        lastWatched: "desc",
      },
    ],
  });
  return watchHistory;
}

export async function createWatchHistory({
  userId,
  animeId,
  episodeId,
}: {
  userId: string;
  animeId: string;
  episodeId: string;
}) {
  const watchHistory = await db.watchHistory.create({
    data: {
      userId: userId,
      animeId: animeId,
      episodeId: episodeId,
    },
  });
  return watchHistory;
}