import { User, IViewer } from "../../models";

export interface ILoginArgument {
  email: string;
  password: string;
}

export const login: (viewer: IViewer, ILogin) => Promise<IViewer> = (root, { email, password }) => {
  console.log(`Login, email: ${email} pass: ${password}`);
  return User.authorize(email, password).then((user) => {
    const viewer = {
      _id: user._id,
      token: user.token,
      user: user,
    };
    return viewer;
  });
};
