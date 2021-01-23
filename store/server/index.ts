import {GraphQL} from '~/utils/graphql-client';
import {
  Action,
  Module,
  Mutation,
  VuexModule,
  MutationAction
} from 'vuex-module-decorators';
import {
  fetchOnlinePlayers,
  fetchServerHeaderInfo,
  fetchServerInfo
} from '~/store/server/server';
import {round} from 'lodash';
import {IOnlinePlayer} from '~/store/server/interfaces/online-player.interface';
import {setAllowListStatus} from '~/store/whitelist/whitelist';
import Vue from 'vue';
import {subscriptionAction} from '~/utils/subscription-action';

const gqlClient = new GraphQL('server');
@Module({stateFactory: true})
export default class ServerStore extends VuexModule {
  name = 'Minecraft GraphQL Interface';
  motd = 'The window into the soul of your server';
  ip = '';
  port = 0;
  version = 0;
  maxPlayers = 0;
  onlinePlayers = [];
  hasWhitelist = false;
  worlds = [];

  @MutationAction
  async fetchHeaderInfo() {
    const {server} = await gqlClient.request(fetchServerHeaderInfo);
    return server ?? {};
  }

  @MutationAction
  async fetchServerInfo() {
    const {server} = await gqlClient.request(fetchServerInfo);
    return server ?? {};
  }

  @MutationAction
  async fetchOnlinePlayers() {
    const {
      server: {onlinePlayers, maxPlayers}
    }: {
      server: {onlinePlayers: IOnlinePlayer[]; maxPlayers: number};
    } = await gqlClient.request(fetchOnlinePlayers);
    if (onlinePlayers) {
      const updatedPlayers = onlinePlayers.map((player) => {
        player.health = round(player.health);
        player.exhaustion = round(player.exhaustion, 2);
        return player;
      });
      return {onlinePlayers: updatedPlayers, maxPlayers};
    }

    return {};
  }

  @MutationAction
  async setWhitelistStatus(status: boolean) {
    const {server} = await gqlClient.request(setAllowListStatus, {status});
    if (server) {
      if (status) {
        Vue.toasted.global.allowListToggleOn();
      } else {
        Vue.toasted.global.allowListToggleOff();
      }

      return {hasWhitelist: status};
    }

    return {};
  }

  @Action
  async subscribeFetchOnlinePlayers() {
    return subscriptionAction(this.context, 'server/fetchOnlinePlayers');
  }
}
