<template>
  <div>
    <v-card>
      <v-card-title>
        <translated target="whitelist.component.title" />
      </v-card-title>
      <div id="data-fetching" class="links">
        <v-spacer></v-spacer>
        <v-data-table
          dark
          :items="players"
          :headers="headers"
          :loading="isLoading"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              @click="removeFromWhitelist(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
        <div id="whitelist-action-buttons" class="p-4">
          <v-btn
            color="primary"
            dark
            v-on:click="getWhitelist"
            class="float-right"
          >
            Refresh List
          </v-btn>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"

          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                Add Player
              </v-btn>
            </template>
            <v-card dark height="100%">
              <v-card-title>
                <span class="headline">Add User</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  label="Username"
                  required
                  v-model="userToAdd"
                ></v-text-field>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="addToWhitelist"
                >
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-card>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {DataTableHeader} from "vuetify";
import {get, cloneDeep} from 'lodash'
import {Logger} from "~/utils/logger";
import {OfflinePlayer} from "~/store/whitelist";
import Translated from '~/components/translated.vue'


@Component(
  {components: {Translated}}
)
export default class Whitelist extends Vue {
  logger = new Logger('components/whitelist')
  isLoading = true;

  dialog = false;
  userToAdd: string = '';
  headers: DataTableHeader[] = [
    {
      text: 'name',
      value: 'name',
    },
    {
      text: 'Last Online',
      value: 'lastPlayed',
    },
    { text: 'Actions', value: 'actions', sortable: false },
  ];

  mounted() {
    this.$store.dispatch('whitelist/fetch')
      .then(() => (this.isLoading = false))
  }

  get players() {
    return cloneDeep(get(this.$store.state, 'whitelist.players', []))
  }

  // Methods will be component methods
  async addToWhitelist() {
    this.isLoading = true;
    const player: Partial<OfflinePlayer> = {
      name: this.userToAdd
    }
    await this.$store.dispatch('whitelist/update', {
      action: 'add',
      player
    })
    this.dialog = false;
    this.isLoading = false;
  }

  async removeFromWhitelist(player: OfflinePlayer) {
    this.isLoading = true;
    await this.$store.dispatch('whitelist/update', {action: 'remove', player })
    this.isLoading = false;
  }
}
</script>

<style scoped>

</style>
