"use server";

import { db } from "@/lib/db";

import { User } from "@prisma/client";

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: { id },
  });
  return user;
}
