import { gql } from "@apollo/client";
import { MEDIA_FRAGMENT } from "./mediaFragment";
import { CHARACTER_FRAGMENT } from "./characterFragment";
import { STAFF_FRAGMENT } from "./staffFragment";

export const FULL_MEDIA_FRAGMENT = gql`
  fragment fullMedia on Media {
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
    isLocked
    meanScore
    averageScore
    popularity
    favourites
    isFavouriteBlocked
    hashtag
    countryOfOrigin
    isLicensed
    isFavourite
    isRecommendationBlocked
    isFavouriteBlocked
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
    characterPreview: characters(sort: [ROLE, RELEVANCE, ID]) {
      ...character
    }
    staffPreview: staff(perPage: 20, sort: [RELEVANCE, ID]) {
      edges {
        ...staff
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
    rankings {
      id
      rank
      type
      format
      year
      season
      allTime
      context
    }
    tags {
      id
      name
      description
      rank
      isMediaSpoiler
      isGeneralSpoiler
      userId
    }
    mediaListEntry {
      id
      status
      score
    }
    stats {
      statusDistribution {
        status
        amount
      }
      scoreDistribution {
        score
        amount
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${CHARACTER_FRAGMENT}
  ${STAFF_FRAGMENT}
`;
