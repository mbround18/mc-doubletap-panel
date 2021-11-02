export interface IOnlinePlayer {
  name: string;
  address: string;
  playTime: number;
  isBanned: boolean;
  foodLevel: number;
  exhaustion: number;

  level: number;
  health: number;
  maxHealth: number;
  healthScale: number;
  gamemode: string;
}
