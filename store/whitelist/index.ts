import {set, get, merge, pick, without} from 'lodash';
import {GraphQL} from '~/utils/graphql-client';
import {
  addToAllowList,
  fetchAllowList,
  removeFromAllowList
} from '~/graphql/whitelist';
import {utc} from 'moment/moment';
import translatedCopy from '~/locale/translated-copy';
import Vue from 'vue';

export interface OfflinePlayer {
  [k: string]: any;
  name: string;
  isWhitelisted: boolean;
  lastPlayed: any;
}
const graphQL = new GraphQL('server');
export interface AllowListState {
  players: OfflinePlayer[];
}

export const state = (): AllowListState => ({
  players: []
});

export const mutations = {
  setPlayers(state: AllowListState, payload: OfflinePlayer[]) {
    state.players = payload;
    return state;
  },
  addPlayer(state: AllowListState, payload: OfflinePlayer) {
    state.players.push(payload);
    return state;
  },
  removePlayer(state: AllowListState, payload: OfflinePlayer) {
    const players = without(state.players, payload);
    set(state, 'players', players);
    return state;
  }
};

export const actions = {
  async fetch({commit}: any) {
    try {
      graphQL.subscribe({
        interval: 30000,
        query: fetchAllowList,
        callback: (data) => {
          const playerList: OfflinePlayer[] = get(
            data,
            'whitelist.players',
            []
          );
          const playerListModified = playerList.map((player) => {
            const lastPlayed = utc(player?.lastPlayed ?? 0).format(
              'YYYY-MM-DD HH:mm'
            );
            return merge(player, {lastPlayed});
          });
          commit('setPlayers', playerListModified);
        }
      });
    } catch (error) {
      Vue.toasted.error(error.message);
    }
  },
  async update(
    {commit}: any,
    {action, player}: {action: 'add' | 'remove'; player: Partial<OfflinePlayer>}
  ) {
    const query = action === 'add' ? addToAllowList : removeFromAllowList;
    if (!player) {
      return Vue.toasted.error(
        translatedCopy(`whitelist.toast.${action}.failure`)
      );
    }

    try {
      const data = await graphQL.request(query, pick(player, 'name'));
      Vue.toasted.success(
        translatedCopy(`whitelist.toast.${action}.success`, player)
      );
      return commit(`${action}Player`, player);
    } catch (error) {
      Vue.toasted.error(error.message);
    }
  }
};
