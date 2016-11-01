import { User } from "../../models";

export const login = (root, { email, password }) => {
  return User.authorize(email, password).then((user) => {
    const viewer = {
      _id: user._id,
      token: user.token,
      user: user,
    };
    return viewer;
  });
};
