import { gql } from "@apollo/client";

export const AUTOCOMPLETE_SEARCH_QUERY = gql`
  query AutocompleteSearch(
    $search: String
    $isAdult: Boolean = false
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: 1, perPage: 3) {
      media(search: $search, isAdult: $isAdult, sort: $sort, type: ANIME) {
        id
        title {
          userPreferred
        }
        coverImage {
          extraLarge
        }
        description
      }
    }
  }
`;
