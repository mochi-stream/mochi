"use server";

import { followUser, unfollowUser } from "@/services/follow";
import { revalidatePath } from "next/cache";

/**
 * Handles a follow request from the user.
 *
 * @param id - The ID of the user to follow.
 * @returns The newly followed user.
 */
export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);
    // Revalidate the user's profile page
    revalidatePath(`/u/${followedUser.following.username}`);
    return followedUser;
  } catch (error) {
    if (error instanceof Error) {
      // Rethrow the error with a clean message
      throw new Error(error.message);
    } else {
      // Rethrow the error with a generic error message
      throw new Error("An unknown error occurred");
    }
  }
}

/**
 * Handles an unfollow request from the user.
 *
 * @param id - The ID of the user to unfollow.
 * @returns The newly unfollowed user.
 */
export async function onUnfollow(id: string) {
  try {
    const unfollowedUser = await unfollowUser(id);
    // Revalidate the user's profile page
    revalidatePath(`//${unfollowedUser.following.username}`);
    return unfollowedUser;
  } catch (error) {
    if (error instanceof Error) {
      // Rethrow the error with a clean message
      throw new Error(error.message);
    } else {
      // Rethrow the error with a generic error message
      throw new Error("An unknown error occurred");
    }
  }
}

