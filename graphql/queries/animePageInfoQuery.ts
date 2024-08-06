import { gql } from "@apollo/client";

export const ANIME_PAGE_INFO_QUERY = gql`
  query AnimeInfoPage($id: Int, $type: MediaType, $isAdult: Boolean) {
    Media(id: $id, type: $type, isAdult: $isAdult) {
      ...fullMedia
    }
  }
`;
