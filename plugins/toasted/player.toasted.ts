import { IToasted } from "~/plugins/toasted/toasted.interface"

export const player: IToasted = {
  banSuccess: {
    target: "player.toast.ban.success",
    type: "success"
  },
  kickSuccess: {
    target: "player.toast.kick.success",
    type: "success"
  },
  changeGameModeSuccess: {
    target: "player.toast.gamemode.success",
    type: "success"
  },
  changeGameModeFailure: {
    target: "player.toast.gamemode.failure",
    type: "error"
  },
  changeKickSuccess: {
    target: "player.toast.food.success",
    type: "success"
  },
  changeFoodLevelSuccess: {
    target: "player.toast.food.success",
    type: "success"
  },
  changeHealthSuccess: {
    target: "player.toast.health.success",
    type: "success"
  },
  changeLevelSuccess: {
    target: "player.toast.level.success",
    type: "success"
  }
}
