import {round, get, set} from 'lodash';
import {GraphQL} from '~/utils/graphql-client';
import {
  fetchOnlinePlayers,
  fetchServerHeaderInfo,
  fetchServerInfo
} from '~/graphql/server';
import Vue from 'vue';
import {Server} from '~/store/server/interfaces/server.interface';
import {OnlinePlayer} from '~/store/server/interfaces/online-player.interface';

const graphQL = new GraphQL('server');
export const state: () => Server = () => ({
  name: 'Minecraft GraphQL Interface',
  motd: 'The window into the soul of your server',

  ip: '',
  port: 0,
  version: 0,
  maxPlayers: 0,
  onlinePlayers: [],

  worlds: []
});

export const mutations = {
  set(state: Server, payload: Partial<Server>) {
    Object.keys(payload).forEach((key) => set(state, key, get(payload, key)));
  }
};

export const actions = {
  async fetchHeaderInfo({commit}: any) {
    try {
      const data: Server = await graphQL.request(fetchServerHeaderInfo);
      commit('set', get(data, 'server'));
    } catch (error) {
      Vue.toasted.error(error.message);
    }
  },
  async fetchServerInfo({commit}: any) {
    try {
      const data: Server = await graphQL.request(fetchServerInfo);
      commit('set', get(data, 'server'));
    } catch (error) {
      Vue.toasted.error(error.message);
    }
  },
  async fetchOnlinePlayers({commit}: any) {
    try {
      graphQL.subscribe({
        query: fetchOnlinePlayers,
        callback: ({
          server: {onlinePlayers}
        }: {
          server: {onlinePlayers: OnlinePlayer[]};
        }) => {
          const updatedPlayers = onlinePlayers.map((player) => {
            player.health = round(player.health);
            player.exhaustion = round(player.exhaustion, 2);
            return player;
          });
          commit('set', {onlinePlayers: updatedPlayers});
        },
        interval: 5000
      });
    } catch (error) {
      Vue.toasted.error(error.message);
    }
  }
};
