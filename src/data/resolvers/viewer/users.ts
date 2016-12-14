import { User, IUser } from "../../models";

export interface IViewerUsers {
  creatorId: string;
}

type UsersResolver = (root: IUser, creatorId: IViewerUsers ) => Promise<Array<IUser>>

export const users: UsersResolver = (viewer, { creatorId }) => {
  if (creatorId) {
    return User.findUsersCreatedBy(creatorId);
  }
  return User.findUsersCreatedBy(viewer._id);
};
