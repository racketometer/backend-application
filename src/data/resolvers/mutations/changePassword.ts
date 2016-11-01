import { User, IUser } from "../../models";
import { MailService, Email } from "../../../smtp";

export interface ILogin {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = (viewer, user: ILogin) => {
  return User.findOneByToken(viewer.token)
    .then((existingUser: IUser) => {
      if (!existingUser || user.oldPassword !== existingUser.password) {
        console.log(`No user found for token or password not correct: ${viewer.token}`);
        throw Error("No user found for email or password not correct");
      }

      existingUser.password = user.newPassword;

      return User.save(existingUser)
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
