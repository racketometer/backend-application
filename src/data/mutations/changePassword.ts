import { User, IUser } from "../connectors";
import { MailService, Email } from "../../smtp";

export interface ILogin {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export const changePassword = (root, user: ILogin) => {
  return User.findOne({ email: user.email })
    .then((existingUser: IUser) => {
      if (!existingUser || user.oldPassword !== existingUser.password) {
        console.log(`No user found for email or password not correct: ${user.email}`);
        throw Error("No user found for email or password not correct");
      }

      existingUser.password = user.newPassword;

      return existingUser.save()
        .then(newUser => {
          console.log(`Password changed for ${existingUser.email} to '${existingUser.password}'`);

          const ms = new MailService();
          return ms.sendMail(new Email(
            existingUser.email,
            "Password changed for Racket O Meter",
            `Your password has been changed.`,
            `<b>Your password has been changed.<b>`
          )).then(() => existingUser);
        });
    });
};
