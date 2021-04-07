import gql from "graphql-tag"

export const USER_QUERY = gql`
  query getUser($accessToken: String!) {
    user(accessToken: $accessToken) {
      email
      name
    }
  }
`
