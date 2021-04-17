import { gql } from "graphql-request"

export const fetchTPS = gql`
  query FetchTPS {
    getTPS
  }
`
