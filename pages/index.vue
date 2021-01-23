<template>
  <div class="flex flex-wrap space-x-3 space-y-3" id="index-page">
    <server-settings class="lg:w-1/3"/>
    <player-list  />
    <whitelist  v-if="hasWhitelist" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Whitelist from "~/components/whitelist.vue";
import PlayerList from "~/components/player/player-list.vue"
import ServerSettings from "~/components/server/server-settings.vue";
@Component({
  components: {ServerSettings, PlayerList, Whitelist}
})
export default class Index extends Vue {
  drawer = true;

  get hasWhitelist() {
    return this.$store.state.server.hasWhitelist;
  }

  mounted() {
    this.$store.dispatch('server/fetchServerInfo')
  }
}
</script>

<style lang="scss">

</style>
