const {merge} = require('lodash')
const keycloakBaseUrl = `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect`
const keycloakConfig = {
  client_id: process.env.KEYCLOAK_CLIENT_ID,
  userinfo_endpoint: `${keycloakBaseUrl}/userinfo`,
  authorization_endpoint: `${keycloakBaseUrl}/auth`,
  access_token_endpoint: `${keycloakBaseUrl}/token`,
  redirect_uri: process.env.KEYCLOAK_REDIRECT
}

export const keycloak = merge({
  _scheme: 'oauth2',
  access_type: 'offline',
  token: {
    property: 'access_token',
    type: 'Bearer',
    maxAge: 1800
  },
  response_type: 'token id_token',
  token_type: 'Bearer',
  token_key: 'access_token',
  scope: ['openid', 'profile', 'email']
}, keycloakConfig)
