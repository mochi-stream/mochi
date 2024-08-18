"use server";

import { db } from "@/lib/db";

export async function getSubscriptions({ userId }: { userId: string }) {
  const subscriptions = await db.subscription.findMany({
    where: {
      userId: userId,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
  return subscriptions;
}

export async function getSubscription({
  userId,
  animeId,
}: {
  userId: string;
  animeId: string;
}) {
  const subscription = await db.subscription.findUnique({
    where: {
      userId_animeId: {
        userId: userId,
        animeId: animeId,
      },
    },
  });
  return subscription;
}

export async function createSubscription({
  userId,
  animeId,
}: {
  userId: string;
  animeId: string;
}) {
  const subscription = await db.subscription.create({
    data: {
      userId: userId,
      animeId: animeId,
    },
  });
  return subscription;
}

export async function deleteSubscription({
  userId,
  animeId,
}: {
  userId: string;
  animeId: string;
}) {
  await db.subscription.delete({
    where: {
      userId_animeId: {
        userId: userId,
        animeId: animeId,
      },
    },
  });
}