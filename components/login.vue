<template>
  <div id="auth-content">
    <div v-if="isLoggedIn" class="flex justify-center text-center align-center">
      <v-banner class="hidden md:block">Welcome, you are logged in!</v-banner>
      <v-btn @click.native="logout">
        <translated target="login.component.action.logout" />
      </v-btn>
    </div>
    <div v-else class="flex justify-center text-center align-center">
      <v-btn @click.native="login">
        <translated target="login.component.action.login" />
      </v-btn>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from "vue-class-component";
import Translated from "~/components/translated";
@Component({
  components: {Translated}
})
export default class Login extends Vue {
  get isLoggedIn() {
    return this.$auth.loggedIn;
  }
  login() {
    console.log('Initializing Log In')
    this.$auth.loginWith('discord')
  }
  logout() {
    this.$auth.logout()
    location.reload();
  }
}
</script>

<style scoped>

</style>
