import { User, IUser, IViewer } from "../../models";
import { IViewerArgument } from "../query";

export const viewer: (root: IViewer, arg: IViewerArgument) => Promise<IUser> = (root, { token }) => {
    return User.isAuthorized(token);
};