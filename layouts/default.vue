<template>
  <v-app dark class="overflow-hidden">
    <v-app-bar absolute elevate-on-scroll>
      <server-title />
      <v-spacer />
      <login />
    </v-app-bar>
    <Nuxt class="justify-center align-center pt-16" />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Login from "../components/login.vue"
import ServerTitle from "../components/server/server-title.vue"

@Component({
  components: { ServerTitle, Login }
})
export default class DefaultLayout extends Vue {
  get authenticated () {
    return this.$auth.loggedIn
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
