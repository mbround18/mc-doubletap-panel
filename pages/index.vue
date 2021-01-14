<template>
    <div>
      <whitelist v-if="loggedIn"></whitelist>
      <p v-else>You are not logged in! Please log in.</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Logger} from "~/utils/logger";

@Component
export default class Index extends Vue {
  logger = new Logger('pages/index')
  get loggedIn() {
    return this.$auth.loggedIn
  }
}
</script>
