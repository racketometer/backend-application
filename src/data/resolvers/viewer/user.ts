import { User } from "../../models";

export const user = (viewer) => {
  if (viewer.user) {
    return viewer.user;
  }
  return User.findOneByToken(viewer.token);
};
