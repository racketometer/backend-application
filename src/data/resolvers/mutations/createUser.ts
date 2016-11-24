import { User, IUser, IViewer } from "../../models";
import { MailService, Email } from "../../../smtp";

export interface ICreateUserArgument {
  email: string;
  password: string;
}

export const createUser: (root: IViewer, arg: ICreateUserArgument) => Promise<IUser> = (root, { email, password }) => {
  return User.findOneByEmail(email)
    .then((existingUser) => {
      if (existingUser) {
        throw Error("Email in use");
      }

      return User.create({ email, password })
        .then((user) => {
          const ms = new MailService();
          ms.sendMail(new Email(
            email,
            "email testing!",
            `Your password is:${password}`,
            `<b>Your password is:${password}<b>`
          ));
          return user;
        })
        .catch((err) => {
          throw Error("CreateUser: Error creating user")
        });
    });
};
