import {get, merge, isEqual, pick, remove as removeItems} from 'lodash';
import {GraphQL} from '~/utils/graphql-client';
import Vue from 'vue';
import {
  addToAllowList,
  fetchAllowList,
  removeFromAllowList
} from '~/graphql/whitelist';

export interface Player {
  [k: string]: any;
  name: string;
  isWhitelisted: boolean;
}

export interface AllowListState {
  players: Player[];
}

export const state = () => ({
  players: []
});

export const mutations = {
  set(state: AllowListState, payload: Player[]) {
    state.players = payload;
  },
  add(state: AllowListState, payload: Player) {
    state.players.push(payload);
  },
  remove(state: AllowListState, {name: username}: Player) {
    const players = removeItems(state.players, (player: Player) =>
      isEqual(player.name.toLowerCase(), username.toLowerCase())
    );
    merge(state, {players});
  }
};

export const actions = {
  async fetch({commit}: any) {
    try {
      const client = GraphQL.client();
      const data = await client.request(fetchAllowList);
      console.log(data);
      commit('set', get(data, 'whitelist.players', []));
    } catch (error) {
      Vue.toasted.error(error.message);
    }
  },
  async update(
    {commit}: any,
    {action, player}: {action: 'add' | 'remove'; player: Partial<Player>}
  ) {
    const query = action === 'add' ? addToAllowList : removeFromAllowList;
    if (!player) {
      return Vue.toasted.error('User supplied is undefined!');
    }

    try {
      const client = GraphQL.client();
      await client.request(query, pick(player, 'name'));
      commit(action, player);
      Vue.toasted.success(
        `Successfully ${action === 'add' ? 'added' : 'removed'} ${
          player.name
        } to whitelist!`
      );
    } catch (error: any) {
      console.error(error.message);
      Vue.toasted.error(error.name);
    }
  }
};
