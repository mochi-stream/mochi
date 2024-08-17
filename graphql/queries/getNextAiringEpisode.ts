import { gql } from "@apollo/client";

export const GET_NEXT_AIRING_EPISODE = gql`
  query GetNextAiringEpisode($currentTime: Int!) {
    Page {
      airingSchedules(notYetAired: true, airingAt_greater: $currentTime) {
        id
        episode
        airingAt
        media {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
        }
      }
    }
  }
`;
