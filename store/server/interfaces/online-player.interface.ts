export interface OnlinePlayer {
  name: string;
  address: string;
  playTime: number;
  isBanned: boolean;
  foodLevel: number;
  exhaustion: number;

  health: number;
  maxHealth: number;
  healthScale: number;
}
