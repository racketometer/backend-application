import { IUser } from "./";

export interface IViewer {
  token: string;
  _id: string;
  user: IUser;
}
