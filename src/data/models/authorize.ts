import { User as db } from "../connectors";
import { IUser } from "./user";
import * as UUID from "node-uuid";

export class Authorize {

  /**
   * Authorize user.
   * @param email User email.
   * @param password The users password.
   */
  public static authorize(email: string, password: string): Promise<IUser> {
    return db.findOne({ email, password }).then((user) => {
      if (!user) {
        throw Error("Could not authorized");
      }
      user.token = UUID.v4();
      return user.save();
    });
  }

  /**
   * Throws an error if token is not valid.
   * @param token Token to authorize.
   */
  public static isAuthorized(token: string): Promise<IUser> {
    return db.findOne({ token }).then((user) => {
      if (!user) {
        throw Error("Not authorized");
      }
      return user;
    });
  }

  /**
   * Clears authorization on user with id.
   * @param id User id.
   */
  public static clear(id: string): Promise<void> {
    return db.remove({ _id: id }).catch(() => {
      throw Error()
    });
  }
}