import Vue from 'vue';
import {GraphQL} from '~/utils/graphql-client';
import {Action, Module, VuexModule} from 'vuex-module-decorators';
import {
  setPlayerGameMode,
  setPlayerHealth,
  setPlayerLevel,
  setPlayerFoodLevel,
  banPlayer,
  kickPlayer
} from '~/store/player/player';
import {IOnlinePlayer} from '~/store/server/interfaces/online-player.interface';

export type GameModeType = 'SURVIVAL' | 'CREATIVE' | 'ADVENTURE' | 'SPECTATOR';
export interface SetGameModeInterface {
  name: string;
  gamemode: GameModeType;
}
const gqlClient = new GraphQL('server');
@Module({stateFactory: true})
export default class ServerStore extends VuexModule {
  @Action
  async ban(payload: {name: string; reason: string}) {
    const data = await gqlClient.request(banPlayer, payload);
    if (data) {
      Vue.toasted.global.playerBanSuccess(payload);
    }
  }

  @Action
  async kick(payload: {name: string; reason: string}) {
    const data = await gqlClient.request(kickPlayer, payload);
    if (data) {
      Vue.toasted.global.playerKickSuccess(payload);
    }
  }

  @Action
  async setGameMode(payload: SetGameModeInterface) {
    const data = await gqlClient.request(setPlayerGameMode, payload);
    if (data) {
      Vue.toasted.global.playerChangeGameModeSuccess(payload);
    }
  }

  @Action
  async setHealth(payload: Partial<IOnlinePlayer>) {
    const data = await gqlClient.request(setPlayerHealth, payload);
    if (data) {
      Vue.toasted.global.playerChangeHealthSuccess(payload);
    }
  }

  @Action
  async setLevel(payload: Partial<IOnlinePlayer>) {
    const data = await gqlClient.request(setPlayerLevel, payload);
    if (data) {
      Vue.toasted.global.playerChangeHealthSuccess(payload);
    }
  }

  @Action
  async setFoodLevel(payload: Partial<IOnlinePlayer>) {
    const data = await gqlClient.request(setPlayerFoodLevel, payload);
    if (data) {
      Vue.toasted.global.playerChangeFoodLevelSuccess(payload);
    }
  }
}
