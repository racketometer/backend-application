import { IViewer, User } from "../../models";

export interface ILoginArgument {
  email: string;
  password: string;
}

type LoginResolver = (viewer: IViewer, arg: ILoginArgument) => Promise<IViewer>;
export const login: LoginResolver = (_, { email, password }) => {
  return User.authorize(email, password)
    .then((user) => {
      const viewer = {
        _id: user._id,
        token: user.token,
        user,
      };
      return viewer;
    });
};
