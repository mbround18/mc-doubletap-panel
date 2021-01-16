import {gql} from 'graphql-request';

export const fetchAllowList = gql`
  query FetchAllowList {
    whitelist {
      players {
        name
        lastPlayed
      }
    }
  }
`;

export const addToAllowList = gql`
  mutation AddToWhitelist($name: String!) {
    whitelist {
      add(name: $name) {
        name
        isWhitelisted
        lastPlayed
      }
    }
  }
`;

export const removeFromAllowList = gql`
  mutation RemoveToWhitelist($name: String!) {
    whitelist {
      remove(name: $name) {
        name
        isWhitelisted
        lastPlayed
      }
    }
  }
`;
