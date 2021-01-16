<template>
  <v-app dark class="overflow-hidden">
    <v-app-bar
      absolute
      elevate-on-scroll
    >
      <v-toolbar-title>
        <div class="flex flex-column">
          <h1 class="purple--text">{{name}}</h1>
          <small class="sm:visible">{{motd}}</small>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <login></login>
    </v-app-bar>
    <Nuxt v-if="$auth.loggedIn" class="flex flex-wrap justify-center align-center pt-16 space-x-4 space-y-4" />
    <p v-else>You are not logged in! Please log in.</p>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Login from "~/components/login.vue"

@Component({
  components: {
    Login
  }
})
export default class DefaultLayout extends Vue {
  get name() {
    return this.$store.state.server.name
  }
  get motd() {
    return this.$store.state.server.motd
  }

  mounted() {
    if (this.$auth.loggedIn) {
      this.$store.dispatch('server/fetchHeaderInfo')
    }
  }

}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
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
