import { gql } from "graphql-request"

export const fetchWorlds = gql`
  query FetchWorlds {
    server {
      worlds {
        name
      }
    }
  }
`
