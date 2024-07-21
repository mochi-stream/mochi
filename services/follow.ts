// TODO: Fix type errors
"use server";

import { db } from "@/lib/db";
import { getSelf } from "@/services/auth";

export async function getFollowedUsers(id: string) {
  try {
    const followedUsers = db.follow.findMany({
      where: {
        followerId: id,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return followedUsers;
  } catch {
    return [];
  }
}

export async function isFollowingUser(id: string) {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: { id },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }
    if (otherUser.id === self?.id) {
      return true;
    }
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self?.id,
        followingId: otherUser.id,
      },
    });
    return !!existingFollow;
  } catch {
    return false;
  }
}

export async function followUser(id: string) {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error("User you want to follow cannot be found");
  }
  if (otherUser.id === self?.id) {
    throw new Error("You cannot follow yourself");
  }
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self?.id,
      followingId: otherUser.id,
    },
  });
  if (existingFollow) {
    throw new Error("You are already following this user");
  }
  const follow = await db.follow.create({
    data: {
      followerId: self?.id || "",
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return follow;
}

export async function unfollowUser(id: string) {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User you want to unfollow cannot be found");
  }
  if (otherUser.id === self?.id) {
    throw new Error("You cannot unfollow yourself");
  }
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self?.id,
      followingId: otherUser.id,
    },
  });
  if (!existingFollow) {
    throw new Error("You cannot unfollow this user");
  }
  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });
  return follow;
}

export async function getFollowersCount(id: string) {
  const count = await db.follow.count({
    where: {
      followingId: id,
    },
  });
  return count;
}

export async function getFollowingsCount(id: string) {
  const count = await db.follow.count({
    where: {
      followerId: id,
    },
  });
  return count;
}