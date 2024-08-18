import { gql } from "@apollo/client";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";

export const GET_ANIMES_QUERY = gql`
  query GetAnimesByIds($id: [Int]) {
    Page {
      media(id_in: $id, type: ANIME) {
        ...media
      }
    }
  }

  ${MEDIA_FRAGMENT}
`;
