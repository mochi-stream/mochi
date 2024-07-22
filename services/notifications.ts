"use server";

import { db } from "@/lib/db";

export async function getNotifications({ userId }: { userId: string }) {
  const notifications = await db.notifications.findMany({
    where: {
      userId: userId,
      seen: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return notifications;
}

export async function markAllAsRead({ userId }: { userId: string }) {
  await db.notifications.updateMany({
    where: {
      userId: userId,
    },
    data: {
      seen: true,
    },
  });
}
