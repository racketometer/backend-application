import { IUser, IViewer, User } from "../../models";

type UserResolver = (viewer: IViewer) => Promise<IUser> | IUser;
export const user: UserResolver = (viewer) => {
  if (viewer.user) {
    return viewer.user;
  }
  return User.findOneByToken(viewer.token);
};
