import { User } from "../../connectors";
import { MailService, Email } from "../../../smtp";

export const createUser = (root, { email, password }) => {
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        console.log("CreateUser: Email in use");
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
          console.log("CreateUser: Error creating user", err);
        });
    });
};
