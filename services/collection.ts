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

export async function getCollections(userId: string) {
  const collections = await db.collection.findMany({
    where: {
      userId,
    },
  });
  return collections;
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
  return await db.collection.upsert({
    where: {
      userId_animeId: {
        userId,
        animeId,
      },
    },
    update: {
      status,
    },
    create: {
      userId,
      animeId,
      status,
    },
  });
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
