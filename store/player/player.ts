import {gql} from 'graphql-request';

export const banPlayer = gql`
  mutation BanPlayer($name: String!, $reason: String!) {
    player {
      ban(name: $name, reason: $reason) {
        name
      }
    }
  }
`;
export const kickPlayer = gql`
  mutation KickPlayer($name: String!, $reason: String!) {
    player {
      kick(name: $name, reason: $reason) {
        name
      }
    }
  }
`;

export const setPlayerGameMode = gql`
  mutation SetPlayerGameMode($name: String!, $gamemode: String!) {
    player {
      setGameMode(name: $name, gamemode: $gamemode) {
        name
        gamemode
      }
    }
  }
`;

export const setPlayerHealth = gql`
  mutation SetPlayerHealth($name: String!, $health: Int!) {
    player {
      setHealth(name: $name, health: $health) {
        name
        health
      }
    }
  }
`;

export const setPlayerLevel = gql`
  mutation SetPlayerLevel($name: String!, $level: Int!) {
    player {
      setLevel(name: $name, level: $level) {
        name
        level
      }
    }
  }
`;

export const setPlayerFoodLevel = gql`
  mutation SetPlayerLevel($name: String!, $foodLevel: Int!) {
    player {
      setFoodLevel(name: $name, foodLevel: $foodLevel) {
        name
        foodLevel
      }
    }
  }
`;
