import { gql } from "@apollo/client";

export const CHARACTER_FRAGMENT = gql`
  fragment character on CharacterConnection {
    edges {
      id
      role
      name
      voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
        id
        name {
          userPreferred
        }
        language: languageV2
        image {
          large
        }
      }
      node {
        id
        name {
          userPreferred
        }
        image {
          large
        }
      }
    }
  }
`;
