"use server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";

export async function getCollection(userId: string, animeId: string) {
  const collection = await db.collection.findUnique({
    where: {
      userId_animeId: {
        userId,
        animeId,
      },
    },
  });
  return collection;
}

export async function changeCollection({
  animeId,
  userId,
  status,
}: {
  animeId: string;
  userId: string;
  status: Status;
}) {
  const existingCollection = await getCollection(userId, animeId);

  if (existingCollection) {
    // Update the existing collection entry
    return await db.collection.update({
      where: {
        userId_animeId: {
          userId,
          animeId,
        },
      },
      data: {
        status,
      },
    });
  } else {
    // Create a new collection entry
    return await db.collection.create({
      data: {
        userId,
        animeId,
        status,
      },
    });
  }
}

export async function deleteCollection(userId: string, animeId: string) {
  return await db.collection.delete({
    where: {
      userId_animeId: {
        userId,
        animeId,
      },
    },
  });
}