/* eslint-disable  @typescript-eslint/no-extraneous-class */
import Vue from 'vue';
import {GraphQLClient} from 'graphql-request';

export class GraphQL {
  public static client(): GraphQLClient {
    const authorization = localStorage.getItem('auth._token.discord');
    if (!authorization)
      throw new Error('Authorization not found! Please log in!');
    return new GraphQLClient(process.env.ENDPOINT_URL ?? '', {
      mode: 'no-cors',
      headers: {
        authorization,
        'Access-Control-Request-Headers': '*'
      }
    });
  }
}
