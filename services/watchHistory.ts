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

export async function createOrUpdateWatchHistory({
  userId,
  animeId,
  episodeId,
}: {
  userId: string;
  animeId: string;
  episodeId: string;
}) {
  const watchHistory = await db.watchHistory.upsert({
    where: {
      userId_animeId_episodeId: {
        userId: userId,
        animeId: animeId,
        episodeId: episodeId,
      },
    },
    update: {
      lastWatched: new Date(), // Update the last watched time
    },
    create: {
      userId: userId,
      animeId: animeId,
      episodeId: episodeId,
    },
  });

  return watchHistory;
}
