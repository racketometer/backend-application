import { User } from "../connectors";

export const createUser = (root, { email, password }) => {
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        console.log("CreateUser: Email in use");
        throw Error("Email in use");
      }

      return User.create({ email, password })
        .catch((err) => {
          console.log("CreateUser: Error creating user", err);
        });
    });
};
