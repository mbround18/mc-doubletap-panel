import { gql } from "graphql-request"

export const fetchServerHeaderInfo = gql`
  query ServerHeaderInfo {
    server {
      name
      motd
    }
  }
`

export const fetchServerInfo = gql`
  query ServerInfo {
    server {
      ip
      port
      version
      hasWhitelist
    }
  }
`

export const fetchOnlinePlayers = gql`
  query OnlinePlayers {
    server {
      maxPlayers
      onlinePlayers {
        name
        address
        playTime
        foodLevel
        exhaustion
        health
        maxHealth
        gamemode
        isBanned
        isWhitelisted
      }
    }
  }
`
