import { Authorize, IUser } from "../../models";

export const logout: (root: IUser) => Promise<void>  = (viewer) => {
  if (!viewer._id) {
    throw Error("No user attached");
  }
  return Authorize.clear(viewer._id);
};
