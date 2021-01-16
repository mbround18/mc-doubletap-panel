import {gql} from 'graphql-request';

export const fetchServerHeaderInfo = gql`
  query ServerHeaderInfo {
    server {
      name
      motd
    }
  }
`;

export const fetchServerInfo = gql`
  query ServerInfo {
    server {
      ip
      port
      version
      maxPlayers
      worlds {
        name
      }
    }
  }
`;

export const fetchOnlinePlayers = gql`
  query OnlinePlayers {
    server {
      onlinePlayers {
        name
        address
        playTime
        isBanned
        foodLevel
        exhaustion
        health
        maxHealth
      }
    }
  }
`;
