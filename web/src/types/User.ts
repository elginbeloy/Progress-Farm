import { Tile } from "./Tile";

export interface User {
  id: string;
  username: string;
  password: string;
  money: number;
  rows: number;
  columns: number;
  tiles: Tile[];
}
