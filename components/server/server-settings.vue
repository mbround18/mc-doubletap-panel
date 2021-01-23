<template>
  <div>
    <v-card>
      <v-card-title>Server Settings</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field :label="labels.serverIp" :value="`${serverInfo.ip}:${serverInfo.port}`" disabled outlined readonly />
              <v-text-field :label="labels.serverIp" :value="serverInfo.version" disabled outlined readonly />
            </v-col>
            <v-col>
              <div>
                <confirm-dialog
                  title="server-settings.component.confirm-dialog.whitelist.title"
                  message="server-settings.component.confirm-dialog.whitelist.message"
                  cancelable
                  ref="confirmWhitelist"
                />
                <v-switch
                  label="Whitelist"
                  :value="serverInfo.hasWhitelist"
                  v-on:click.native="toggleWhitelist"
                ><translated target="server-settings.component.action.whitelist"/></v-switch>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {get} from 'lodash'
import Component from "vue-class-component";
import translatedCopy from "~/locale/translated-copy";
import ConfirmDialog from "~/components/veutify-wrapped/confirm-dialog.vue";
import Translated from "~/components/translated.vue";
@Component({
  components: {Translated, ConfirmDialog}
})
export default class ServerSettings extends Vue {
  $refs!: {
    confirmWhitelist: ConfirmDialog
  }

  get labels() {
    return {
      serverIp: translatedCopy('server-settings.component.field.server-ip')
    }
  }

  get serverInfo() {
    return this.$store.state.server;
  }
  get hasWhitelist() {
    return this.$store.state.server.hasWhitelist;
  }

  async toggleWhitelist() {
    const status = !this.hasWhitelist
    const openDialog = get(this.$refs,'confirmWhitelist.open')
    const confirm = await openDialog()
    if (confirm) {
      await this.$store.dispatch('server/setWhitelistStatus', status);
      await this.$store.dispatch('server/fetchServerInfo');
    } else {
      await this.$store.commit('server/set', { hasWhitelist: !status })
    }
  }

  mounted() {
    this.$store.dispatch('server/fetchServerInfo');
  }

}

</script>
