// actions/comments.ts

import { createComment, deleteComment } from "@/services/comments";
import { toast } from "sonner";

export async function onCreateComment({
  animeId,
  episodeId,
  content,
  userId,
  username,
  imageUrl,
}: {
  animeId: string;
  episodeId: string;
  content: string;
  userId: string;
  username: string;
  imageUrl: string;
}) {
  try {
    // Validate input
    if (!content.trim()) {
      toast.error("Comment content cannot be empty.");
      return;
    }

    // Call the createComment service
    const newComment = await createComment({
      animeId,
      episodeId,
      content,
      userId,
      username,
      imageUrl,
    });

    // Return the new comment if needed
    return newComment;
  } catch (error) {
    toast.error("Failed to post comment. Please try again later.");
    throw error; // Re-throw the error to be handled by the caller if needed
  }
}

export async function onDeleteComment({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) {
  try {
    // Call the deleteComment service
    await deleteComment(commentId, userId);
  } catch (error) {
    toast.error("Failed to delete comment. Please try again later.");
    throw error; // Re-throw the error to be handled by the caller if needed
  }
}
