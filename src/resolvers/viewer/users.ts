import { IUser, User } from "../../models";

export interface IViewerUsersArgument {
  creatorId: string;
}

type UsersResolver = (root: IUser, creatorId: IViewerUsersArgument ) => Promise<Array<IUser>>;
export const users: UsersResolver = (viewer, { creatorId }) => {
  return User.findUsersByCreatedBy(creatorId || viewer._id);
};
