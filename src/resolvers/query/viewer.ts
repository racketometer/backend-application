import { IUser, User } from "../../models";

export interface IViewerArgument {
  token: string;
}

type ViewerResolver = (root: Object, arg: IViewerArgument) => Promise<IUser>;
export const viewer: ViewerResolver = (root, { token }) => {
  return User.isAuthorized(token);
};
