import { gql } from "@apollo/client";

export const STAFF_FRAGMENT = gql`
  fragment staff on StaffEdge {
    id
    role
    node {
      id
      name {
        userPreferred
      }
      language: languageV2
      image {
        large
      }
    }
  }
`;
