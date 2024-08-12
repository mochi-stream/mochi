// actions/comments.ts

import { createComment as createCommentService } from "@/services/comments";
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
    const newComment = await createCommentService({
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