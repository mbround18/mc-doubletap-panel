<template>
  <div class="flex flex-column pt-3">
    <div>
      <confirm-dialog
        title="player.component.confirm-dialog.moderate.title"
        message="player.component.confirm-dialog.moderate.message"
        cancelable
        ref="confirmModerate"
      />
      <h3><translated target="player.component.action.moderate" /></h3>
      <action-menu direction="horizontal" v-bind:actions="moderateActions" />
    </div>
    <div>
      <h3><translated target="player.component.action.state" /></h3>
      <action-menu direction="horizontal" v-bind:actions="stateActions" />
    </div>
    <div>
      <h3><translated target="player.component.action.gamemode" /></h3>
      <action-menu direction="horizontal" v-bind:actions="gameModeActions" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import Translated from "~/components/translated.vue";
import ActionMenu from "~/components/veutify-wrapped/action-menu.vue";
import ConfirmDialog from "~/components/veutify-wrapped/confirm-dialog.vue";
@Component({
  components: {ConfirmDialog, ActionMenu, Translated}
})
export default class Player extends Vue {
  $refs!: {
    confirmModerate: ConfirmDialog
  }

  @Prop(String) name!: string;
  @Prop(String) gamemode!: string;

  moderateReason = "Removed by Operator."

  async moderateAction(action: 'kick'|'ban') {
    const {name, moderateReason: reason} = this;
    const confirm = await this.$refs.confirmModerate.open({action, name})
    if (confirm) {
      await this.$store.dispatch(`player/${action}`, {name,  reason})
    }
  }

  get moderateActions() {
    const {name} = this;
    return [
      {
        color: 'red',
        icon: 'mdi-kabaddi',
        target: 'player.component.action.moderate.kick',
        callback: () => this.moderateAction('kick')
      },
      {
        color: 'red',
        icon: 'mdi-gavel',
        target: 'player.component.action.moderate.ban',
        callback: () =>  this.moderateAction('ban')
      }
    ]
  }

  get stateActions() {
    const {name} = this;
    return [
      {
        color: "blue",
        icon: 'mdi-food-drumstick',
        target: 'player.component.action.state.feed',
        callback: () => this.setFoodLevel(20)
      },
      {
        color: 'pink',
        icon: 'mdi-heart',
        target: 'player.component.action.state.heal',
        callback: () => this.setHealth(20)
      },
      {
        color: 'red',
        icon: 'mdi-skull',
        target: 'player.component.action.state.kill',
        callback: () => this.setHealth(0)
      },
      {
        color: 'orange',
        icon: 'mdi-sword-cross',
        target: 'player.component.action.state.level',
        callback: () => this.setLevel(129)
      }
    ]
  }

  get gameModeActions() {
    const {name} = this;
    return ['SURVIVAL', 'CREATIVE', 'ADVENTURE', 'SPECTATOR'].map(gamemode => ({
      color: 'blue',
      target: `player.component.action.gamemode.${gamemode.toLowerCase()}`,
      disabled: this.gamemode === gamemode,
      callback: () =>
        this.$store.dispatch('player/setGameMode', { name, gamemode })
    }))
  }

  async setLevel(level: number) {
    const {name} = this;
    await this.$store.dispatch('player/setLevel', {name, level})
  }


  async setHealth(health: number) {
    const {name} = this;
    await this.$store.dispatch('player/setHealth', {name, health})
  }

  async setFoodLevel(foodLevel: number) {
    const {name} = this;
    await this.$store.dispatch('player/setFoodLevel', {name, foodLevel})
  }
}

</script>

