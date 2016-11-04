import { User, IUser } from "../../models";

export interface IViewerArgument {
  token: string;
}

export const viewer: (root: Object, arg: IViewerArgument) => Promise<IUser> = (root, { token }) => {
  return User.isAuthorized(token);
};
