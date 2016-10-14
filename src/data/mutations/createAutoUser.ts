import { User, IUser } from "../connectors";

export interface IAutoUserArgument {
  user: IUser;
}

export const createAutoUser = (root, { user }: IAutoUserArgument) => {
  return User.findOne({ email: user.email })
    .then((existingUser: IUser) => {
      if (existingUser) {
        console.log("CreateAutoUser: Email in use");
        throw Error("Email in use");
      }

      user.isConsultant = false;
      user.isCoach = false;

      console.warn("CreateAutoUser: Set default password: '1234'");
      user.password = "1234";

      return User.create(user)
        .catch((err) => {
          console.log("CreateAutoUser: Error creating user", err);
        });
    });
};
