<template>
  <div>
    <server></server>
    <whitelist></whitelist>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Whitelist from "~/components/whitelist.vue";
import Server from "~/components/server.vue"
@Component({
  components: {Server, Whitelist}
})
export default class Index extends Vue {}
</script>
