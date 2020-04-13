import gql from "graphql-tag"

export const CREATE_AUTHENTICATION_MUTATION = gql`
  mutation createAuthentication($didToken: String!) {
    createAuthentication(input: { didToken: $didToken }) {
      user {
        name
      }
      accessToken
    }
  }
`
