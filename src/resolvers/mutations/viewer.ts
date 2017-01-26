import { IUser, IViewer, User } from "../../models";
import { IViewerArgument } from "../query";

export const viewer: (root: IViewer, arg: IViewerArgument) => Promise<IUser> = (_, { token }) => {
    return User.isAuthorized(token);
};
