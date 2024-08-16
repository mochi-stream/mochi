import { gql } from "@apollo/client";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";

export const GET_ANIMES_QUERY = gql`
  query GetAnimesByIds($idsMal: [Int!]) {
    Media(filter: { idMal_in: $idsMal }) {
      ...media
    }
  }
  ${MEDIA_FRAGMENT}
`;
