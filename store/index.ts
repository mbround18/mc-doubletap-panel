import {set} from 'lodash';
export interface IndexState {
  featureFlags: Record<string, boolean>;
}

export const state = (): IndexState => ({
  featureFlags: {}
});

export const mutations = {
  setFeatureFlags(state: IndexState, payload: Record<string, boolean>) {
    set(state, 'featureFlags', payload);
  }
};

export const actions = {
  async fetchFeatureFlags({commit}: any) {
    const url = `${process.env.ENDPOINT_URL}/feature-flags`;
    const data = await fetch(url);
    console.log(data);
    commit('setFeatureFlags', data.body);
  }
};
