<template>
  <div id="auth-content">
    <div v-if="isLoggedIn" class="flex justify-center text-center align-center">
      <v-banner>Welcome, you are logged in!</v-banner>
      <v-btn v-on:click="logout">Logout</v-btn>
    </div>
    <div v-else class="flex justify-center text-center align-center">
      <v-banner>Hello</v-banner>
      <v-btn v-on:click="login">Login</v-btn>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from "vue-class-component";
import {get} from 'lodash';

@Component
export default class Login extends Vue {
  get isLoggedIn() {
    return this.$auth.loggedIn;
  }
  async login() {
    await this.$auth.loginWith('discord')
  }
  async logout() {
    await this.$auth.logout()
    location.reload();
  }
}
</script>

<style scoped>

</style>
