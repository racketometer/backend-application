import { User, IUser, IViewer } from "../../models";

export const user: (viewer: IViewer) => Promise<IUser> | IUser = (viewer) => {
  if (viewer.user) {
    return viewer.user;
  }
  return User.findOneByToken(viewer.token);
};
