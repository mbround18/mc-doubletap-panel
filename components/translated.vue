<template>
  <div v-html="translation" />
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"
import translatedCopy from "~/locale/translated-copy"

@Component
export default class TranslatedComponent extends Vue {
  @Prop(String) target!: string;
  @Prop(Object) value?: any;

  get translation () {
    return translatedCopy(this.target, this.value)
  }
}
</script>
