<template>
  <div :class="actionMenuClasses">
    <template v-for="action in actions" class="p-10">
      <v-btn
        class="mx-2"
        :color="action.color"
        v-on:click="action.callback()"
        :disabled="action.disabled"
        v-bind:key="action.target"
      >
        <translated :target="action.target"></translated>
        <v-icon v-if="action.icon">{{ action.icon }}</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"
import Translated from "~/components/translated.vue"

export interface IAction {
  color: string;
  icon: string;
  target: string;
  disabled?: boolean;
  callback: () => void;
}

@Component({
  components: { Translated }
})
export default class ActionMenu extends Vue {
  @Prop(String) direction!: "horizontal" | "vertical";
  @Prop(Array) actions!: IAction[];

  get actionMenuClasses () {
    return [
      "flex",
      "flex-wrap",
      { "flex-column": this.direction === "vertical" },
      "space-x-1",
      "p-4"
    ]
  }
}
</script>
