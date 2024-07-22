"use server";

import { db } from "@/lib/db";

import { ProfileUser } from "@/types/user";
import { User } from "@prisma/client";


export async function getUserByUsername(
  username: string
): Promise<ProfileUser | null> {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
    include: {
      following: true,
      followedBy: true,
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
