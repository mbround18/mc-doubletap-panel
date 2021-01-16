import {World} from '~/store/server/interfaces/world.interface';
import {OnlinePlayer} from '~/store/server/interfaces/online-player.interface';

export interface Server {
  name: string;
  motd: string;

  ip: string;
  port: number;
  version: number;
  maxPlayers: number;
  onlinePlayers: OnlinePlayer[];

  worlds: World[];
}
