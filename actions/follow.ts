"use server";

import { followUser, unfollowUser } from "@/services/follow";
import { revalidatePath } from "next/cache";

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);
    revalidatePath(`/u/${followedUser.following.username}`);
    return followedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function onUnfollow(id: string) {
  try {
    const unfollowedUser = await unfollowUser(id);
    revalidatePath(`//${unfollowedUser.following.username}`);
    return unfollowedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

