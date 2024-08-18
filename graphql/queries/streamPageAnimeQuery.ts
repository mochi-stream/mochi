import { gql } from "@apollo/client";

export const STREAM_PAGE_ANIME_QUERY = gql`
  query StreamPageAnime($id: Int, $type: MediaType, $isAdult: Boolean) {
    Media(id: $id, type: $type, isAdult: $isAdult) {
      ...streamMedia
    }
  }
`;
