import { Authorize, IUser } from "../../models";

type LogoutResolver = (root: IUser) => Promise<void>;
export const logout: LogoutResolver  = (viewer) => {
  if (!viewer._id) {
    throw Error("No user attached");
  }
  return Authorize.clear(viewer._id);
};
