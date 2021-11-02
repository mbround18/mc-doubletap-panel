import { IWorld } from "~/store/server/interfaces/world.interface"
import { IOnlinePlayer } from "~/store/server/interfaces/online-player.interface"

export interface IServer {
  name: string;
  motd: string;

  ip: string;
  port: number;
  version: number;
  maxPlayers: number;
  onlinePlayers: IOnlinePlayer[];
  hasWhitelist: boolean;

  worlds: IWorld[];
}
