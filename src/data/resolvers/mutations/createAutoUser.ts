import { User, IUser, IViewer } from "../../models";
import { MailService, Email } from "../../../smtp";

export interface IAutoUserArgument {
  user: IUser;
}

export const createAutoUser: (root: IViewer, arg: IAutoUserArgument) => Promise<IUser> = (root, { user }) => {
  return User.findOneByEmail(user.email)
    .then((existingUser: IUser) => {
      if (existingUser) {
        console.log("CreateAutoUser: Email in use");
        throw Error("Email in use");
      }

      user.isConsultant = false;
      user.isCoach = false;

      // Generate 8 character long password found at:
      // http://stackoverflow.com/a/9719815
      user.password = Math.random().toString(36).slice(-8);
      user.autoGenerated = true;

      return User.create(user)
        .then((createdUser) => {
          console.log(`CreateAutoUser: Added ${createdUser.firstName} ${createdUser.lastName} with default password: '${createdUser.password}'`);

          const ms = new MailService();

          return ms.sendMail(new Email(
            createdUser.email,
            "email testing!",
            `Your autogenerated password is: ${createdUser.password}`,
            `<b>Your autogenerated password is:${createdUser.password}<b>`
          )).then(() => createdUser);

        });
    })
    .catch((err) => {
      console.log("CreateAutoUser: Error creating user", err);
      return Promise.reject(err);
    });
};