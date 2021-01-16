<template>
  <div>
    <v-card>
      <v-card-title>
        <translated target="server.component.title" />
      </v-card-title>
      <v-card-text>
        <p><translated target="server.component.maxPlayers" :value="server"/></p>
        <v-data-table
          :items="players"
          :headers="headers"
          :loading="isLoading"
          dense
        >
          <template v-slot:item.healthInfo="{ item }">
            <v-item>{{item.health}}/{{item.maxHealth}}</v-item>
          </template>
<!--          <template v-slot:item.actions="{ item }">-->
<!--            <v-icon-->
<!--              small-->
<!--              @click="removeFromWhitelist(item)"-->
<!--            >-->z
<!--              mdi-delete-->
<!--            </v-icon>-->
<!--          </template>-->
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
@Component({
  components: {Translated}
})
export default class ServerComponent extends Vue {
  isLoading = true;
  logger = new Logger('components/server')
  get cardTitle() {
    return translatedCopy('server.component.title')
  }

  get headers() {
    const playerValues = [
      'name',
      'address',
      'playTime',
      'isBanned',
      'foodLevel',
      'exhaustion',
      'healthInfo'
    ]
    return playerValues.map((value: string): DataTableHeader => ({
      text: translatedCopy(`server.component.onlinePlayers.${value}`),
      value
    }))
  }

  get server() {
    return this.$store.state.server;
  }

  get players() {
    return this.$store.state.server.onlinePlayers;
  }

  mounted() {
    this.$store.dispatch('server/fetchServerInfo')
    this.$store.dispatch('server/fetchOnlinePlayers').then(()=> (this.isLoading = false));
  }

}
</script>

<style lang="css">

</style>
