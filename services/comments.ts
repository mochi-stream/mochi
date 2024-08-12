"use server";

import { db } from "@/lib/db";

export async function getEpisodeComments({
  animeId,
  episodeId,
  limit = 10,
  page = 1,
}: {
  animeId: string;
  episodeId: string;
  limit?: number;
  page?: number;
}) {
  try {
    const comments = await db.comment.findMany({
      where: {
        animeId: animeId,
        episodeId: episodeId,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc", // Sort by the most recent comments
      },
      include: {
        user: {
          select: {
            username: true,
            imageUrl: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
        dislikes: {
          select: {
            id: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                username: true,
                imageUrl: true,
              },
            },
            likes: {
              select: {
                id: true,
              },
            },
            dislikes: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Transform comments to include counts for likes and dislikes
    const transformedComments = comments.map((comment) => ({
      ...comment,
      likesCount: comment.likes.length,
      dislikesCount: comment.dislikes.length,
      replies: comment.replies.map((reply) => ({
        ...reply,
        likesCount: reply.likes.length,
        dislikesCount: reply.dislikes.length,
      })),
    }));

    return transformedComments;
  } catch (error) {
    throw new Error("Could not load comment");
  }
}

export async function createComment({
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
    // Create the comment
    const comment = await db.comment.create({
      data: {
        animeId,
        episodeId,
        content,
        userId,
      },
    });

    // Manually format the comment with default counts
    const formattedComment = {
      ...comment,
      likesCount: 0,
      dislikesCount: 0,
      replies: [],
      user: {
        username: username || "unknown",
        imageUrl: imageUrl || "",
      },
    };

    return formattedComment;
  } catch (error) {
    console.log(error);
    throw new Error("Could not create comment");
  }
}
