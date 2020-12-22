<template>
  <div class="container">
    <div>
      <h1 class="title">
        Minecraft Graphql Interface
      </h1>
      <div class="links">
        <button v-on:click="getWorld">Get World</button>
        {{ world.allowAnimals }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { request, gql } from 'graphql-request'
import {merge} from 'lodash'

@Component
export default class Counter extends Vue {
  // Class properties will be component data
  count = 0
  world = { };

  // Methods will be component methods
  getWorld() {
    const query = gql`
      {
        world(name: "world") {
          name
          allowAnimals
        }
      }
    `
    request('http://localhost:8101/graphql', query).then((data) => merge(this.world, data))  
  }

  
}
</script>

<style lang="scss">
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>>
