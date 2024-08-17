import apolloClient from "@/lib/apolloClient";
import { GET_NEXT_AIRING_EPISODE } from "@/graphql/queries/getNextAiringEpisode";

// Define the handler function
export async function GET() {
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

    // Return the filtered episodes as JSON
    return new Response(
      JSON.stringify({ success: true, episodes: episodesNextHour }),
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