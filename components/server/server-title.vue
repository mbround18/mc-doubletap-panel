<template>
  <div class="flex flex-column">
    <h1 class="purple--text font-bold">{{serverName}}</h1>
    <small class="italic" >{{serverMessageOfTheDay}}</small>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import translatedCopy from "~/locale/translated-copy";

@Component
export default class ServerTitle extends Vue {
  get serverName() {
    return this.$store.state.server.name ?? translatedCopy('default.title')
  }
  get serverMessageOfTheDay() {
    return this.$store.state.server.motd ?? translatedCopy('default.shameless-plug')
  }

  mounted() {
    this.$store.dispatch('server/fetchHeaderInfo')
  }
}
</script>
