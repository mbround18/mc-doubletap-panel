import { get } from "lodash"
import {
  Action,
  Module,
  VuexModule,
  MutationAction
} from "vuex-module-decorators"
import { GraphQL } from "~/utils/graphql-client"
import { fetchTPS } from "~/store/tps/tps"
import { subscriptionAction } from "~/utils/subscription-action"

@Module({ stateFactory: true })
export default class TPSStore extends VuexModule {
  gqlClient = new GraphQL("server");
  ticksPerSecond: number[] = [];

  @MutationAction
  async fetchTPS () {
    const data = await this.gqlClient.request(fetchTPS)
    return { ticksPerSecond: get(data, "getTPS") }
  }

  @Action
  async subscribeFetchTPS () {
    return subscriptionAction(this.context, "tps/fetchTPS")
  }
}
