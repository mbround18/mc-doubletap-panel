<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dense flat color="error">
        <v-toolbar-title class="font-weight-bold">
          <translated :target="title" :value="localVariables" />
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pt-3">
        <translated :target="message" :value="localVariables" />
        <v-text-field
          v-if="inputLabel"
          class="pt-4"
          outlined
          aria-required="true"
          :label="translatedInputLabel"
          :value="inputValue" />
      </v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn v-if="cancelable"
          class="body-2 font-weight-bold float-left"
          @click.native="cancel" text outlined color="red"
        >
          <translated :target="nOption" />
        </v-btn>
        <v-btn
          color="primary"
          class="body-2 font-weight-bold float-right"
          filled @click.native="agree"
        ><translated :target="yOption" /></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Translated from "~/components/translated.vue"
import { Prop } from "vue-property-decorator"
import { merge, set, get } from "lodash"
import translatedCopy from "~/locale/translated-copy"

export interface IOpenOptions {
  width: number
  zIndex: number
}

@Component({
  components: { Translated }
})
export default class ConfirmDialog extends Vue {
  @Prop(String) title!: string;
  @Prop(String) message!: string;
  @Prop({ type: String, default: "accept" }) type!: string
  @Prop(Object) variables!: object;
  @Prop(Boolean) cancelable!: boolean;
  @Prop(String) inputLabel!: string;
  @Prop(String) inputValue!: string;

  localVariables = {}

  dialog = false;
  resolve = (resolve?: any) => resolve;
  reject = (reject?: any) => reject;

  options = {
    width: 400,
    zIndex: 200
  };

  get translatedInputLabel () {
    return translatedCopy(this.inputLabel, this.variables)
  }

  get yOption () {
    return `confirmation-dialogue.action.${this.type}`
  }

  get nOption () {
    const noTypes = {
      accept: "confirmation-dialogue.action.cancel",
      agree: "confirmation-dialogue.action.disagree",
      yes: "confirmation-dialogue.action.no"
    }
    return get(noTypes, this.type)
  }

  open (variables?: object, options?: IOpenOptions) {
    this.dialog = true
    if (options) {
      set(this, "options", merge(this.options, options))
    }
    if (variables) {
      set(this, "localVariables", merge(this.variables, this.localVariables, variables))
    }
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  agree () {
    this.resolve(true)
    this.dialog = false
  }

  cancel () {
    this.resolve(false)
    this.dialog = false
  }
}
</script>
