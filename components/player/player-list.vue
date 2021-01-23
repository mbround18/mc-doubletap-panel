<template>
  <div>
    <v-card>
      <v-card-title>
        <translated target="player-list.component.title" />
      </v-card-title>
      <v-card-text>
        <p><translated target="player-list.component.maxPlayers" :value="server"/></p>
        <p><translated target="player-list.component.currentPlayers" :value="count"/></p>
        <v-input v-model="search"></v-input>
        <v-data-table
          show-expand
          :items="players"
          :headers="headers"
          :loading="isLoading"
          item-key="name"
          :search="search"
          @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
          dense
        >
          <template v-slot:item.healthInfo="{ item }">
            <td>{{item.health}}/{{item.maxHealth}}</td>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <player v-bind="item"></player>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Logger} from "~/utils/logger";
import translatedCopy from "~/locale/translated-copy";
import Translated from '~/components/translated.vue'
import {DataTableHeader} from "vuetify";
import Player from "~/components/player/player.vue";
import {merge} from 'lodash'

@Component({
  components: {Player, Translated}
})
export default class PlayerList extends Vue {
  search = '';
  isLoading = true;
  logger = new Logger('components/player-list')

  get cardTitle() {
    return translatedCopy('player-list.component.title')
  }

  get headers(): DataTableHeader[] {
    const playerValues = [
      { value: 'name' },
      { value: 'address' },
      // { value: 'playTime'},
      // { value: 'isBanned' },
      { value: 'foodLevel' },
      { value: 'exhaustion' },
      { value: 'healthInfo' },
      { text: '', value: 'expanded-item' }
    ]
    return playerValues.map(
      ({text, value}: any) => ({
        text: text ?? translatedCopy(`player-list.component.onlinePlayers.${value}`),
        value
      })
    )
  }

  get server() {
    return this.$store.state.server;
  }

  get players() {
    return this.$store.state.server.onlinePlayers;
  }

  get count() {
    const {maxPlayers} = this.server
    return {
      maxPlayers,
      count: this.players.length
    }
  }

  mounted() {
    this.$store.dispatch('server/fetchServerInfo')
    this.$store.dispatch('server/subscribeFetchOnlinePlayers').then(()=> (this.isLoading = false));
  }

}
</script>

<style lang="css">

</style>
