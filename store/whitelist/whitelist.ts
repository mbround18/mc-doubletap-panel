import { gql } from "graphql-request"

export const setAllowListStatus = gql`
  mutation SetAllowListStatus($status: Boolean!) {
    whitelist {
      status(status: $status) {
        hasWhitelist
      }
    }
  }
`

export const fetchAllowList = gql`
  query FetchAllowList {
    whitelist {
      players {
        name
        lastPlayed
      }
    }
  }
`

export const addToAllowList = gql`
  mutation AddToWhitelist($name: String!) {
    whitelist {
      add(name: $name) {
        name
        lastPlayed
      }
    }
  }
`

export const removeFromAllowList = gql`
  mutation RemoveToWhitelist($name: String!) {
    whitelist {
      remove(name: $name) {
        name
        lastPlayed
      }
    }
  }
`
