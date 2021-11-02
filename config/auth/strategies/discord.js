/* eslint-disable camelcase */
const { merge } = require("lodash")
const baseUrl = "https://discord.com/api/oauth2"

const credentials = {
  client_id: process.env.DISCORD_CLIENT_ID,
  client_secret: process.env.DISCORD_CLIENT_SECRET,
  code_verifier: process.env.DISCORD_CODE_VERIFIER
}

const config = {
  userinfo_endpoint: false,
  authorization_endpoint: `${baseUrl}/authorize`,
  access_token_endpoint: `${baseUrl}/token`,
  redirect_uri: `${process.env.DOMAIN_NAME}/auth/invoke`
}

export const discord = merge(
  {
    _scheme: "oauth2",
    grant_type: "authorization_code",
    scope: ["identify", "email", "guilds"]
  },
  config,
  credentials
)
