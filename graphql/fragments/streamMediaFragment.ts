import { gql } from "@apollo/client";
import { MEDIA_FRAGMENT } from "./mediaFragment";

export const STREAM_MEDIA_FRAGMENT = gql`
  fragment streamMedia on Media {
    id
    title {
      userPreferred
      romaji
      english
      native
    }
    coverImage {
      extraLarge
    }
    bannerImage
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    description
    season
    seasonYear
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    synonyms
    source(version: 3)
    isAdult
    averageScore
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    relations {
      nodes {
        ...media
      }
    }
    studios {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
    recommendations(perPage: 6, sort: [RATING_DESC, ID]) {
      nodes {
        mediaRecommendation {
          ...media
        }
      }
    }
    streamingEpisodes {
      site
      title
      thumbnail
      url
    }
    trailer {
      id
      site
    }
  }
  ${MEDIA_FRAGMENT}
`;
