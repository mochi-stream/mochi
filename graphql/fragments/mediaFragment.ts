import { gql } from "@apollo/client";

export const MEDIA_FRAGMENT = gql`
  fragment media on Media {
    id
    idMal
    title {
      userPreferred
    }
    coverImage {
      extraLarge
    }
    season
    averageScore
    seasonYear
    description
    type
    format
    genres
    isAdult
  }
`;
