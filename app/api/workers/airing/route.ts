import apolloClient from "@/lib/apolloClient";
import { GET_NEXT_AIRING_EPISODE } from "@/graphql/queries/getNextAiringEpisode";
import { db } from "@/lib/db";

import { WorkerType } from "@prisma/client";

// Define the handler function
export async function GET(req: Request) {
  try {
    // Get the current time in seconds and the time for the next hour
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const nextHour = Math.floor((Date.now() + 60 * 60 * 1000) / 1000); // Time in seconds for the next hour

    // Fetch the data from the GraphQL API
    const { data } = await apolloClient.query({
      query: GET_NEXT_AIRING_EPISODE,
      variables: { currentTime },
    });

    // Filter episodes that will air in the next hour
    const episodesNextHour = data.Page.airingSchedules.filter(
      (episode: any) => {
        const airingTime = new Date(episode.airingAt * 1000); // Convert from timestamp to Date
        return (
          airingTime >= new Date() && airingTime <= new Date(nextHour * 1000)
        );
      }
    );

    if (episodesNextHour.length === 0) {
      // No episodes airing in the next hour
      return new Response(JSON.stringify({ success: true, message: "No new episodes airing in the next hour." }), {
        status: 200,
      });
    }

    // Get all relevant user subscriptions and their push subscriptions in one query
    const animeIds = episodesNextHour.map((episode: any) =>
      String(episode.media.id)
    );

    const userSubscriptions = await db.subscription.findMany({
      where: {
        animeId: { in: animeIds },
      },
    });

    const animeEpisodeMap = episodesNextHour.reduce(
      (map: any, episode: any) => {
        map[String(episode.media.id)] = episode;
        return map;
      },
      {} as Record<string, any>
    );

    // Get the latest airing schedule's unique ID to set as pointer
    const latestEpisodeId = episodesNextHour[episodesNextHour.length - 1].id;

    // Update or create the Worker record
    const existingWorker = await db.worker.findFirst({
      where: {
        type: WorkerType.EPI_NOTIFY,
        pointer: latestEpisodeId,
      },
    });

    if (existingWorker) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No new episodes to notify.",
        }),
        { status: 200 }
      );
    }

    // Send notifications to users based on their subscriptions using the /api/push/send endpoint
    const notifications = userSubscriptions.map(async (subscription) => {
      const episode = animeEpisodeMap[subscription.animeId];
      const payload = {
        userId: subscription.userId,
        title: `Upcoming Episode: ${episode.media.title.romaji}`,
        message: `Episode ${episode.episode} of ${episode.media.title.romaji} is airing soon!`,
      };

      // Construct the full URL for the /api/push/send route
      const baseUrl = `${req.headers.get("x-forwarded-proto") || "http"}://${
        req.headers.get("host") || "localhost:3000"
      }/api/push/send`;

      // Call the /api/push/send endpoint
      await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Create a notification in the database
      await db.notifications.create({
        data: {
          userId: subscription.userId,
          type: "EPISODE_AIR",
          title: episode.media.title.romaji,
          image: episode.media.coverImage.large,
          url: `/anime/${episode.media.id}`,
          message: `Episode ${episode.episode} of ${episode.media.title.romaji} is airing soon!`,
        },
      });
    });

    // Wait for all notifications to be sent
    await Promise.all(notifications);

    // Return the filtered episodes as JSON
    return new Response(
      JSON.stringify({
        success: true,
        animeIds,
        userSubscriptions,
        animeEpisodeMap,
        episodes: episodesNextHour,
      }),
      { status: 200 }
    );
  } catch (error) {
    // Handle errors and return an error response
    console.error("Error fetching airing episodes:", error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500 }
    );
  }
}
