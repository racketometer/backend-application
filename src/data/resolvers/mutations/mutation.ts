import { User } from "../../models";

export const viewer = (root, { token }) => {
    return User.isAuthorized(token);
};
