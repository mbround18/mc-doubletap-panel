import {
  Action,
  Module,
  VuexModule,
  MutationAction
} from "vuex-module-decorators"
import { GraphQL } from "~/utils/graphql-client"
import { subscriptionAction } from "~/utils/subscription-action"
import { get, pick, without } from "lodash"
import {
  addToAllowList,
  fetchAllowList,
  removeFromAllowList
} from "~/store/whitelist/whitelist"
import { IOfflinePlayer } from "~/store/player/interfaces/offline-player.interface"
import Vue from "vue"
import { utc } from "moment/moment"

const gqlClient = new GraphQL("server")
@Module({ stateFactory: true })
export default class AllowListStore extends VuexModule {
  players: IOfflinePlayer[] = [];

  @MutationAction
  async fetchPlayers () {
    const data = await gqlClient.request(fetchAllowList)
    let players: IOfflinePlayer[] = get(
      data,
      "whitelist.players",
      this.players
    )
    players = players.map((player: IOfflinePlayer) => {
      const lastPlayed = utc(player?.lastPlayed ?? 0).format(
        "YYYY-MM-DD HH:mm"
      )
      return { ...player, ...{ lastPlayed } }
    })
    return { players }
  }

  @MutationAction
  async addPlayer (player: Partial<IOfflinePlayer>) {
    const data = await gqlClient.request(addToAllowList, pick(player, "name"))
    if (data) {
      Vue.toasted.global.allowListAddPlayerSuccess(player)
      return { players: [player] }
    }

    return {}
  }

  @MutationAction
  async removePlayer (player: Partial<IOfflinePlayer>) {
    const data = await gqlClient.request(
      removeFromAllowList,
      pick(player, "name")
    )
    if (data) {
      Vue.toasted.global.allowListAddPlayerSuccess(player)
      const players = without(this.players, player)
      return { players }
    }

    return {}
  }

  @Action
  async subscribeFetchPlayers () {
    return subscriptionAction(this.context, "whitelist/fetchPlayers")
  }
}
